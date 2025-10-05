import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/components/ui/form";
import { EyeIcon, EyeClosedIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  LoginFormSchemaType,
} from "@/validations/login-form-schema";

export function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function handleLoginForm() {
    console.log(form.getValues());
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="p-6">
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLoginForm)}
            className="space-y-4"
          >
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
                      placeholder="E-mail cadastrado no sistema."
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

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
          <NavLink
            to="/register"
            className="text-sm text-blue-600 hover:underline"
          >
            Não tem uma conta? Cadastre-se
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
}
