import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { newUserSupabase } from "@/utils/supabase/newUser";
import { useMutation } from "@tanstack/react-query";

import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import {
  registerFormSchema,
  RegisterFormSchemaType,
} from "@/validations/register-form-schema";

import { EyeIcon, EyeClosedIcon } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterForm() {
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const {
    formState: { errors },
  } = form;

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

        form.reset();
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
                <FormItem>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nome completo"
                      required
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="E-mail que você mais usa"
                      required
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Insira sua senha"
                        required
                        {...field}
                      />
                    </FormControl>
                    <span className="absolute top-1.5 right-3">
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? (
                          <EyeIcon
                            className="text-muted-foreground cursor-pointer"
                            size={24}
                          />
                        ) : (
                          <EyeClosedIcon
                            className="text-muted-foreground cursor-pointer"
                            size={24}
                          />
                        )}
                      </button>
                    </span>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirm_password">
                    Confirme a senha
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        id="confirm_password"
                        type={isPasswordConfirmVisible ? "text" : "password"}
                        placeholder="Confirme a sua senha"
                        required
                        {...field}
                      />
                    </FormControl>
                    <span className="absolute top-1.5 right-3">
                      <button
                        type="button"
                        onClick={() =>
                          setIsPasswordConfirmVisible(!isPasswordConfirmVisible)
                        }
                      >
                        {isPasswordConfirmVisible ? (
                          <EyeIcon
                            className="text-muted-foreground cursor-pointer"
                            size={24}
                          />
                        ) : (
                          <EyeClosedIcon
                            className="text-muted-foreground cursor-pointer"
                            size={24}
                          />
                        )}
                      </button>
                    </span>
                  </div>
                </FormItem>
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
