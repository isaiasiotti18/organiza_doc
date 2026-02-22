import { GetDocumentSupabase } from "@/interfaces/supabase/GetDocumentSupabase";
import { supabase } from "./supabase";

export async function getDocuments(): Promise<GetDocumentSupabase[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Usuário não autenticado.");
  }

  const { data, error } = await supabase
    .from("documents")
    .select(
      `
      id,
      user_id,
      title,
      description,
      file_url,
      expires_at,
      created_at,
      category:categories (id, name)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Erro ao buscar documentos.");
  }

  return data as unknown as GetDocumentSupabase[];
}
