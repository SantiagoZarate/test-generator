import { eq } from 'drizzle-orm';
import { db } from '../../drizzle/connection';
import { userSchema } from '../../drizzle/schemas/user.schema';
import { UserInsert, UserSelect } from '../types/user.types';

class UserRepository {
  async createWithPassword(payload: UserInsert & { password: string }) {
    const data = await db
      .insert(userSchema)
      .values({
        email: payload.email,
        name: payload.name,
        password: payload.password,
      })
      .returning({ id: userSchema.id });

    return data[0];
  }

  async create(payload: UserInsert) {
    const data = await db
      .insert(userSchema)
      .values({
        email: payload.email,
        name: payload.name,
      })
      .returning({ id: userSchema.id });

    return data[0];
  }

  async getByEmail(email: UserInsert['email']) {
    const data = await db.query.userSchema.findFirst({
      where: (user) => eq(user.email, email),
    });

    return data;
  }

  async getById({ id }: UserSelect) {
    const data = await db.query.userSchema.findFirst({
      where: (user) => eq(user.id, id),
    });

    return data;
  }

  async getUserProfile({ id }: UserSelect) {
    const data = await db.query.userSchema.findFirst({
      where: (user) => eq(user.id, id),
      with: {
        multipleChoiceTests: true,
        tests: true,
      },
    });

    return data;
  }
}

export const userRepository = new UserRepository();
