import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
  if (!date) return "";

  const parsedDate = parse(date, "yyyy-MM-dd", new Date());

  return format(parsedDate, "d 'de' MMMM", { locale: ptBR });
}

export function formatTimestampDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  const time = date.toLocaleTimeString("pt-AO", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffInDays = Math.floor(
    (startOfToday.getTime() - startOfDate.getTime()) / 86400000
  );

  if (diffInDays === 0) {
    return `Recebido Hoje, ${time}`;
  }

  if (diffInDays === 1) {
    return `Recebido Ontem, ${time}`;
  }

  if (diffInDays >= 2 && diffInDays <= 7) {
    const weekday = date.toLocaleDateString("pt-AO", {
      weekday: "long"
    });

    const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    return `Recebido na ${formattedWeekday}, ${time}`;
  }

  const formattedDate = date.toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  return `Recebido em ${formattedDate}, ${time}`;
}
