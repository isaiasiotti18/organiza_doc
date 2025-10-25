import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { useGetCategories } from "@/hooks/use-get-categories";
import { useUploadDocument } from "@/hooks/use-upload-document";
import { toast } from "sonner";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  NewDocumentFormData,
  newDocumentFormValidationSchema,
} from "@/validations/new-document-schema";

export function FormSubmitNewDocument() {
  const newDocumentForm = useForm<NewDocumentFormData>({
    resolver: zodResolver(newDocumentFormValidationSchema),
  });

  const { data: categories } = useGetCategories();
  const uploadMutation = useUploadDocument();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = newDocumentForm;

  async function handleCreateNewDocument(data: NewDocumentFormData) {
    try {
      await uploadMutation.mutateAsync({
        title: data.title,
        description: data.description,
        file: data.file,
        category_id: Number(data.category),
      });

      toast.success("Documento enviado com sucesso!");
      reset({
        title: "",
        category: "",
        description: "",
        expires_at: undefined,
        file: undefined,
      });
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao enviar o documento. ${error}`);
    }
  }

  return (
    <Form {...newDocumentForm}>
      <form
        onSubmit={handleSubmit(handleCreateNewDocument)}
        action=""
        className="flex flex-col gap-4"
      >
        <Controller
          control={newDocumentForm.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Título do Documento*</FieldLabel>
              <Input
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                type="text"
                placeholder="De um título para o seu documento."
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={newDocumentForm.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Descrição (Opcional)</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder="Dê uma descrição para o seu documento"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={newDocumentForm.control}
          name="category"
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-rhf-select-category">
                  Categoria do documento
                </FieldLabel>
                <FieldDescription>
                  Escolha a categoria que melhor representa o documento.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="form-rhf-select-category"
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <SelectValue placeholder="Selecione a categoria do seu documento." />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          control={newDocumentForm.control}
          name="file"
          render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={name}>Arquivo</FieldLabel>
              <Input
                id={name}
                type="file"
                placeholder="Selecione o arquivo do seu documento"
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  onChange(file);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button className="w-[33%]" type="submit" disabled={isSubmitting}>
          Salvar Documento
        </Button>
      </form>
    </Form>
  );
}
