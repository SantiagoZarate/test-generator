import { MultipleChoiceTestAPI } from '.';
import { PaginatedResponse, PostDataResponse, Test } from '../interface';

const ENDPOINT = '/api/multiple-choice-test';

export const multipleChoiceTestAPI: MultipleChoiceTestAPI = {
  async getOne(id: string) {
    return fetch(ENDPOINT + '/' + id)
      .then((response) => response.json())
      .then((response) => response.data);
  },
  async getOneWithInfo(id: string) {
    return fetch(ENDPOINT + '/' + id + '/info')
      .then((response) => response.json())
      .then((response) => response.data);
  },
  async getAll({ page = 1 }: { page?: number }) {
    return fetch(ENDPOINT + '?page=' + page)
      .then((response) => response.json())
      .then((response: PaginatedResponse<Test>) => ({
        info: { ...response.info },
        nextPage: response.info.currentPage + 1,
        tests: response.data,
      }));
  },
  async create(data) {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    };

    return fetch(ENDPOINT, options)
      .then((response) => response.json())
      .then((response: PostDataResponse) => response.results.id);
  },
  async delete(id) {
    return fetch(ENDPOINT + '/' + id, {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        console.log(response);
      }
    });
  },
  async postResult(id, data) {
    return fetch(ENDPOINT + '/' + id + '/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => response.data);
  },
};
