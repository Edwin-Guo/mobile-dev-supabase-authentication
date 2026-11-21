import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.email("Please enter a valid email").trim(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string().min(1, "Password confirmation required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
