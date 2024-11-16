import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { multipleChoiceTestSchema } from './multipleTest.schema';
import { testSchema } from './test.schema';

export const userSchema = sqliteTable('user', {
  id: text('id')
    .$defaultFn(() => nanoid())
    .primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  password: text('password'),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  tests: many(testSchema),
  multipleChoiceTests: many(multipleChoiceTestSchema),
}));
