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

import { PlusIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

interface DialogSubmitNewDocumentProps {
  children?: React.ReactNode;
}

export function DialogSubmitNewDocument({
  children,
}: DialogSubmitNewDocumentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <PlusIcon size={24} />
          Novo Documento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Salve um novo documento</DialogTitle>
          <DialogDescription>
            Salve um novo documento preenchendo os cambos abaixo.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
