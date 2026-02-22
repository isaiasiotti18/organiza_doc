import { supabase } from "./supabase";

export interface CreateCategorySupabase {
  name: string;
}

export async function createCategory({
  name,
}: CreateCategorySupabase): Promise<CreateCategorySupabase> {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Usuário não autenticado.");
    }

    const { data, error: insertError } = await supabase
      .from("categories")
      .insert({
        user_id: user.id,
        name: name,
      })
      .select()
      .single();

    if (insertError) {
      throw new Error("Erro ao salvar categoria. Tente novamente.");
    }

    return data as CreateCategorySupabase;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao criar categoria.");
  }
}
