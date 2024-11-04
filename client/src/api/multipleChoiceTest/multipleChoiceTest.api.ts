import { APIResponse, GetAllTests, PostDataResponse } from '../interface';
import { MPTest, TestInsert } from './multipleChoiceTest.type';

const ENDPOINT = '/api/multiple-choice-test';

export const multipleChoiceTestAPI = {
  async getOne(id: string): Promise<MPTest> {
    return fetch(ENDPOINT + '/' + id)
      .then((response) => response.json())
      .then((response) => response.data);
  },
  async getAll(): Promise<GetAllTests[]> {
    return fetch(ENDPOINT)
      .then((response) => response.json())
      .then((response: APIResponse<GetAllTests[]>) => response.data);
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
