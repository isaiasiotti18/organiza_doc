import { supabase } from "../supabase";

export type DocumentsByCategory = {
  name: string;
  value: number;
};

export async function countDocumentsByCategory(): Promise<
  DocumentsByCategory[]
> {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Usuário não autenticado.");

    const { data, error } = await supabase.rpc("count_documents_by_category", {
      p_user_id: user.id,
    });

    if (error) throw error;

    return data as DocumentsByCategory[];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao contar documentos por categoria.");
  }
}
