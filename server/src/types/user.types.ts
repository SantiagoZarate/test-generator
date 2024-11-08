import { type InferInsertModel } from 'drizzle-orm';
import { userSchema } from '../../drizzle/schemas/user.schema';

export type UserSchema = Required<
  InferInsertModel<typeof userSchema> & {
    questions: string[];
  }
>;

export type UserSelect = Pick<UserSchema, 'id'>;
export type UserInsert = Pick<UserSchema, 'name' | 'email'>;
