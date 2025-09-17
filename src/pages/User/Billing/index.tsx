import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function Billing() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="pr-4 pl-4">
        <h2 className="mb-6 text-center text-2xl font-bold">Assinatura</h2>

        <form className="space-y-4">
          <div className="mt-6 mb-6 flex flex-col gap-2">
            <h1 className="mb-4 text-xl font-bold">Alterar plano</h1>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um novo plano" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Planos</SelectLabel>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Separator className="mt-5" />

          <div className="my-6 flex flex-col gap-2">
            <h1 className="mb-4 text-xl font-bold">
              Alterar cartão de credito
            </h1>

            <div className="mb-6 flex flex-col gap-2">
              <Label>Número do cartão</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="Número do cartão"
              />
            </div>

            <div className="mb-6 flex flex-col gap-2">
              <Label>Nome do titular</Label>
              <Input type="text" placeholder="Nome aqui" />
            </div>

            <div className="flex flex-row gap-2">
              <div>
                <Label>Número de segurança</Label>
                <Input type="text" placeholder="CVC" />
              </div>

              <div>
                <Label>Data de validade</Label>
                <Input type="text" placeholder="12/37" />
              </div>
            </div>
          </div>

          <div className="mt-6 mb-6 flex flex-col gap-2">
            <Label htmlFor="name">Senha atual</Label>
            <Input type="password" placeholder="Senha" />
          </div>

          <div className="flex flex-row justify-center gap-4">
            <Button
              variant="destructive"
              type="submit"
              className="w-[48%]"
              asChild
            >
              <Link to="/app/home">Cancelar</Link>
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
