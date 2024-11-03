import { z } from "zod";

const questionSchemaValidations = z.object({
  content: z.string(),
  options: z.array(z.string()).min(2),
  answer: z.coerce.number().min(0),
});

export const multipleChoiceTestSchemaValidation = z.object({
  title: z.string(),
  questions: z.array(questionSchemaValidations).min(1).max(20),
});

export type MPTestSchema = z.infer<typeof multipleChoiceTestSchemaValidation>;
