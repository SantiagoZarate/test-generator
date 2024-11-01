import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const multipleChoiceTestSchema = sqliteTable("multiple_choice_test", {
  id: text("id")
    .notNull()
    .$defaultFn(() => nanoid())
    .primaryKey(),
  created_at: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  title: text("title").notNull(),
});

export const multipleChoiceQuestionSchema = sqliteTable(
  "multiple_choice_question",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => nanoid())
      .primaryKey(),
    order: integer("order"),
    content: text("content"),
    test_id: text("test_id")
      .references(() => multipleChoiceTestSchema.id, { onDelete: "cascade" })
      .notNull(),
  }
);

export const multipleChoiceTestRelations = relations(
  multipleChoiceTestSchema,
  ({ many }) => ({
    questions: many(multipleChoiceQuestionSchema),
  })
);

export const multipleChoiceQuestionRelations = relations(
  multipleChoiceQuestionSchema,
  ({ one, many }) => ({
    tests: one(multipleChoiceTestSchema, {
      fields: [multipleChoiceQuestionSchema.test_id],
      references: [multipleChoiceTestSchema.id],
    }),
    options: many(optionSchema),
  })
);

export const optionSchema = sqliteTable("option", {
  content: text("content"),
  order: integer("order"),
  isCorrect: integer("is_correct", { mode: "boolean" })
    .notNull()
    .default(false),
  question_id: text("question_id")
    .references(() => multipleChoiceQuestionSchema.id, { onDelete: "cascade" })
    .notNull(),
});

export const optionRelations = relations(optionSchema, ({ one }) => ({
  question: one(multipleChoiceQuestionSchema, {
    fields: [optionSchema.question_id],
    references: [multipleChoiceQuestionSchema.id],
  }),
}));
