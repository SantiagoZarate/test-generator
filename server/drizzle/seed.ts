import { envs } from "../config/envs";
import { TestInsert } from "../src/types/test.types";
import { db } from "./db";
import { questionSchema, testSchema } from "./schemas/test.schema";

const MOCK_TESTS: TestInsert[] = [
  {
    questions: ["Hola que onda"],
    title: "primer test",
  },
];

async function seed() {
  try {
    if (!envs.SEED) {
      throw new Error("This file must be executed on seed mode");
    }

    // DROP DB Manually
    await db.delete(questionSchema);
    await db.delete(testSchema);

    const results = await Promise.all(
      MOCK_TESTS.map(async (mock) => {
        const newTest = await db
          .insert(testSchema)
          .values({
            title: mock.title,
          })
          .returning({ id: testSchema.id });

        const questions = await Promise.all(
          mock.questions.map(async (q) => {
            const newQuestion = await db.insert(questionSchema).values({
              content: q,
              test_id: newTest[0].id,
            });
          })
        );
      })
    );

    console.log("Seeded complete");
  } catch (error) {
    console.log(error);
  }
}

seed();
