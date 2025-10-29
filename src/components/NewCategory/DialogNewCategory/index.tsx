import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

export function DialogNewCategory({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex h-full w-full cursor-pointer justify-center gap-2.5 rounded-none border-0 p-4 text-center"
        >
          <PlusIcon size={24} />
          <span className="font-bold">Nova categoria</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Insira uma nova categoria.</DialogTitle>
          <DialogDescription>
            Descreva em poucas palavras quais tipos de documentos essa categoria
            irá armazenar.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
