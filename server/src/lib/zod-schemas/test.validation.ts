import { z } from 'zod';
import { TestInsert } from '../../types/test.types';

export const testSchemaValidation = z.object({
  title: z.string(),
  questions: z.array(z.string()).min(1),
}) satisfies z.ZodType<TestInsert>;

export type TestSchemaValidation = z.infer<typeof testSchemaValidation>;
