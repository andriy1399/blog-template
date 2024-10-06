import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  coverImage: z
    .string()
    .url({ message: "Cover image must be a valid URL." })
    .optional(),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
});
