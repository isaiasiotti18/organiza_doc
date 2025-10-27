import { format } from "date-fns";

export function formatDate(date?: string | null): string {
  if (!date) return "";
  const utcDate = new Date(date);
  const localDate = new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
  );
  return format(localDate, "dd/MM/yyyy");
}
