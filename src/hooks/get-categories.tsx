import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/utils/supabase/getCategories";
import { useAuth } from "@/context/auth-provider";

export function useCategories() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["categories", user?.id],
    queryFn: () => getCategories(),
    enabled: !!user,
  });
}
