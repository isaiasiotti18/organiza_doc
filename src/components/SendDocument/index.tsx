import { DocumentInterface } from '../../interfaces/DocumentInterface'

import { categories } from '@/interfaces/CategoryInterface'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'

import { useForm } from "react-hook-form"

import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '../ui/button'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const categoryTitles = categories.map(category => category.title)

const newDocumentFormValidationSchema = zod.object({
  name: zod.string().min(3, 'Informe o nome do documento.'),
  description: zod.string().min(5, 'Informe o nome do documento.').max(20),
  file: zod.z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
  category: zod.enum(categoryTitles),
  dueDate: zod.date()
})

type newDocumentFormData = zod.infer<typeof newDocumentFormValidationSchema>

export function SubmitNewDocument() {

  const newDocumentForm = useForm<newDocumentFormData>({
    resolver: zodResolver(newDocumentFormValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      file: undefined,
      category: undefined,
      dueDate: new Date()
    }
  })

  const { handleSubmit, reset } = newDocumentForm

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
    <Form {...newDocumentForm}>
      <form onSubmit={handleSubmit(handleCreateNewDocument)} action='' className='flex flex-col gap-4'>
        <FormField
          control={newDocumentForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Documento</FormLabel>
              <FormControl>
                <Input autoComplete='off' placeholder='De um nome para o seu documento.' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={newDocumentForm.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input autoComplete='off' placeholder='Dê uma descrição para o seu documento' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={newDocumentForm.control}
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
                    <SelectItem key={title} value={title}>{title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={newDocumentForm.control}
          name='file'
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <FormItem>
              <FormLabel>Arquivo</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  placeholder='Selecione o arquivo do seu documento'
                  name={name}
                  ref={ref}
                  onBlur={onBlur}
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    onChange(file);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-[33%]' type='submit'>Salvar Documento</Button>
      </form>
    </Form>
  )
}