import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { useCreateCategory } from "@/hooks/categories/use-create-category";
import {
  CreateCategorySchema,
  createCategorySchema,
} from "@/validations/create-category-schema";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function FormNewCategory() {
  const createCategoryForm = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
  });

  const { control, handleSubmit, reset } = createCategoryForm;

  const createCategory = useCreateCategory();

  async function handleNewCategory(data: CreateCategorySchema) {
    try {
      await createCategory.mutateAsync({
        name: data.name,
      });

      reset({
        name: "",
      });

      toast.success("Nova categoria adicionada");
    } catch (error) {
      toast.error(`Erro criar nova categoria.\n${error}`);
    }
  }

  return (
    <Form {...createCategoryForm}>
      <form onSubmit={handleSubmit(handleNewCategory)}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Nome da categoria
                  </FieldLabel>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    type="text"
                    placeholder="Ex: Certidões"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
