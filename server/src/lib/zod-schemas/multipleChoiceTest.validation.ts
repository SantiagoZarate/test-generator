import { z } from 'zod';

const questionSchemaValidations = z.object({
  content: z.string(),
  options: z.array(z.string()).min(2),
  answer: z.coerce.number().min(0),
});

export const multipleChoiceTestSchemaValidation = z
  .object({
    title: z.string(),
    questions: z.array(questionSchemaValidations).min(1).max(20),
    right_answers_to_pass: z.coerce.number(),
  })
  .superRefine(({ questions, right_answers_to_pass }, ctx) => {
    if (questions.length < right_answers_to_pass) {
      ctx.addIssue({
        path: ['right_answers_to_pass'],
        message:
          'The number of correct answers to pass cannot exceed the total number of questions.',
        code: 'custom',
      });
    }
  });

export type MPTestSchema = z.infer<typeof multipleChoiceTestSchemaValidation>;
