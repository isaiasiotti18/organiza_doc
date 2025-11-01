/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabase"; // ajuste conforme seu projeto

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
  } catch (error: any) {
    console.error("Error: ", error);
    throw new Error(error.message);
  }
}

export function useUpdateNotificationDays() {
  return useMutation({
    mutationFn: updateNotificationDays,
  });
}
