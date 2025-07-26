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
  category: string | undefined;
  url: string;
}

export function DocumentCard({ name, description, category, url }: DocumentCardProps) {
  return (
    <Card className='w-96 p-2 m-0'>
      <CardHeader className='flex flex-row justify-between p-0 m-0'>
        <div className='flex flex-col gap-1.5'>
          <CardTitle><span>{`${name} - ${category}`}</span></CardTitle>
          <CardDescription className='align-middle justify-center'>{description}</CardDescription>
        </div>
        <CardAction>
          <Button variant="link">Visualizar Documento</Button>
        </CardAction>
      </CardHeader>
      <CardContent className='flex items-center justify-end'>
        <a href={url} className='flex flex-row gap-2'>
          <FileArrowDown size={24} />
          <span>Baixar Documento</span>
        </a>
      </CardContent>
      <CardFooter className='p-0 flex flex-row gap-2 justify-end'>
        <Button variant="destructive">Excluir Documento</Button>
        <Button variant="outline" >Alterar Documento</Button>
      </CardFooter>
    </Card>

  )
}