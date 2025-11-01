import { supabase } from "../supabase";

export async function markNotificationsAsRead() {
  const { error } = await supabase
    .from("notifications")
    .update({ viewed: true })
    .eq("viewed", false)
    .eq("deleted", false);

  if (error) throw error;
}
