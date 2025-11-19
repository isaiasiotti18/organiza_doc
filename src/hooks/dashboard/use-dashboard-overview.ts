import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/lib/supabase/dashboard/getDashboardOverview";

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: () => getDashboardOverview(),
  });
}
