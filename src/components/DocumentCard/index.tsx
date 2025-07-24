import { 
  Card, 
  CardHeader,
  CardTitle, 
  CardDescription, 
  CardAction,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { FileArrowDown } from 'phosphor-react';

interface DocumentCardProps {
  name: string;
  description: string;
  src?: string;
  category: string | undefined;
  url: string;
}

export function DocumentCard({ name, description, src, category, url }: DocumentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name} - {category}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Button variant="link">Visualizar Documento</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <img src={src} alt={name+' - '+description} />
        <a href={url}>
          <FileArrowDown size={24} />
          Baixar Documento
        </a>
      </CardContent>
      <CardFooter>
        <Button variant="link">Excluir Documento</Button>
        <Button variant="link" >Alterar Documento</Button>
      </CardFooter>
    </Card>
  )
}