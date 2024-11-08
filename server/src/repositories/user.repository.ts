import { db } from '../../drizzle/connection';
import { userSchema } from '../../drizzle/schemas/user.schema';
import { UserInsert } from '../types/user.types';

class UserRepository {
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
}

export const userRepository = new UserRepository();
