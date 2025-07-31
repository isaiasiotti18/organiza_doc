import { DocumentInterface } from '../../interfaces/DocumentInterface'

import { categories } from '@/interfaces/CategoryInterface'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog } from '@/components/ui/dialog'

import { useForm } from "react-hook-form"

import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectContent } from '@radix-ui/react-select'
import { DialogTrigger } from '@radix-ui/react-dialog'

const categoryTitles = categories.map(category => category.title)

const newDocumentFormValidationSchema = zod.object({
  name: zod.string().min(5, 'Informe o nome do documento.'),
  description: zod.string().min(5, 'Informe o nome do documento.').max(20),
  file: zod.file().max(1_000_000*5),
  category: zod.enum(categoryTitles),
  dueDate: zod.date()
})

type newDocumentFormData = zod.infer<typeof newDocumentFormValidationSchema> 


export function SendDocument() {
  
  const newDocumentForm = useForm<newDocumentFormData>({
    resolver: zodResolver(newDocumentFormValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      file: undefined,
      category: '',
      dueDate: new Date()
    }
  })

  const { handleSubmit, reset, control } = newDocumentForm 

  function handleCreateNewDocument(data: newDocumentFormData) {
    const documentId = String(new Date().getTime())

    const newDocument: DocumentInterface = {
      id: documentId,
      name: data.name,
      category: data.category,
      file: data.file,
      description: data.description,
      dueDate: data.dueDate,
      url: `http://localhost:3001/app/category/${data.category}/${documentId}`
    }

    console.log(newDocument)
    reset()
  }

  return (
    <Dialog>
      <Form {...newDocumentForm}>
        <form onSubmit={handleSubmit(handleCreateNewDocument)}>
          <DialogTrigger>

          </DialogTrigger>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Documento</FormLabel>
                <FormControl>
                  <Input placeholder='De um nome para o seu documento.' {...field} />
                </FormControl>
              </FormItem>            
            )}
          />

          <FormField
            control={control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder='Dê uma descrição para o seu documento' {...field} />
                </FormControl>
              </FormItem>            
            )}
          />

          <FormField
            control={control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria do seu documento." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryTitles.map((title) => (
                      <SelectItem value={title}>{title}</SelectItem>
                    ))}
                  </SelectContent>           
                </Select>
              </FormItem>            
            )}
          />

          <FormField
            control={control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder='Dê uma descrição para o seu documento' {...field} />
                </FormControl>
              </FormItem>            
            )}
          />
                    
        </form>
      </Form>
    </Dialog>
  )
}