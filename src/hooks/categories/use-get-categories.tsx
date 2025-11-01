import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/supabase/getCategories";
import { useAuth } from "@/context/auth-provider";

export function useGetCategories() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["categories", user?.id],
    queryFn: () => getCategories(),
    enabled: !!user,
  });
}
