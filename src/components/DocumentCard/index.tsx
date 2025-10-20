import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon, FileArrowDownIcon } from "@phosphor-icons/react";

interface DocumentCardProps {
  id: string; // uuid
  title: string;
  description?: string | null;
  category: {
    id: number;
    name: string;
  };
  file_url: string;
  expires_at?: string | null; // date em formato ISO string
  created_at: string;
}

export function DocumentCard({
  id,
  title,
  description,
  category,
  file_url,
  expires_at,
  created_at,
}: DocumentCardProps) {
  return (
    <Card key={id} className="m-0 w-full p-2 pr-0 md:w-[48%] lg:w-[33%]">
      <CardHeader className="m-0 flex flex-row justify-between p-0 pt-2 pr-2.5">
        <div className="flex flex-col gap-1.5">
          <CardTitle>
            <span>{`${title} - ${category.name}`}</span>
          </CardTitle>
          <CardDescription className="justify-center align-middle">
            {description}
          </CardDescription>
        </div>
        <div className="align flex flex-col gap-1.5">
          <span className="text-muted-foreground text-[12px]">
            Criado em: {created_at}
          </span>
          <span className="text-muted-foreground text-[12px]">
            Expira em: {expires_at}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between p-0">
        <a href={file_url} className="flex flex-row gap-2">
          <FileArrowDownIcon size={20} />
          <span>Baixar Documento</span>
        </a>
        <a href={file_url} className="flex flex-row gap-2">
          <EyeIcon size={20} />
          <span>Visualizar Documento</span>
        </a>
      </CardContent>
      <CardFooter className="flex flex-row justify-center gap-2 p-0">
        <Button variant="destructive">Excluir Documento</Button>
        <Button variant="outline">Alterar Documento</Button>
      </CardFooter>
    </Card>
  );
}
