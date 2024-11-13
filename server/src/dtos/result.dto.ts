import { z } from 'zod';
import { ResultRAW } from '../types/multipleChoiceTest.types';

export const resultSchemaDTO = z.object({
  right_answers: z.coerce.number(),
  id: z.string(),
  created_at: z.string(),
}) satisfies z.ZodType<Omit<ResultRAW, 'test_id'>>;

export type ResultDTO = z.infer<typeof resultSchemaDTO>;
