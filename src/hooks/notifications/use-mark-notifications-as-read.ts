import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationsAsRead } from "@/lib/supabase/notifications/markNotificationsAsRead";

export function useMarkNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    },
  });
}
