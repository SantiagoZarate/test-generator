import { MultipleChoiceTest, Test } from '../interface';

export interface UserAPI {
  getUserProfile: () => Promise<GetUserProfile>;
}

// Responses types
export interface GetUserProfile {
  multipleChoiceTests: MultipleChoiceTest[];
  email: string;
  name: string;
  tests: Test[];
  id: string;
}
