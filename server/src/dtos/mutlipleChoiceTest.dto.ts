import { z } from 'zod';
import { MultipleChoiceTestRAW } from '../types/multipleChoiceTest.types';
import { multipleChoiceQuestionOptionsSchemaDTO } from './multipleChoiseQuestion.dto';
import { resultSchemaDTO } from './result.dto';

export const multipleChoiceTestSchemaDTO = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.string(),
  rigth_answers_to_pass: z.coerce.number(),
}) satisfies z.ZodType<Omit<MultipleChoiceTestRAW, 'user_id'>>;

export type MultipleChoiceTestDTO = z.infer<typeof multipleChoiceTestSchemaDTO>;

export const multipleChoiceTestQuestionsSchemaDTO =
  multipleChoiceTestSchemaDTO.extend({
    questions: z.array(multipleChoiceQuestionOptionsSchemaDTO),
  });

export type MultipleChoiceTestQuestionsDTO = z.infer<
  typeof multipleChoiceTestQuestionsSchemaDTO
>;

export const multipleChoiceTestResultsSchemaDTO =
  multipleChoiceTestSchemaDTO.extend({
    results: z.array(resultSchemaDTO),
  });

export type MultipleChoiceTestResultsDTO = z.infer<
  typeof multipleChoiceTestResultsSchemaDTO
>;
