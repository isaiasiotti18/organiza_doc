import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { FormAlterInfoDocument } from "../FormAlterInfoDocument";
import { useState } from "react";

interface DialogAlterInfoDocumentProps {
  documentId: string;
}

export function DialogAlterInfoDocument({
  documentId,
}: DialogAlterInfoDocumentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex-1 cursor-pointer"
          type="button"
          variant="outline"
        >
          <SquarePen size={16} />
          Alterar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Altere as informações do documento.</DialogTitle>
          <DialogDescription>Preencha as informações abaixo.</DialogDescription>
        </DialogHeader>
        <FormAlterInfoDocument
          documentId={documentId}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
