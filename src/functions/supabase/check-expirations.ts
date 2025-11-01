/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const today = new Date();

  // Busca config de usuário + documentos
  const { data: users } = await supabase
    .from("notification_settings")
    .select("user_id, days_before_expiry");

  for (const user of users || []) {
    const { data: docs } = await supabase
      .from("documents")
      .select("id, title, expires_at, user_id")
      .eq("user_id", user.user_id)
      .eq("hidden", false)
      .not("expires_at", "is", null);

    for (const doc of docs || []) {
      const expires = new Date(doc.expires_at);
      const diffMs = expires.getTime() - today.getTime();
      const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (daysLeft <= user.days_before_expiry && daysLeft >= 0) {
        // verifica se já existe notificação para este doc
        const { data: exists } = await supabase
          .from("notifications")
          .select("id")
          .eq("document_id", doc.id)
          .eq("user_id", doc.user_id)
          .eq("deleted", false)
          .eq("viewed", false);

        if (!exists?.length) {
          await supabase.from("notifications").insert({
            user_id: doc.user_id,
            document_id: doc.id,
            message: `Documento ${doc.title} vence em ${daysLeft} dias`,
            expires_at: doc.expires_at,
            days_left: daysLeft,
          });
        }
      }
    }
  }

  return new Response("ok");
});
