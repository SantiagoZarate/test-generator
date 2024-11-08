import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { userSchema } from './user.schema';

export const testSchema = sqliteTable('test', {
  id: text('id')
    .notNull()
    .$defaultFn(() => nanoid())
    .primaryKey(),
  created_at: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  title: text('title').notNull(),
  user_id: text('user_id')
    .references(() => userSchema.id, {
      onDelete: 'cascade',
    })
    .notNull(),
});

export const questionSchema = sqliteTable('question', {
  content: text('question'),
  test_id: text('test_id')
    .references(() => testSchema.id, { onDelete: 'cascade' })
    .notNull(),
});

export const testRelations = relations(testSchema, ({ many, one }) => ({
  questions: many(questionSchema),
  user: one(userSchema, {
    references: [userSchema.id],
    fields: [testSchema.user_id],
  }),
}));

export const questionRelations = relations(questionSchema, ({ one }) => ({
  tests: one(testSchema, {
    fields: [questionSchema.test_id],
    references: [testSchema.id],
  }),
}));
