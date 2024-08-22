import { z } from "zod";
import { TestInsert } from "../../types/test.types";

export const testSchemaValidation = z.object({
  title: z.string(),
  questions: z.array(z.string()),
}) satisfies z.ZodType<TestInsert>;
