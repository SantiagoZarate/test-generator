import { TestInsert, TestSelect, TestSchema } from "../types/test.types";
import { db } from "../../drizzle/db";

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
    throw new Error("Not yet Implemented");
  }
}
