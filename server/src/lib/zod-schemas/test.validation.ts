import { z } from 'zod';
import { TestInsert } from '../../types/test.types';

export const testSchemaValidation = z.object({
  title: z.string().min(1),
  questions: z.array(z.string()).min(1).max(10),
}) satisfies z.ZodType<TestInsert>;

export type TestSchemaValidation = z.infer<typeof testSchemaValidation>;
