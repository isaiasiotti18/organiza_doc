import { useQuery } from "@tanstack/react-query";
import { getDocumentById } from "@/lib/supabase/getDocumentById";

interface UseGetDocumentById {
  documentId: string;
  open: boolean;
}

export function useGetDocumentById({ documentId, open }: UseGetDocumentById) {
  return useQuery({
    queryKey: ["document", documentId],
    queryFn: () => getDocumentById({ documentId }),
    enabled: open,
  });
}
