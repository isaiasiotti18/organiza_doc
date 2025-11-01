/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-constant-binary-expression */
import { Form } from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkeletonFormDocument } from "@/components/AlterInfoDocument/FormAlterInfoDocument/SkeletonForm";

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
import { useGetCategories } from "@/hooks/categories/use-get-categories";
import { Button } from "@/components/ui/button";
import { useGetDocumentById } from "@/hooks/documents/use-get-document-by-id";
import { useEffect } from "react";
import { GetDocumentSupabase } from "@/interfaces/supabase/GetDocumentSupabase";
import { useUpdateDocumentById } from "@/hooks/documents/use-update-document-by-id";
import { toast } from "sonner";

export interface FormAlterInfoDocumentProps {
  documentId: string;
  open: boolean;
  onClose: () => void;
}

export function FormAlterInfoDocument({
  documentId,
  open,
  onClose,
}: FormAlterInfoDocumentProps) {
  const { data: categories } = useGetCategories();

  const { data: document, isLoading: isDocLoading } = useGetDocumentById({
    documentId,
    open,
  });

  const formAlterInfoDocument = useForm<AlterInfoDocFormValidationSchema>({
    resolver: zodResolver(alterInfoDocFormValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      expires_at: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = formAlterInfoDocument;

  const updateDocumentById = useUpdateDocumentById();

  async function handleAlterInfoDoc(data: AlterInfoDocFormValidationSchema) {
    try {
      await updateDocumentById.mutateAsync({
        documentId: documentId,
        document: {
          title: data.title,
          description: data?.description,
          category_id: Number(data.category),
          expires_at: data?.expires_at ? new Date(data.expires_at) : null,
        },
      });

      toast.success("Documento atualizado com sucesso!");

      onClose();
    } catch (error) {
      console.log(error);
      toast.error(`Erro ao enviar o documento. ${error}`);
    }
  }

  useEffect(() => {
    // normaliza o document: se vier como array, pega o primeiro elemento
    const doc: GetDocumentSupabase = Array.isArray(document)
      ? document[0]
      : document;

    if (open && doc) {
      reset({
        title: doc.title ?? "",
        description: doc.description ?? "",
        expires_at: doc.expires_at ?? "",
        category: String(doc.category?.id ?? ""),
      });
    }
  }, [open, document, reset]);

  if (isDocLoading || !document) {
    return <SkeletonFormDocument />;
  }

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
          name="expires_at"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Data de vencimento (Opcional)
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="date"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder="Data de vencimento"
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
