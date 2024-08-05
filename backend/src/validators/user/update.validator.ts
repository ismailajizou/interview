import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(255).optional(),
});

export type TUpdateUser = z.infer<typeof updateUserSchema>;
