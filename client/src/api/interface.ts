// Common structure of my api response
export interface APIResponse<D> {
  ok: boolean;
  data: D;
}

export interface Test {
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

export type PaginatedResponse<T> = APIResponse<T> & Pagination;

export interface GetAllTestsPaginated<T> extends Pagination {
  tests: T;
  nextPage: number;
}

type Pagination = {
  info: {
    currentPage: number;
    totalPages: number;
    totalTests: number;
  };
};
