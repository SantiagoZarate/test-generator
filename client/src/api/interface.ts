// Common structure of my api response
export interface APIResponse<D> {
  ok: boolean;
  data: D;
}

export interface GetAllTests {
  id: string;
  title: string;
  created_at: string;
  questionsCounts: number;
}

export interface PostDataResponse {
  message: string;
  results: {
    id: string;
  };
}
