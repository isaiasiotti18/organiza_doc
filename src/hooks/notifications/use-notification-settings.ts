/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchNotificationDays() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Usuário não autenticado.");
    }

    const { data, error } = await supabase
      .from("notification_settings")
      .select("days_before_expiry")
      .single();

    if (error && error.code !== "PGRST116") throw error;

    return data?.days_before_expiry ?? 20; // fallback
  } catch (error: any) {
    console.error("Error: ", error);
    throw new Error(error.message);
  }
}

export function useNotificationSettings() {
  return useQuery({
    queryKey: ["notificationSettings"],
    queryFn: fetchNotificationDays,
  });
}
