import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const testSchema = sqliteTable("test", {
  id: text("id").notNull().default(nanoid()).primaryKey(),
  created_at: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  title: text("title").notNull(),
});

export const questionSchema = sqliteTable("question", {
  content: text("question"),
  test_id: text("test_id")
    .references(() => testSchema.id)
    .notNull(),
});

export const testRelations = relations(testSchema, ({ many }) => ({
  questions: many(questionSchema),
}));

export const questionRelations = relations(questionSchema, ({ one }) => ({
  tests: one(testSchema, {
    fields: [questionSchema.test_id],
    references: [testSchema.id],
  }),
}));
