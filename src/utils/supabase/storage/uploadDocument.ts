/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "../supabase";

export interface UploadDocumentInput {
  category_id: number;
  title: string;
  description?: string | null;
  expires_at?: string | null;
  file: File;
}

export interface DocumentRecord {
  id: string;
  user_id: string;
  category_id: number;
  title: string;
  description?: string | null;
  file_url: string;
  expires_at?: string | null;
  created_at: string;
}

export async function uploadDocument(
  input: UploadDocumentInput,
): Promise<DocumentRecord> {
  try {
    // 🧩 0️⃣ Verifica se o usuário está autenticado
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Usuário não autenticado.");
    }

    // 1️⃣ Nome único para o arquivo
    const fileExt = input.file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // 2️⃣ Upload para o Storage (bucket "organizadoc-bkt-documents")
    const { error: uploadError } = await supabase.storage
      .from("organizadoc-bkt-documents")
      .upload(filePath, input.file);

    if (uploadError) {
      throw new Error(`Erro ao enviar arquivo: ${uploadError.message}`);
    }

    // 3️⃣ Obter URL pública (ou substitua por createSignedUrl se for bucket privado)
    const { data: publicUrlData } = supabase.storage
      .from("organizadoc-bkt-documents")
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

    // 4️⃣ Inserir dados na tabela "documents"
    const { data, error: insertError } = await supabase
      .from("documents")
      .insert({
        user_id: user.id, // 🔐 agora garantido
        category_id: input.category_id,
        title: input.title,
        description: input.description || null,
        file_url: fileUrl,
        expires_at: input.expires_at || null,
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Erro ao salvar metadados: ${insertError.message}`);
    }

    return data as DocumentRecord;
  } catch (error: any) {
    console.error("Erro em uploadDocument:", error);
    throw new Error(error.message || "Falha ao enviar documento.");
  }
}
