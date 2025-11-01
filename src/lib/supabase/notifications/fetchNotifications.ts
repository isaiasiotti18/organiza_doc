import { supabase } from "../supabase";

export async function fetchNotifications() {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("deleted", false)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
