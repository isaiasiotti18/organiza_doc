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
import { formatDate } from "@/utils/formatDate";

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
      <CardHeader className="m-0 flex flex-row justify-between gap-2 p-0 pt-2 pr-2.5">
        <div className="flex min-w-0 flex-col gap-1.5">
          <CardTitle className="truncate overflow-hidden text-ellipsis whitespace-nowrap">
            {`${title} - ${category.name}`}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </div>
        <div className="flex flex-shrink-0 flex-col text-right">
          <span className="text-muted-foreground text-[12px]">
            Criado em: {formatDate(created_at)}
          </span>
          <span className="text-muted-foreground text-[12px]">
            Expira em: {formatDate(expires_at)}
          </span>
        </div>
      </CardHeader>

      <CardFooter className="flex flex-row content-center justify-center gap-1.5 px-2">
        <Button asChild className="flex-1" variant="default">
          <a href={file_url} target="_blank">
            <EyeIcon size={16} />
            Visualizar
          </a>
        </Button>
        <Button className="flex-1 cursor-pointer" variant="outline">
          Alterar
        </Button>
        <Button className="flex-1 cursor-pointer" variant="destructive">
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
}
