import { db } from "../../drizzle/connection";
import { questionSchema, testSchema } from "../../drizzle/schemas/test.schema";
import { TestInsert, TestSelect } from "../types/test.types";
import { NotFoundError } from "../utils/errors";

export class TestRepository {
  private _db: typeof db;
  constructor() {
    this._db = db;
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
}
