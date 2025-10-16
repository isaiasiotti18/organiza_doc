import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  uploadDocument,
  UploadDocumentInput,
  DocumentRecord,
} from "@/utils/supabase/storage/uploadDocument";

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
    onSuccess: (data) => {
      console.log("Documento enviado com sucesso:", data);
    },
    onError: (error) => {
      console.error("Erro ao enviar documento:", error.message);
    },
  });
}
