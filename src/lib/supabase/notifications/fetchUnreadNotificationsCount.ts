import { supabase } from "../supabase";

export async function fetchUnreadNotificationsCount() {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("viewed", false)
    .eq("deleted", false);

  if (error) throw error;
  return count ?? 0;
}
