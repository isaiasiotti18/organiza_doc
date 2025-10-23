import { format } from "date-fns";

export function formatDate(date?: string | null): string {
  if (!date) return "";

  const formattedDate = format(new Date(date), "dd/MM/yyyy");
  return formattedDate;
}
