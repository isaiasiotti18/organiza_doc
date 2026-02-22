import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabase";

async function updateNotificationDays(days: number) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Usuário não autenticado.");
    }

    const { error } = await supabase.rpc("set_notification_days", {
      days,
    });

    if (error) throw error;

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao atualizar configuração de notificação.");
  }
}

export function useUpdateNotificationDays() {
  return useMutation({
    mutationFn: updateNotificationDays,
  });
}
