import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabase";

export function useNotificationsRealtime(userId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    // Subscribe to INSERT/UPDATE/DELETE on notifications table filtered by user_id
    const channel = supabase
      .channel(`public:notifications:user=${userId}`, {
        config: { broadcast: { self: false } },
      })
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // payload.eventType => INSERT | UPDATE | DELETE
          // Invalidar queries relevantes
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
          queryClient.invalidateQueries({
            queryKey: ["notifications-unread-count"],
          });
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [userId, queryClient]);
}
