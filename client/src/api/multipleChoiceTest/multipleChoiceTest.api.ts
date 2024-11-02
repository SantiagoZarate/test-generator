import { envs } from '@/config/envs';

const ENDPOINT = envs.TEST_API_URL + '/api/multiple-choice-tests';

export const multipleChoiceTestAPI = {
  async getOne(id: string) {
    return fetch(ENDPOINT + '/' + id)
      .then((response) => response.json())
      .then((response) => response.data);
  },
};
