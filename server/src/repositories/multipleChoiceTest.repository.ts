import { eq } from "drizzle-orm";
import { db } from "../../drizzle/connection";
import {
  multipleChoiceQuestionSchema,
  multipleChoiceTestSchema,
  optionSchema,
} from "../../drizzle/schemas/multipleTest.schema";
import { MCTestInsert, MCTestSelect } from "../types/multipleChoiceTest.types";

class MultipleChoiceTestRepository {
  private readonly entity = multipleChoiceTestSchema;

  async getOne({ id }: MCTestSelect) {
    const data = await db.query.multipleChoiceTestSchema.findFirst({
      where: (test) => eq(test.id, id),
      with: {
        questions: {
          with: {
            options: true,
          },
        },
      },
    });

    if (!data) {
      console.log("NO EXISTE");
    }

    return data;
  }

  async create(data: MCTestInsert): Promise<MCTestSelect> {
    const testID = await db.transaction(async (tx) => {
      const test = await tx
        .insert(this.entity)
        .values({
          title: data.title,
        })
        .returning({ id: this.entity.id });

      await Promise.all(
        data.questions.map(async (question, index) => {
          const savedQuestion = await tx
            .insert(multipleChoiceQuestionSchema)
            .values({
              test_id: test[0].id,
              content: question.content,
              order: index + 1,
            })
            .returning({ id: multipleChoiceQuestionSchema.id });

          const newOptions = question.options.map((option, index) => ({
            question_id: savedQuestion[0].id,
            content: option,
            isCorrect: index === question.answer,
            order: index + 1,
          }));

          await tx.insert(optionSchema).values(newOptions as any);
        })
      );
      return test[0];
    });

    return testID;
  }
}

export const multipleChoiceTestRepository = new MultipleChoiceTestRepository();
