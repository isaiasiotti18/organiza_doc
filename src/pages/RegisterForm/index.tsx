import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";

export function RegisterForm() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>

        <form className="space-y-4">
          <Input type="text" placeholder="Nome completo" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Senha" required />

          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>

        <div className="text-center mt-4">
          <NavLink to="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Já tem uma conta? Faça login
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
}
