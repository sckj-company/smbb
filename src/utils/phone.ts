/** Guarda só dígitos, mantendo o "+" inicial quando existir. */
export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  return value.trim().startsWith("+") ? `+${digits}` : digits;
}

/** 900000000 -> "900 000 000" e +244900000000 -> "+244 900 000 000". */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const hasCountryCode = digits.length === 12 && digits.startsWith("244");
  const national = hasCountryCode ? digits.slice(3) : digits;
  if (national.length !== 9) return phone;

  const grouped = national.replace(/(\d{3})(?=\d)/g, "$1 ");
  return hasCountryCode ? `+244 ${grouped}` : grouped;
}

export function buildPhoneHref(phone: string): string {
  return `tel:${normalizePhone(phone)}`;
}

/** Números angolanos de 9 dígitos recebem o indicativo 244. */
export function buildWhatsAppHref(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  const international = digits.length === 9 ? `244${digits}` : digits;
  return `https://wa.me/${international}?text=${encodeURIComponent(message)}`;
}
