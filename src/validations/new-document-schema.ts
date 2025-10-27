import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const newDocumentFormValidationSchema = z.object({
  title: z
    .string()
    .min(3, "Informe o nome do documento.")
    .nonempty("Campo nome não pode estar vazio."),
  description: z
    .string()
    .min(5, "Informe o nome do documento.")
    .max(20)
    .optional(),
  file: z.z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
  category: z.string().nonempty("Selecione uma categoria."),
  expires_at: z.string().optional(),
});

export type NewDocumentFormData = z.infer<
  typeof newDocumentFormValidationSchema
>;
