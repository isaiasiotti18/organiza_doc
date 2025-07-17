import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";

export function LoginForm() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form className="space-y-4">
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Senha" required />

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>

        <div className="text-center mt-4">
          <NavLink to="/register"
            className="text-sm text-blue-600 hover:underline"
          >
            Não tem uma conta? Cadastre-se
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
}