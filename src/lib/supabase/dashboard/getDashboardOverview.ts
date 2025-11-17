/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const { data: total_documents, error: totalDocumentsError } =
      await supabase
        .from("documents")
        .select("*", { count: "exact" })

    if(totalDocumentsError) {
      throw new Error(`Error Total Documentos: ${totalDocumentsError}`)
    }

    // Expired Documents
    const { data: expired_documents, error: expiredDocumentsError } = 
      await supabase
        .from("documents")
        .select("*", { count: "exact"})
        .gt("expire_at", new Date().toISOString())

    
    if(expiredDocumentsError) {
      throw new Error(`Erro Total de Documentos Expirados: ${expiredDocumentsError}`)
    }

    
    return {      
      total_documents,
      expired_documents
    }

  } catch (error: any) {
    console.error("Erro ao criar nova categoria:", error);
    throw new Error(error.message);
  }
}
