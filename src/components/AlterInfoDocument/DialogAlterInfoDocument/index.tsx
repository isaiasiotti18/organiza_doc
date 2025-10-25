import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PlusIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

interface DialogAlterInfoDocumentProps {
  children?: React.ReactNode;
}

export function DialogAlterInfoDocument({
  children,
}: DialogAlterInfoDocumentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <PlusIcon size={24} />
          Alterar Informações
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Altere as informações do documento.</DialogTitle>
          <DialogDescription>Preencha as informações abaixo.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
