import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Enter valid name" })
      .max(20, { message: "less than 20 charaters only" }),
    email: z.string().trim().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, {
        message: "Password is required",
      })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ ~`!@#$%^&*()_\-+={[}\]\|\\:;"'<,>.?/])[A-Za-z\d ~`!@#$%^&*()_\-+={[}\]\|\\:;"'<,>.?/]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const CredentialSchema = z.object({
  username: z.string().trim().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const NoteSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required",
  }),
  description: z.string(),
});
