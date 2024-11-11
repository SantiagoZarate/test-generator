import { envs } from '../config/envs';
import { db } from './connection';
import { questionSchema, testSchema } from './schemas/test.schema';
import { userSchema } from './schemas/user.schema';
import { MOCK_TESTS } from './seed/test.mock';
import { MOCK_USER } from './seed/user.mock';

export async function seed() {
  try {
    // DROP DB Manually
    await db.delete(questionSchema);
    await db.delete(testSchema);
    await db.delete(userSchema);

    const user = await db
      .insert(userSchema)
      .values(MOCK_USER)
      .returning({ id: userSchema.id });

    await Promise.all(
      MOCK_TESTS.map(async (mock) => {
        const newTest = await db
          .insert(testSchema)
          .values({
            title: mock.title,
            user_id: user[0].id,
          })
          .returning({ id: testSchema.id });

        await Promise.all(
          mock.questions.map(async (q) => {
            await db.insert(questionSchema).values({
              content: q,
              test_id: newTest[0].id,
            });
          }),
        );
      }),
    );

    console.log('🌱 -- Seeded complete');
  } catch (error) {
    console.log(error);
  }
}

if (envs.SEED) {
  seed();
}
