import { supabase } from "../supabase";

export async function deleteNotification(id: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ deleted: true })
    .eq("id", id);

  if (error) throw error;
}
