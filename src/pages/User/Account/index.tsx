import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function Account() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="pr-4 pl-4">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Alterar informações da conta
        </h2>

        <form className="space-y-4">
          <div className="mt-6 mb-6 flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" placeholder="Nome" />
          </div>

          <div className="mt-6 mb-6 flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="E-mail" />
          </div>

          <div className="mt-6 mb-6 flex flex-col gap-2">
            <Label htmlFor="name">Senha atual</Label>
            <Input type="password" placeholder="Senha" />
          </div>

          <div className="mt-6 mb-6 flex flex-row justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nova senha</Label>
              <Input type="password" placeholder="Nova senha" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Confirme a nova senha</Label>
              <Input type="password" placeholder="Confime a senha" />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-4">
            <Button
              variant="destructive"
              type="submit"
              className="w-[48%]"
              asChild
            >
              <Link to="/app/documents/all">Cancelar</Link>
            </Button>

            <Button type="submit" className="w-[48%]">
              Alterar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
