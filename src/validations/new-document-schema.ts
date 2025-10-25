import * as zod from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const newDocumentFormValidationSchema = zod.object({
  title: zod
    .string()
    .min(3, "Informe o nome do documento.")
    .nonempty("Campo nome não pode estar vazio."),
  description: zod
    .string()
    .min(5, "Informe o nome do documento.")
    .max(20)
    .optional(),
  file: zod.z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
  category: zod.string().nonempty("Selecione uma categoria."),
  expires_at: zod.date().optional(),
});

export type NewDocumentFormData = zod.infer<
  typeof newDocumentFormValidationSchema
>;
