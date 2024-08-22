import { Test, TestInsert, TestSelect } from "../types/test.types";

const tests: Test[] = [
  {
    created_at: new Date().toDateString(),
    id: "1",
    name: "my first test",
    questions: [
      "who is messi?",
      "why is he famous?",
      "how many world cups has he won?",
    ],
  },
];

export class TestRepository {
  async getById(id: TestSelect) {
    return tests[0];
    // throw new Error("Not yet Implemented");
  }

  async create(data: TestInsert) {
    throw new Error("Not yet Implemented");
  }
}
