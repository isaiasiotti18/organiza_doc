import { supabase } from "./supabase";

export interface GetDocumentSupabase {
  id: string; // uuid
  user_id: string;
  category_id: number;
  title: string;
  description?: string | null;
  file_url: string;
  expires_at?: string | null; // date em formato ISO string
  created_at: string; // timestamp em formato ISO string
}

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
      category_id,
      title,
      description,
      file_url,
      expires_at,
      created_at
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar documentos:", error);
    throw new Error(error.message);
  }

  return data as GetDocumentSupabase[];
}
