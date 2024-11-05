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

export interface PaginatedResponse<T> extends APIResponse<T> {
  info: {
    currentPage: number;
    totalPages: number;
    totalTests: number;
  };
}

export interface PaginatesGetAllTests {
  tests: GetAllTests[];
  nextPage: number;
  info: {
    currentPage: number;
    totalPages: number;
    totalTests: number;
  };
}
