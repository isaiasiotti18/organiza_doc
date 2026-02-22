import { supabase } from "../supabase";

export async function markNotificationsAsRead() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Usuário não autenticado.");
  }

  const { error } = await supabase
    .from("notifications")
    .update({ viewed: true })
    .eq("user_id", user.id)
    .eq("viewed", false)
    .eq("deleted", false);

  if (error) throw new Error("Erro ao marcar notificações como lidas.");
}
