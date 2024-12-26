export interface GetDataResponse {
  id: string;
  created_at: Date;
  title: string;
  questions: Question[];
  user_id: string;
}

export interface Question {
  content: string;
}

export interface PostTestResponse {
  id: string;
}
