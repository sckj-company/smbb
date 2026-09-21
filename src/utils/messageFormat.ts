export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";

  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

export function formatMessagePreview(body: string): string {
  return body.replace(/\s+/g, " ").trim();
}

export function formatMessageListTime(
  isoDate: string,
  now = new Date()
): string {
  const date = new Date(isoDate);

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString("pt-AO", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString("pt-AO", { day: "numeric", month: "short" });
  }
  return date.toLocaleDateString("pt-AO");
}
