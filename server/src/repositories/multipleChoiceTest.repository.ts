import { count, eq } from 'drizzle-orm';
import { db } from '../../drizzle/connection';
import {
  multipleChoiceQuestionSchema,
  multipleChoiceTestSchema,
  optionSchema,
} from '../../drizzle/schemas/multipleTest.schema';
import {
  MultipleChoiceTestDTO,
  MultipleChoiceTestQuestionsDTO,
  multipleChoiceTestQuestionsSchemaDTO,
  MultipleChoiceTestResultsDTO,
  multipleChoiceTestResultsSchemaDTO,
} from '../dtos/mutlipleChoiceTest.dto';
import { MCTestInsert, MCTestSelect } from '../types/multipleChoiceTest.types';
import { PaginateConfig } from '../utils/getPaginatedParams';

class MultipleChoiceTestRepository {
  private readonly entity = multipleChoiceTestSchema;

  async getAll({
    limit,
    page,
  }: PaginateConfig): Promise<MultipleChoiceTestDTO[]> {
    const data = await db.query.multipleChoiceTestSchema.findMany({
      limit,
      offset: (page - 1) * limit,
    });
    return data;
  }

  async getCount(): Promise<number> {
    const data = await db
      .select({ count: count(multipleChoiceTestSchema.id) })
      .from(multipleChoiceTestSchema);

    return data[0].count;
  }

  async getOne({ id }: MCTestSelect): Promise<MultipleChoiceTestQuestionsDTO> {
    const data = await db.query.multipleChoiceTestSchema.findFirst({
      where: (test) => eq(test.id, id),
      with: {
        questions: {
          with: {
            options: true,
          },
        },
        results: true,
      },
    });

    if (!data) {
      console.log('NO EXISTE');
    }

    return multipleChoiceTestQuestionsSchemaDTO.parse(data);
  }

  async getOneWithInfo({
    id,
  }: MCTestSelect): Promise<MultipleChoiceTestResultsDTO> {
    const data = await db.query.multipleChoiceTestSchema.findFirst({
      where: (test) => eq(test.id, id),
      with: {
        results: true,
      },
    });

    if (!data) {
      console.log('NO EXISTE');
    }

    return multipleChoiceTestResultsSchemaDTO.parse(data);
  }

  async create(data: MCTestInsert): Promise<MCTestSelect> {
    const testID = await db.transaction(async (tx) => {
      const test = await tx
        .insert(this.entity)
        .values({
          title: data.title,
          user_id: data.user_id,
          right_answers_to_pass: data.right_answers_to_pass,
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

          await tx.insert(optionSchema).values(newOptions);
        }),
      );
      return test[0];
    });

    return testID;
  }

  async deleteById({ id }: MCTestSelect): Promise<boolean> {
    const data = await db
      .delete(multipleChoiceTestSchema)
      .where(eq(multipleChoiceTestSchema.id, id));

    return data.rowsAffected === 1;
  }

  async getQuestionsCount({ id }: MCTestSelect): Promise<number> {
    const data = await db
      .select({ count: count(multipleChoiceQuestionSchema.id) })
      .from(multipleChoiceTestSchema)
      .where(eq(multipleChoiceTestSchema.id, id));

    return data[0].count ?? 0;
  }
}

export const multipleChoiceTestRepository = new MultipleChoiceTestRepository();
