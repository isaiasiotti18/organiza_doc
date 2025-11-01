import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "@/lib/supabase/getDocuments";

export function useGetDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: () => getDocuments(),
  });
}
