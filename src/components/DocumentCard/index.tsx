import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { Eye, FileArrowDown } from 'phosphor-react';

interface DocumentCardProps {
  name: string;
  description: string;
  category: string | undefined;
  url: string;
}

export function DocumentCard({ name, description, category, url }: DocumentCardProps) {
  return (
    <Card className='p-2 pr-0 m-0 w-full md:w-[48%] lg:w-[33%]'>
      <CardHeader className='flex flex-row justify-between p-0 m-0'>
        <div className='flex flex-col gap-1.5'>
          <CardTitle><span>{`${name} - ${category}`}</span></CardTitle>
          <CardDescription className='align-middle justify-center'>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='p-0 flex flex-col items-center justify-between'>
        <a href={url} className='flex flex-row gap-2'>
          <FileArrowDown size={20} />
          <span>Baixar Documento</span>
        </a>
        <a href={url} className='flex flex-row gap-2'>
          <Eye size={20} />
          <span>Visualizar Documento</span>
        </a>       
      </CardContent>
      <CardFooter className='p-0 flex flex-row gap-2 justify-center'>
        <Button variant="destructive">Excluir Documento</Button>
        <Button variant="outline" >Alterar Documento</Button>
      </CardFooter>
    </Card>

  )
}