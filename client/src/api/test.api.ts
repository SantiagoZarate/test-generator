import { envs } from "@/config/envs";
import { TestInsert, TestSchema, TestSelect } from "@backend/test.types";

export const testAPI = {
  create: (data: TestInsert) => {
    const options: RequestInit = {
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    return fetch(`${envs.TEST_API_URL}/api/tests`, options).then((response) =>
      response.json()
    );
  },
  getById: ({ id }: TestSelect): Promise<TestSchema> => {
    return fetch(`${envs.TEST_API_URL}/api/tests/${id}`).then((response) =>
      response.json()
    );
  },
};
