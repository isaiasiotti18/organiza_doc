import {
  countDocumentsByCategory,
  DocumentsByCategory,
} from "@/lib/supabase/dashboard/countDocumentsByCategory";
import { useQuery } from "@tanstack/react-query";

export function useCountDocumentsByCategory() {
  return useQuery<DocumentsByCategory[]>({
    queryKey: ["count-documents-by-category"],
    queryFn: () => countDocumentsByCategory(),
  });
}
