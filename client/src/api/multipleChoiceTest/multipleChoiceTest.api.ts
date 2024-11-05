import {
  GetAllTestsPaginated,
  PaginatedResponse,
  PostDataResponse,
  Test,
} from '../interface';
import { MPTest, TestInsert } from './multipleChoiceTest.type';

const ENDPOINT = '/api/multiple-choice-test';

export const multipleChoiceTestAPI = {
  async getOne(id: string): Promise<MPTest> {
    return fetch(ENDPOINT + '/' + id)
      .then((response) => response.json())
      .then((response) => response.data);
  },
  async getAll({
    page = 1,
  }: {
    page?: number;
  }): Promise<GetAllTestsPaginated<Test>> {
    return fetch(ENDPOINT + '?page=' + page)
      .then((response) => response.json())
      .then((response: PaginatedResponse<Test>) => ({
        info: { ...response.info },
        nextPage: response.info.currentPage + 1,
        tests: response.data,
      }));
  },
  async create(data: TestInsert): Promise<string> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(ENDPOINT, options)
      .then((response) => response.json())
      .then((response: PostDataResponse) => response.results.id);
  },
};
