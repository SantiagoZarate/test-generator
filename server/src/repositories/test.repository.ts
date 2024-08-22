import { db } from "../../drizzle/db";
import { testSchema } from "../../drizzle/schemas/test.schema";
import { TestInsert, TestSelect } from "../types/test.types";

export class TestRepository {
  private _db: typeof db;
  constructor() {
    this._db = db;
  }

  async getById({ id }: TestSelect) {
    const test = await this._db.query.testSchema.findFirst({
      where: (test, { eq }) => eq(test.id, id),
    });

    return test;
  }

  async create(data: TestInsert) {
    const test = await this._db
      .insert(testSchema)
      .values(data)
      .returning({ id: testSchema.id });

    return test;
  }
}
