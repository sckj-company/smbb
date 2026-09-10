import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
  if (!date) return "";

  const parsedDate = parse(date, "yyyy-MM-dd", new Date());

  return format(parsedDate, "d 'de' MMMM", { locale: ptBR });
}
