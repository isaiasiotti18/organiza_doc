import { Form } from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AlterInfoDocFormValidationSchema,
  alterInfoDocFormValidationSchema,
} from "@/validations/alter-info-document-schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { useGetCategories } from "@/hooks/use-get-categories";
import { Button } from "@/components/ui/button";

export function FormAlterInfoDocument() {
  const formAlterInfoDocument = useForm<AlterInfoDocFormValidationSchema>({
    resolver: zodResolver(alterInfoDocFormValidationSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = formAlterInfoDocument;

  async function handleAlterInfoDoc() {
    console.log("Form");
  }

  const { data: categories } = useGetCategories();

  return (
    <Form {...formAlterInfoDocument}>
      <form
        onSubmit={handleSubmit(handleAlterInfoDoc)}
        className="flex flex-col gap-4"
      >
        <Controller
          control={control}
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
          control={control}
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
          control={control}
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

        <Button className="w-[33%]" type="submit" disabled={isSubmitting}>
          Salvar Documento
        </Button>
      </form>
    </Form>
  );
}
