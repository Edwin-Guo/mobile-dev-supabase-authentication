import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Please enter a valid email").trim(),
  password: z.string().min(1, "Password is required."),
});

export type SignInData = z.infer<typeof signInSchema>;
