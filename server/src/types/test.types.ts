import { testSchema } from '../../drizzle/schemas/test.schema';
import { type InferInsertModel } from 'drizzle-orm';

export type TestSchema = Required<
  InferInsertModel<typeof testSchema> & {
    questions: string[];
  }
>;

export type TestSelect = Pick<TestSchema, 'id'>;
export type TestInsert = Pick<TestSchema, 'title' | 'questions'>;
