import { envs } from '@/config/envs';
import { TestInsert, TestSchema, TestSelect } from '@backend/test.types';
import {
  APIResponse,
  GetDataResponse,
  PostDataResponse,
} from './test.api.type';

export const testAPI = {
  create: (data: TestInsert): Promise<APIResponse<PostDataResponse[]>> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(`${envs.TEST_API_URL}/api/tests`, options).then((response) =>
      response.json()
    );
  },
  getById: ({ id }: TestSelect): Promise<TestSchema> => {
    return fetch(`${envs.TEST_API_URL}/api/tests/${id}`).then((response) =>
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
};
