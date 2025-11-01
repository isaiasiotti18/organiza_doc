import { useQuery } from "@tanstack/react-query";
import { fetchUnreadNotificationsCount } from "@/lib/supabase/notifications/fetchUnreadNotificationsCount";

export function useUnreadNotificationsCount() {
  return useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: fetchUnreadNotificationsCount,
  });
}
