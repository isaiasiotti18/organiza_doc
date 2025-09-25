/* eslint-disable no-useless-escape */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { newUserSupabase } from "@/utils/supabase/newUser";
import { useMutation } from "@tanstack/react-query";

import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormField } from "@/components/ui/form";

const registerFormSchema = z.object({
  name: z.string().min(6),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .regex(
      new RegExp(
        "^(?=.*[AZ])(?=.*[az])(?=.*[0-9])(?=.*[!@#$%^&*()_+‌​‌​\\-=[]{};':\"\‌​\‌​\\|,.<>/?]).{8,}$‌​",
      ),
      {
        error:
          "A senha deve ter pelo menos 8 caracteres e conter uma letra maiúscula, uma letra minúscula e um número",
      },
    ),
});

type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const navigate = useNavigate();

  const form = useForm<RegisterFormSchemaType>();

  const { mutateAsync: newUserSupabaseFn } = useMutation({
    mutationFn: newUserSupabase,
  });

  async function handleRegisterForm(data: RegisterFormSchemaType) {
    try {
      const result = await newUserSupabaseFn({
        email: data.email,
        name: data.name,
        password: data.password,
      });

      if (result.success) {
        toast.success(
          "Confirme o seu cadastro clicando no link que enviamos para o seu e-mail.",
          {
            action: {
              label: "login",
              onClick: () => navigate(`/login?email=${data.email}`),
            },
          },
        );
      } else if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="p-6">
        <h2 className="mb-6 text-center text-2xl font-bold">Criar Conta</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterForm)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Nome completo"
                  required
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="Email que você mais usa"
                  required
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Insira sua senha"
                  required
                  {...field}
                />
              )}
            />

            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
          <NavLink
            to="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Já tem uma conta? Faça login
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
}
