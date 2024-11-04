export interface MPTest {
  id: string;
  created_at: Date;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  order: number;
  content: string;
  test_id: string;
  options: Option[];
}

export interface Option {
  content: string;
  order: number;
  isCorrect: boolean;
  question_id: string;
}

export interface GetAllMPTests {
  id: string;
  created_at: Date;
  title: string;
  questionsCounts: number;
}

export interface TestInsert {
  title: string;
  questions: {
    content: string;
    options: string[];
    answer: number;
  }[];
}
