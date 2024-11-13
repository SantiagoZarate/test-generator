import { db } from '../../drizzle/connection';
import { multipleChoiceResultSchema } from '../../drizzle/schemas/multipleTest.schema';
import { ResultInsert, ResultSelect } from '../types/multipleChoiceTest.types';

class MultipleChoiceResultRepository {
  async create(payload: ResultInsert): Promise<ResultSelect> {
    const data = await db
      .insert(multipleChoiceResultSchema)
      .values({
        right_answers: payload.right_answers,
        test_id: payload.test_id,
      })
      .returning({ id: multipleChoiceResultSchema.id });

    return data[0];
  }
}

export const multipleChoiceResultRepository =
  new MultipleChoiceResultRepository();
