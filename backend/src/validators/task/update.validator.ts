import { z } from "zod";

export const updateTaskSchema = z.object({
  status: z.enum(["DONE", "CANCELLED", "PENDING"]),
});

export type TUpdateTask = z.infer<typeof updateTaskSchema>;
