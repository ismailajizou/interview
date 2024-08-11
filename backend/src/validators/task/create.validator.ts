import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.string().min(1).max(255),
//   status: z.enum(["DONE", "CANCELLED", "PENDING"]),
});

export type TCreateTask = z.infer<typeof createTaskSchema>;