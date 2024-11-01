import { envs } from "../config/envs";
import { db } from "./db";
import { questionSchema, testSchema } from "./schemas/test.schema";
import { MOCK_TESTS } from "./seed/test.mock";

async function seed() {
  try {
    if (!envs.SEED) {
      throw new Error("This file must be executed on seed mode");
    }

    // DROP DB Manually
    await db.delete(questionSchema);
    await db.delete(testSchema);

    await Promise.all(
      MOCK_TESTS.map(async (mock) => {
        const newTest = await db
          .insert(testSchema)
          .values({
            title: mock.title,
          })
          .returning({ id: testSchema.id });

        await Promise.all(
          mock.questions.map(async (q) => {
            await db.insert(questionSchema).values({
              content: q,
              test_id: newTest[0].id,
            });
          })
        );
      })
    );

    console.log("🌱 -- Seeded complete");
  } catch (error) {
    console.log(error);
  }
}

seed();
