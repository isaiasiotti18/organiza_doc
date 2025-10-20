import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  uploadDocument,
  UploadDocumentInput,
  DocumentRecord,
} from "@/lib/supabase/storage/uploadDocument";
import { queryClient } from "@/lib/react-query";

/**
 * Hook React Query para enviar documento ao storage e salvar no banco.
 * Usa a função uploadDocument definida em uploadDocument.ts
 */
export function useUploadDocument(): UseMutationResult<
  DocumentRecord,
  Error,
  UploadDocumentInput
> {
  return useMutation<DocumentRecord, Error, UploadDocumentInput>({
    mutationFn: async (input: UploadDocumentInput) => {
      return await uploadDocument(input);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      return { message: "Erro ao enviar documento:", error: error?.message };
    },
  });
}
