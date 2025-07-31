import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewCategory({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insira uma nova categoria.</DialogTitle>
            <DialogDescription>
              Descreva em poucas palavras quais tipos de documentos essa categoria irá armazenar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="categoryName">Nome da categoria</Label>
              <Input name="categoryName" placeholder="Ex: Contratos" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}