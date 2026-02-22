import { supabase } from "../supabase";

export async function deleteNotification(id: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Usuário não autenticado.");
  }

  const { error } = await supabase
    .from("notifications")
    .update({ deleted: true })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error("Erro ao excluir notificação.");
}
