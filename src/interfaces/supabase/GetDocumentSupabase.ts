export interface GetDocumentSupabase {
  id: string; // uuid
  user_id: string;
  title: string;
  description?: string | null;
  file_url: string;
  expires_at?: string | null; // date em formato ISO string
  created_at: string; // timestamp em formato ISO string
  category: {
    id: number;
    name: string;
  };
}
