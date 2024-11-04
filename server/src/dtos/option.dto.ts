import { z } from 'zod';
import { OptionRAW } from '../types/multipleChoiceTest.types';

export const optionSchemaDTO = z.object({
  content: z.string(),
  order: z.number(),
  isCorrect: z.coerce.boolean(),
}) satisfies z.ZodType<Partial<OptionRAW>>;

export type OptionDTO = z.infer<typeof optionSchemaDTO>;
