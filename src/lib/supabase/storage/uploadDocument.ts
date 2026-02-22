import { supabase } from "../supabase";

export interface UploadDocumentInput {
  category_id: number;
  title: string;
  description?: string | null;
  expires_at?: Date | null;
  file: File;
}

export interface DocumentRecord {
  id: string;
  user_id: string;
  category_id: number;
  title: string;
  description?: string | null;
  file_url: string;
  expires_at?: Date | null;
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

    // 1️⃣ Validar tipo do arquivo
    const ALLOWED_MIME_TYPES = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!ALLOWED_MIME_TYPES.includes(input.file.type)) {
      throw new Error(
        "Tipo de arquivo não permitido. Use PDF, JPEG, PNG, WEBP ou DOC/DOCX.",
      );
    }

    // 2️⃣ Nome único para o arquivo
    const fileExt = input.file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // 3️⃣ Upload para o Storage (bucket "organizadoc-bkt-documents")
    const { error: uploadError } = await supabase.storage
      .from("organizadoc-bkt-documents")
      .upload(filePath, input.file);

    if (uploadError) {
      throw new Error("Erro ao enviar arquivo. Tente novamente.");
    }

    // 4️⃣ Obter URL pública (ou substitua por createSignedUrl se for bucket privado)
    const { data: publicUrlData } = supabase.storage
      .from("organizadoc-bkt-documents")
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

    // 5️⃣ Inserir dados na tabela "documents"
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
      throw new Error("Erro ao salvar documento. Tente novamente.");
    }

    return data as DocumentRecord;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Falha ao enviar documento.");
  }
}
