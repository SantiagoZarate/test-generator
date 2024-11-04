export interface GetDataResponse {
  id: string;
  created_at: Date;
  title: string;
  questions: Question[];
}

export interface Question {
  content: string;
}
