import { TestInsert, TestSelect } from '@backend/test.types';
import {
  APIResponse,
  GetAllTestsPaginated,
  PaginatedResponse,
  Test,
} from '../interface';
import {
  GetDataResponse,
  GetDataWithMoreInfoResponse,
  PostTestResponse,
} from './test.api.type';

const ENDPOINT = '/api/test';

// TODO - Create testAPI interface like i did on multipleChoiceTest api
export const testAPI = {
  create: (
    data: Omit<TestInsert, 'user_id'>
  ): Promise<APIResponse<PostTestResponse[]>> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(ENDPOINT, options).then((response) => response.json());
  },
  getById: ({ id }: TestSelect) => {
    return fetch(ENDPOINT + '/' + id).then((response) =>
      response.json().then(({ data }: APIResponse<GetDataResponse>) => {
        return {
          title: data.title,
          id: data.id,
          // TODO - Change the created_at to be a Date
          created_at: '',
          questions: data.questions.map((q) => q.content),
          user_id: data.user_id,
        };
      })
    );
  },
  getAll: ({
    page = 1,
  }: {
    page?: number;
  }): Promise<GetAllTestsPaginated<Test[]>> => {
    return fetch(ENDPOINT + '?page=' + page)
      .then((response) => response.json())
      .then((response: PaginatedResponse<Test[]>) => ({
        tests: response.data,
        nextPage: response.info.currentPage + 1,
        info: {
          ...response.info,
        },
      }));
  },
  getByIdWithInfo: ({ id }: TestSelect) => {
    return fetch(ENDPOINT + '/' + id + '/info').then((response) =>
      response
        .json()
        .then(({ data }: APIResponse<GetDataWithMoreInfoResponse>) => data)
    );
  },
};
