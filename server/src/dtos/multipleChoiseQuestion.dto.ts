import { z } from 'zod';
import { MultipleChoiceQuestionRAW } from '../types/multipleChoiceTest.types';
import { optionSchemaDTO } from './option.dto';

export const multipleChoiceQuestionSchemaDTO = z.object({
  id: z.string(),
  order: z.coerce.number(),
  content: z.string(),
}) satisfies z.ZodType<Partial<MultipleChoiceQuestionRAW>>;

export type MultipleChoiceQuestionDTO = z.infer<
  typeof multipleChoiceQuestionSchemaDTO
>;

export const multipleChoiceQuestionOptionsSchemaDTO =
  multipleChoiceQuestionSchemaDTO.extend({
    options: z.array(optionSchemaDTO),
  });

export type MultipleChoiceQuestionOptionsDTO = z.infer<
  typeof multipleChoiceQuestionOptionsSchemaDTO
>;
