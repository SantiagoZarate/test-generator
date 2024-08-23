// Common structure of my api response
export interface APIResponse<D> {
  ok: boolean;
  data: D;
}

export interface PostDataResponse {
  id: string;
}

export interface GetDataResponse {
  id: string;
  created_at: Date;
  title: string;
  questions: Question[];
}

export interface Question {
  content: string;
}
