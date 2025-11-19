import { useQuery } from "@tanstack/react-query";
import { getUpcomingDueDates } from "@/lib/supabase/dashboard/getUpcomingDueDates";

export function useGetUpcomingDueDate() {
  return useQuery({
    queryKey: ["upcoming-due-dates"],
    queryFn: () => getUpcomingDueDates(),
    staleTime: 1000 * 60 * 5, // 5 minutos, assume que é estático o suficiente
  });
}
