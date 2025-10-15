import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "@/utils/supabase/getDocuments";

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: () => getDocuments(),
  });
}
