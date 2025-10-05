/* eslint-disable no-useless-escape */

import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email().nonempty("Email obrigatório."),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número",
    )
    .nonempty("Senha é obrigatório"),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
