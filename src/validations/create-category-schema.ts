import * as z from "zod";

export const createCategorySchema = z.object({
  name: z.string("Input está vazio").trim().min(5, "Minimo 5 caracteres"),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
