"use client";

import { CONTACT_ERROR_DEFAULTS } from "@/lib/messageSchema";
import {
  ClockFading,
  CornerUpRight,
  Headset,
  MapPin,
  Phone
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ContactField from "./messages/ContactField";
import useContactForm, { ContactFormStatus } from "@/hooks/messages/useContactForm";

export default function ContactSection() {
  const { t } = useTranslation();
  const { values, errors, status, isSubmitting, handleChange, handleSubmit } =
    useContactForm();

  const translateError = (key?: string) =>
    key ? t(key, { defaultValue: CONTACT_ERROR_DEFAULTS[key] }) : undefined;

  const statusMessages: Partial<Record<ContactFormStatus, string>> = {
    success: t("contact.success", {
      defaultValue: "Mensagem enviada! Entraremos em contacto em breve."
    }),
    error: t("contact.error", {
      defaultValue: "Não foi possível enviar a mensagem. Tente novamente."
    }),
    tooManyRequests: t("contact.tooManyRequests", {
      defaultValue:
        "Enviou várias mensagens seguidas. Tente daqui a alguns minutos."
    })
  };
  const statusMessage = statusMessages[status];

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 sm:px-8 pt-40 pb-1.5"
    >
      <div className="relative grid sm:grid-cols-[28%_35%_auto] gap-12 lg:w-5xl 2xl:w-7xl mx-auto">
        <div>
          <div className="grid gap-4">
            <span className="text-sm text-blue-500 font-medium flex items-center gap-1.5">
              {t("contact.introTag")} <CornerUpRight className="h-4 w-4" />
            </span>
            <h1 className="text-xl font-semibold">{t("contact.introTitle")}</h1>
            <p className="text-sm text-gray-700">
              {t("contact.introDescription")}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative bg-white p-5 grid gap-8 rounded-4xl shadow-sm"
        >
          <h2 className="font-semibold text-lg flex items-center gap-2.5">
            <Headset className="h-5 w-5" /> {t("contact.cardTitle")}
          </h2>

          <div className="grid gap-8">
            <ContactField
              id="name"
              name="name"
              label={t("contact.nameLabel")}
              placeholder="John Doe"
              maxLength={80}
              value={values.name}
              error={translateError(errors.name)}
              onChange={handleChange}
            />
            <ContactField
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              label={t("contact.phoneLabel")}
              placeholder="900 000 000"
              maxLength={20}
              value={values.phone}
              error={translateError(errors.phone)}
              onChange={handleChange}
            />
            <ContactField
              id="subject"
              name="subject"
              label={t("contact.subjectLabel")}
              placeholder={t("contact.subjectPlaceholder")}
              maxLength={120}
              value={values.subject}
              error={translateError(errors.subject)}
              onChange={handleChange}
            />
            <ContactField
              id="message"
              name="message"
              multiline
              label={t("contact.messageLabel")}
              placeholder={t("contact.messagePlaceholder")}
              maxLength={2000}
              value={values.message}
              error={translateError(errors.message)}
              onChange={handleChange}
            />

            {/* Honeypot: invisível para pessoas, preenchido por bots. */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="transition-colors bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm py-2 rounded-2xl"
              >
                {isSubmitting
                  ? t("contact.sending", { defaultValue: "A enviar..." })
                  : t("contact.submitMessage")}
              </button>
              <p
                role="status"
                aria-live="polite"
                className={`text-xs ${status === "success" ? "text-green-700" : "text-red-600"}`}
              >
                {statusMessage}
              </p>
            </div>
          </div>
        </form>

        <div className="flex flex-col justify-end">
          <div className="space-y-10">
            <div className="space-y-1.5">
              <h3 className="font-semibold">{t("contact.locationTitle")}</h3>

              <p className="text-sm text-gray-700 flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {t("contact.locationDescription1")}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {t("contact.locationDescription2")}
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold">{t("contact.ContactTitle")}</h3>
              <p className="text-sm text-gray-700 flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                {t("contact.ContactDescription")}
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold flex items-center gap-2">
                {t("contact.ScheduleTitle")}
              </h3>
              <ol>
                <li className="text-sm flex items-center gap-1.5">
                  <ClockFading className="h-3.5 w-3.5 text-gray-700" />

                  <div className="flex gap-1">
                    <span className="text-gray-700">
                      {t("contact.ScheduleLabel1")}
                    </span>
                    <span className="font-semibold">
                      {t("contact.ScheduleDescription1")}
                    </span>
                  </div>
                </li>

                <li className="text-sm flex items-center gap-1.5">
                  <ClockFading className="h-3.5 w-3.5 text-gray-700" />

                  <div className="flex gap-1">
                    <span className="text-gray-700">
                      {t("contact.ScheduleLabel2")}
                    </span>
                    <span className="font-semibold">
                      {t("contact.ScheduleDescription2")}
                    </span>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
