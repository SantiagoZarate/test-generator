import { TestInsert, TestSchema, TestSelect } from '@backend/test.types';
import {
  APIResponse,
  GetAllTests,
  PaginatedResponse,
  PaginatesGetAllTests,
  PostDataResponse,
} from '../interface';
import { GetDataResponse } from './test.api.type';

const ENDPOINT = '/api/test';

export const testAPI = {
  create: (data: TestInsert): Promise<APIResponse<PostDataResponse>> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(ENDPOINT, options).then((response) => response.json());
  },
  getById: ({ id }: TestSelect): Promise<TestSchema> => {
    return fetch(ENDPOINT + '/' + id).then((response) =>
      response.json().then(({ data }: APIResponse<GetDataResponse>) => {
        return {
          title: data.title,
          id: data.id,
          created_at: '',
          questions: data.questions.map((q) => q.content),
        };
      })
    );
  },
  getAll: ({ page = 1 }: { page?: number }): Promise<PaginatesGetAllTests> => {
    return fetch(ENDPOINT + '?page=' + page)
      .then((response) => response.json())
      .then((response: PaginatedResponse<GetAllTests[]>) => ({
        tests: response.data,
        nextPage: response.info.currentPage + 1,
        info: {
          ...response.info,
        },
      }));
  },
};
