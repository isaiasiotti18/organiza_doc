import { supabase } from "../supabase";

export interface DashboardOverview {
  total_documents: number;
  expired_documents: number;
  due_soon_documents: number;
  days_before_expiry: number;
}

/**
 * Invoca a Edge Function "dashboard-overview"
 * O Supabase automaticamente envia o JWT do usuário.
 */
export async function getDashboardOverview(): Promise<DashboardOverview> {
  const { data, error } = await supabase.functions.invoke(
    "dashboard-overview"
  );

  if (error) {
    console.error("Erro ao chamar dashboard-overview:", error);
    throw new Error(error.message);
  }

  return data as DashboardOverview;
}
