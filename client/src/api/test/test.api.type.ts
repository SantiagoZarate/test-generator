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
    test_id: string;
  }[];
  results: {
    id: string;
    created_at: string;
    test_id: string;
    answers: string;
  }[];
}

export interface Question {
  content: string;
}

export interface PostTestResponse {
  id: string;
}
