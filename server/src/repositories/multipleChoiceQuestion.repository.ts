import { count, eq } from "drizzle-orm";
import { db } from "../../drizzle/connection";
import { multipleChoiceQuestionSchema } from "../../drizzle/schemas/multipleTest.schema";
import { MCTestSelect } from "../types/multipleChoiceTest.types";

class MultipleChoiceQuestionRepository {
  async getQuestionCountByTest({ id }: MCTestSelect) {
    const data = await db
      .select({ count: count(multipleChoiceQuestionSchema.id) })
      .from(multipleChoiceQuestionSchema)
      .where(eq(multipleChoiceQuestionSchema.test_id, id));

    return data[0].count ?? 0;
  }
}

export const multipleChoiceQuestionRepository =
  new MultipleChoiceQuestionRepository();
