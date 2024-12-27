import { type InferInsertModel } from 'drizzle-orm';
import { testSchema } from '../../drizzle/schemas/test.schema';

export type TestSchema = Required<
  InferInsertModel<typeof testSchema> & {
    questions: string[];
  }
>;

export type TestSelect = Pick<TestSchema, 'id'>;
export type TestInsert = Pick<TestSchema, 'title' | 'questions' | 'user_id'>;

export type TestPostResult = Pick<TestSchema, 'id'> & {
  answers: string[];
};
