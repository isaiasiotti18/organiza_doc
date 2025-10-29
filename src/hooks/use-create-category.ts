import { queryClient } from "@/lib/react-query";
import { createCategory } from "@/lib/supabase/createCategory";
import { useMutation } from "@tanstack/react-query";

interface CreateCategory {
  name: string;
}

export function useCreateCategory() {
  return useMutation({
    mutationFn: async ({ name }: CreateCategory) => {
      return await createCategory({ name });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (error) => {
      return { message: "Erro ao salvar categoria:", error: error?.message };
    },
  });
}
