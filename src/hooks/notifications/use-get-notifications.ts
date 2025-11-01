import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "@/lib/supabase/notifications/fetchNotifications";

export function useGetNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });
}
