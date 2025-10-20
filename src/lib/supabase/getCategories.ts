import { supabase } from "./supabase";

export interface GetCategorySupabase {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

/**
 * Retorna todas as categorias do usuário logado
 */
export async function getCategories(): Promise<GetCategorySupabase[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Usuário não autenticado.");
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, user_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error(error.message);
  }

  return data as GetCategorySupabase[];
}
