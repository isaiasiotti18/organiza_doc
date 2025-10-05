/* eslint-disable no-useless-escape */

import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(6)
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Apenas letras é permitido.")
      .nonempty("Nome obrigatório."),
    email: z.email().nonempty("Email obrigatório."),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        "A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número",
      )
      .nonempty("Senha é obrigatório"),
    confirm_password: z.string().nonempty("Confirmar a senha é obrigatório"),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Senhas não são iguais",
    path: ["confirm_password"],
  });

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
