import { useQuery } from "@tanstack/react-query";
import { getUpcomingDueDates } from "@/lib/supabase/dashboard/getUpcomingDueDates";

export function useGetUpcomingDueDate() {
  return useQuery({
    queryKey: ["upcoming-due-dates"],
    queryFn: () => getUpcomingDueDates(),
  });
}
