import { queryClient } from "@/lib/react-query";
import {
  updateDocumentById,
  GetDocumentByIdParam,
} from "@/lib/supabase/updateDocumentById";
import { useMutation } from "@tanstack/react-query";

export function useUpdateDocumentById() {
  return useMutation({
    mutationFn: async ({ documentId, document }: GetDocumentByIdParam) => {
      return await updateDocumentById({ documentId, document });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
    },

    onError: (error) => {
      return { message: "Erro ao enviar documento:", error: error?.message };
    },
  });
}
