import { supabase } from "../supabase";

export interface DashboardOverview {
  total_documents: number;
  expired_documents: number;
  due_soon_documents: number;
  days_before_expiry: number;
}

export async function getDashboardOverview() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Usuário não autenticado.");
    }

    // Total Documents
    const { data: total_documents, error: totalDocumentsError } = await supabase
      .from("documents")
      .select("*", { count: "exact" })
      .eq("user_id", user.id);

    if (totalDocumentsError) {
      throw new Error("Erro ao buscar total de documentos.");
    }

    // Expired Documents
    const { data: expired_documents, error: expiredDocumentsError } =
      await supabase
        .from("documents")
        .select("*", { count: "exact" })
        .gt("expires_at", new Date().toISOString())
        .eq("user_id", user.id);

    if (expiredDocumentsError) {
      throw new Error("Erro ao buscar documentos expirados.");
    }

    const { data: settings, error: settingsError } = await supabase
      .from("notification_settings")
      .select("days_before_expiry")
      .eq("user_id", user.id)
      .maybeSingle();

    if (settingsError) {
      throw new Error("Erro ao buscar configurações de notificação.");
    }

    const daysBefore = settings?.days_before_expiry ?? 10;

    const today = new Date().toISOString().split("T")[0];
    const endDate = new Date(Date.now() + daysBefore * 86400000)
      .toISOString()
      .split("T")[0];

    const { data: due_soon_documents, error: dueSoonDocumentsError } =
      await supabase
        .from("documents")
        .select("*", { count: "exact", head: true })
        .eq("hidden", false)
        .gte("expires_at", today)
        .lte("expires_at", endDate);

    if (dueSoonDocumentsError) {
      throw new Error("Erro ao buscar documentos próximos do vencimento.");
    }

    return {
      total_documents,
      expired_documents,
      due_soon_documents,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao buscar dados do dashboard.");
  }
}
