"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { contactMessageSchema, toFieldErrors } from "@/lib/messageSchema";
import type { ContactFieldErrors } from "@/lib/messageSchema";

export type ContactFormValues = {
  name: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
};

export type ContactFormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "tooManyRequests";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  phone: "",
  subject: "",
  message: "",
  website: ""
};

async function readFieldErrors(
  response: Response
): Promise<ContactFieldErrors> {
  try {
    const data: unknown = await response.json();
    if (typeof data === "object" && data !== null && "fields" in data) {
      return data.fields as ContactFieldErrors;
    }
  } catch {
  }
  return {};
}

export default function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const field = event.target.name as keyof ContactFormValues;
    const { value } = event.target;

    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus((current) => (current === "submitting" ? current : "idle"));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const parsed = contactMessageSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error.issues));
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: values.website })
      });

      if (response.status === 429) {
        setStatus("tooManyRequests");
        return;
      }

      if (response.status === 400) {
        const fields = await readFieldErrors(response);
        const hasFieldErrors = Object.keys(fields).length > 0;
        setErrors(fields);
        setStatus(hasFieldErrors ? "idle" : "error");
        return;
      }

      if (!response.ok) throw new Error(`Falha ao enviar (${response.status})`);

      setValues(INITIAL_VALUES);
      setStatus("success");
    } catch (submitError) {
      console.error("Não foi possível enviar a mensagem:", submitError);
      setStatus("error");
    }
  }

  return {
    values,
    errors,
    status,
    isSubmitting: status === "submitting",
    handleChange,
    handleSubmit
  };
}
