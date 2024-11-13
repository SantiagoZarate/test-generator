import { userRelations, userSchema } from './user.schema';

import {
  questionRelations,
  questionSchema,
  testRelations,
  testSchema,
} from './test.schema';

import {
  multipleChoiceQuestionRelations,
  multipleChoiceQuestionSchema,
  multipleChoiceResultRelations,
  multipleChoiceResultSchema,
  multipleChoiceTestRelations,
  multipleChoiceTestSchema,
  optionRelations,
  optionSchema,
} from './multipleTest.schema';

export default {
  testSchema,
  questionRelations,
  questionSchema,
  testRelations,
  // Multiple Choice
  multipleChoiceResultRelations,
  multipleChoiceResultSchema,
  multipleChoiceQuestionSchema,
  multipleChoiceTestSchema,
  optionRelations,
  optionSchema,
  multipleChoiceQuestionRelations,
  multipleChoiceTestRelations,
  // User
  userRelations,
  userSchema,
};
