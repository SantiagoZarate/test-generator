import { type InferInsertModel } from "drizzle-orm";
import { multipleChoiceTestSchema } from "../../drizzle/schemas/multipleTest.schema";

export type MultipleChoiceTestSchema = Required<
  InferInsertModel<typeof multipleChoiceTestSchema> & {
    questions: string[];
  }
>;

export type MCTestSelect = Pick<MultipleChoiceTestSchema, "id">;
export type MCTestInsert = Pick<
  MultipleChoiceTestSchema,
  "title" | "questions"
>;
