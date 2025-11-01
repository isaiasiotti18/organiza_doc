import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotification } from "@/lib/supabase/notifications/deleteNotification";

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    },
  });
}
