/* eslint-disable @typescript-eslint/no-explicit-any */
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

    console.log(data);

    if (insertError) {
      throw new Error(`Erro ao salvar categoria: ${insertError.message}`);
    }

    return data as CreateCategorySupabase;
  } catch (error: any) {
    console.error("Erro ao criar nova categoria:", error);
    throw new Error(error.message);
  }
}
