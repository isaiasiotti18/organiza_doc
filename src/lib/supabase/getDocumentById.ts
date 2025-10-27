import { GetDocumentSupabase } from "@/interfaces/supabase/GetDocumentSupabase";
import { supabase } from "./supabase";

interface GetDocumentByIdParam {
  documentId: string;
}

export async function getDocumentById({
  documentId,
}: GetDocumentByIdParam): Promise<GetDocumentSupabase> {
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
    .eq("id", documentId);

  if (error) {
    console.error("Erro ao buscar documentos:", error);
    throw new Error(error.message);
  }

  return data as unknown as GetDocumentSupabase;
}
