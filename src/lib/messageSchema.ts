import { normalizePhone } from "@/utils/phone";
import { z } from "zod";

export const CONTACT_ERROR_KEYS = {
  name: "contact.errors.name",
  phone: "contact.errors.phone",
  subject: "contact.errors.subject",
  message: "contact.errors.message"
} as const;

export const CONTACT_ERROR_DEFAULTS: Record<string, string> = {
  [CONTACT_ERROR_KEYS.name]: "Indique o seu nome (2 a 80 caracteres).",
  [CONTACT_ERROR_KEYS.phone]: "Indique um número de telefone válido.",
  [CONTACT_ERROR_KEYS.subject]: "Indique o assunto (3 a 120 caracteres).",
  [CONTACT_ERROR_KEYS.message]: "Escreva a mensagem (10 a 2000 caracteres)."
};

function hasValidPhoneLength(value: string): boolean {
  const digits = normalizePhone(value).replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, CONTACT_ERROR_KEYS.name)
    .max(80, CONTACT_ERROR_KEYS.name),
  phone: z
    .string()
    .trim()
    .refine(hasValidPhoneLength, CONTACT_ERROR_KEYS.phone),
  subject: z
    .string()
    .trim()
    .min(3, CONTACT_ERROR_KEYS.subject)
    .max(120, CONTACT_ERROR_KEYS.subject),
  message: z
    .string()
    .trim()
    .min(10, CONTACT_ERROR_KEYS.message)
    .max(2000, CONTACT_ERROR_KEYS.message)
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export type ContactFieldErrors = Partial<
  Record<keyof ContactMessageInput, string>
>;

type IssueLike = { path: ReadonlyArray<PropertyKey>; message: string };

export function toFieldErrors(
  issues: ReadonlyArray<IssueLike>
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of issues) {
    const field = issue.path[0] as keyof ContactMessageInput | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}

export const messagePatchSchema = z
  .object({
    read: z.boolean().optional(),
    archived: z.boolean().optional()
  })
  .refine((patch) => patch.read !== undefined || patch.archived !== undefined, {
    message: "Nada para atualizar."
  });
