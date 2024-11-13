import { type InferInsertModel } from 'drizzle-orm';
import {
  multipleChoiceQuestionSchema,
  multipleChoiceResultSchema,
  multipleChoiceTestSchema,
  optionSchema,
} from '../../drizzle/schemas/multipleTest.schema';
import { MPTestSchema } from '../lib/zod-schemas/multipleChoiceTest.validation';

// Get TS types from Drizzle Schemas
export type OptionRAW = Required<InferInsertModel<typeof optionSchema>>;

export type ResultRAW = Required<
  InferInsertModel<typeof multipleChoiceResultSchema>
>;

export type ResultInsert = Pick<ResultRAW, 'right_answers' | 'test_id'>;
export type ResultSelect = Pick<ResultRAW, 'id'>;

export type MultipleChoiceTestRAW = Required<
  InferInsertModel<typeof multipleChoiceTestSchema>
>;

export type MultipleChoiceQuestionRAW = Required<
  InferInsertModel<typeof multipleChoiceQuestionSchema>
>;

// Create types for repository params
export type MultipleChoiceTestSchema = MultipleChoiceTestRAW & {
  questions: string[];
};

export type MCTestSelect = Pick<MultipleChoiceTestSchema, 'id'>;
export type MCTestInsert = Pick<
  MultipleChoiceTestSchema,
  'title' | 'user_id' | 'right_answers_to_pass'
> &
  MPTestSchema;
