import { type InferInsertModel } from 'drizzle-orm';
import {
  multipleChoiceQuestionSchema,
  multipleChoiceTestSchema,
  optionSchema,
} from '../../drizzle/schemas/multipleTest.schema';
import { MPTestSchema } from '../lib/zod-schemas/multipleChoiceTest.validation';

// Get TS types from Drizzle Schemas
export type OptionRAW = Required<InferInsertModel<typeof optionSchema>>;

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
export type MCTestInsert = Pick<MultipleChoiceTestSchema, 'title'> &
  MPTestSchema;
