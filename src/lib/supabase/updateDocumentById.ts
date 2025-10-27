/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from "./supabase";

export interface GetDocumentByIdParam {
  documentId: string;
  document: UpdateDocumentById;
}

export interface UpdateDocumentById {
  title?: string;
  description?: string;
  category_id?: number;
  expires_at?: Date | null;
}

export async function updateDocumentById({
  documentId,
  document,
}: GetDocumentByIdParam) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Usuário não autenticado.");
    }

    const { data, error: updateError } = await supabase
      .from("documents")
      .update({
        title: document.title,
        description: document.description,
        category_id: document.category_id,
        expires_at: document.expires_at,
      })
      .eq("id", documentId);

    if (updateError) {
      throw new Error(`Erro ao salvar metadados: ${updateError.message}`);
    }

    return data;
  } catch (error: any) {
    console.error("Erro em uploadDocument:", error);
    throw new Error(error?.message || "Falha ao enviar documento.");
  }
}
