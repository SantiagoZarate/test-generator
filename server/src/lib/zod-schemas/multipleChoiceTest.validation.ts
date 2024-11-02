import { z } from "zod";

const questionValidations = z.object({
  content: z.string(),
  options: z.string().array(),
  answer: z.coerce.number(),
});

export const multipleChoiceTestSchemaValidation = z.object({
  title: z.string(),
  questions: z.array(questionValidations),
});

export type MPTestSchema = z.infer<typeof multipleChoiceTestSchemaValidation>;
