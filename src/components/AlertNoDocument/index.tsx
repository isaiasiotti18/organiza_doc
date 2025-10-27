import { OctagonAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

export function AlertNoDocument() {
  return (
    <div className="flex h-[500px] w-[100%] flex-col items-center justify-center align-middle">
      <Alert variant="default" className="w-[50%]">
        <OctagonAlert />
        <AlertTitle>Categoria vazia.</AlertTitle>
        <AlertDescription>
          Não existe documentos cadastrados nessa categoria.
        </AlertDescription>
      </Alert>
    </div>
  );
}
