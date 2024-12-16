import { GetAllTestsPaginated, Test } from '../interface';

type Paginate = { page?: number };

/**
 * Interface for Multiple Choice Test API methods.
 */
export interface MultipleChoiceTestAPI {
  /**
   * Retrieves all multiple choice tests with pagination.
   * @param pagination - Object containing pagination info.
   * @returns A promise that resolves with paginated multiple choice tests.
   */
  getAll: (pagination: Paginate) => Promise<GetAllTestsPaginated<Test>>;

  /**
   * Retrieves a single multiple choice test by its ID.
   * @param id - The ID of the test to retrieve.
   * @returns A promise that resolves with the test data.
   */
  getOne: (id: string) => Promise<MultipleChoiceTestWithQuestions>;

  /**
   * Retrieves a single multiple choice test by its ID with some aditional information.
   * @param id - The ID of the test to retrieve.
   * @returns A promise that resolves with the test data.
   */
  getOneWithInfo: (id: string) => Promise<MultipleChoiceTestWithInfo>;

  /**
   * Creates a new multiple choice test.
   * @param data - The data of the test to create.
   * @returns A promise that resolves with the ID of the newly created test.
   */
  create: (data: TestInsert) => Promise<string>;

  /**
   * Creates a new multiple choice test.
   * @param data - The data of the test to create.
   * @returns A promise that resolves with the ID of the newly created test.
   */
  postResult: (id: string, data: ResultInsert) => Promise<{ id: string }>;

  /**
   * Deletes a multiple choice test by its ID.
   * @param id - The ID of the test to delete.
   * @returns A promise that resolves with a message indicating success.
   */
  delete: (id: string) => Promise<void>;
}

export interface GetAllMPTests {
  id: string;
  created_at: Date;
  title: string;
  questionsCounts: number;
}

interface MultipleChoiceTest {
  id: string;
  created_at: Date;
  title: string;
  user_id: string;
}

interface MultipleChoiceTestWithQuestions extends MultipleChoiceTest {
  questions: Question[];
}

interface MultipleChoiceTestWithInfo extends MultipleChoiceTest {
  info: BasicAnalytics;
}

export interface BasicAnalytics {
  averageScore: null | number;
  countAprovedTests: number;
  countDisaprovedTests: number;
  questionsCount: number;
}

interface Question {
  id: string;
  order: number;
  content: string;
  test_id: string;
  options: Option[];
}

interface Option {
  content: string;
  order: number;
  isCorrect: boolean;
  question_id: string;
}

interface TestInsert {
  title: string;
  right_answers_to_pass: number;
  questions: {
    content: string;
    options: {
      content: string;
      isCorrect: boolean;
    }[];
  }[];
}

interface ResultInsert {
  right_answers: number;
}
