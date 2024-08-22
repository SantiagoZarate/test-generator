export type Test = {
  id: string;
  name: string;
  created_at: string;
  questions: string[];
};

export type TestSelect = Pick<Test, "id">;
export type TestInsert = Pick<Test, "name" | "questions">;
