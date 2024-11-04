import { z } from 'zod';
import { MultipleChoiceTestRAW } from '../types/multipleChoiceTest.types';
import { multipleChoiceQuestionOptionsSchemaDTO } from './multipleChoiseQuestion.dto';

export const multipleChoiceTestSchemaDTO = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.string(),
}) satisfies z.ZodType<MultipleChoiceTestRAW>;

export type MultipleChoiceTestDTO = z.infer<typeof multipleChoiceTestSchemaDTO>;

export const multipleChoiceTestQuestionsSchemaDTO =
  multipleChoiceTestSchemaDTO.extend({
    questions: z.array(multipleChoiceQuestionOptionsSchemaDTO),
  });

export type MultipleChoiceTestQuestionsDTO = z.infer<
  typeof multipleChoiceTestQuestionsSchemaDTO
>;
