import { count, eq } from 'drizzle-orm';
import { db } from '../../drizzle/connection';
import { questionSchema, testSchema } from '../../drizzle/schemas/test.schema';
import { TestInsert, TestSelect } from '../types/test.types';
import { NotFoundError } from '../utils/errors';
import { PaginateConfig } from '../utils/getPaginatedParams';

export class TestRepository {
  private _db: typeof db;
  constructor() {
    this._db = db;
  }

  async getAll({ limit, page }: PaginateConfig) {
    const data = await db.query.testSchema.findMany({
      limit,
      offset: (page - 1) * limit,
    });
    return data;
  }

  async getCount(): Promise<number> {
    const data = await db
      .select({ count: count(testSchema.id) })
      .from(testSchema);

    return data[0].count;
  }

  async getById({ id }: TestSelect) {
    const test = await this._db.query.testSchema.findFirst({
      where: (test, { eq }) => eq(test.id, id),
      with: {
        questions: {
          columns: {
            test_id: false,
          },
        },
      },
    });

    if (!test) {
      throw new NotFoundError(`Test with id: ${id} not found`);
    }

    return test;
  }

  async create(data: TestInsert) {
    console.log({ data });

    const test = await this._db.transaction(async (tx) => {
      const id = await tx
        .insert(testSchema)
        .values(data)
        .returning({ id: testSchema.id });

      const questions = data.questions.map((q) => ({
        test_id: id[0].id,
        content: q,
      }));

      await tx.insert(questionSchema).values(questions);

      return id;
    });

    return test;
  }

  async delete({ id }: TestSelect) {
    const data = await db.delete(testSchema).where(eq(testSchema.id, id));
    return data.rowsAffected === 1;
  }
}
