import { APIResponse } from '../test.api.type';
import { GetAllMPTests, MPTest } from './multipleChoiceTest.type';

const ENDPOINT = '/api/multiple-choice-test';

export const multipleChoiceTestAPI = {
  async getOne(id: string): Promise<MPTest> {
    return fetch(ENDPOINT + '/' + id)
      .then((response) => response.json())
      .then((response) => response.data);
  },
  async getAll(): Promise<GetAllMPTests[]> {
    return fetch(ENDPOINT)
      .then((response) => response.json())
      .then((response: APIResponse<GetAllMPTests[]>) => response.data);
  },
};
