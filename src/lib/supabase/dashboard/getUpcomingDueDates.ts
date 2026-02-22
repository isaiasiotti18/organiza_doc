import { supabase } from "../supabase";

type Notification = {
  id: string;
  user_id: string;
  document_id: string;
  message: string;
  expires_at: string;
  days_left: number;
  viewed: boolean;
  deleted: boolean;
  created_at: string;
  documents: {
    id: string;
    name: string;
  } | null;
};

export async function getUpcomingDueDates() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Usuário não autenticado.");
    }

    const { data, error } = await supabase
      .from("notifications")
      .select(
        `
    id,
    user_id,
    document_id,
    message,
    expires_at,
    days_left,
    viewed,
    deleted,
    created_at
  `,
      )
      .eq("user_id", user.id)
      .eq("deleted", false)
      .order("expires_at", { ascending: true })
      .limit(5)
      .returns<Notification[]>();

    if (error) {
      throw new Error("Erro ao buscar próximos vencimentos.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao buscar próximos vencimentos.");
  }
}
