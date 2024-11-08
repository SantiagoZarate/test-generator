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
