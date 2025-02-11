export interface GetDataResponse {
  id: string;
  created_at: Date;
  title: string;
  questions: Question[];
  user_id: string;
}

export interface GetDataWithMoreInfoResponse {
  id: string;
  created_at: string;
  title: string;
  user_id: string;
  questions: {
    content: string | null;
  }[];
  results: Submission[];
}

export type Submission = {
  id: string;
  created_at: string;
  answers: string[];
};

export interface Question {
  content: string;
}

export interface PostTestResponse {
  id: string;
}

export interface PostTestResult {
  answers: string[];
  id: string;
}
