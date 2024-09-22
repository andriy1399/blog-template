import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignInData = z.infer<typeof signInSchema>;

export const defaultSignInValues: SignInData = {
  email: "",
  password: "",
};
