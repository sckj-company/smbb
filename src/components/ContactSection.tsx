"use client"

import {
  ClockFading,
  CornerUpRight,
  Headset,
  MapPin,
  Phone,
} from "lucide-react"
import { useTranslation } from "react-i18next"

export default function ContactSection() {
  const { t } = useTranslation()

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

        <form className="bg-white p-5 grid gap-8 rounded-4xl shadow-sm">
          <h2 className="font-semibold text-lg flex items-center gap-2.5">
            <Headset className="h-5 w-5" /> {t("contact.cardTitle")}
          </h2>

          <div className="grid gap-8">
            <label htmlFor="name" className="space-y-3">
              <p className="font-medium text-xs text-slate-600">
                {t("contact.nameLabel")}
              </p>
              <input
                type="text"
                name="iname"
                id="name"
                placeholder="John Doe"
                className="w-full rounded-sm py-1 px-2 text-sm placeholder:text-xs border outline-none focus:border-blue-500"
              />
            </label>
            <label htmlFor="number" className="space-y-3">
              <p className="font-medium text-xs text-slate-600">
                {t("contact.phoneLabel")}
              </p>
              <input
                type="number"
                name="inumber"
                id="number"
                placeholder="900 000 000"
                className="w-full rounded-sm py-1 px-2 text-sm placeholder:text-xs border outline-none focus:border-blue-500"
              />
            </label>
            <label htmlFor="subject" className="space-y-3">
              <p className="font-medium text-xs text-slate-600">
                {t("contact.subjectLabel")}
              </p>
              <input
                type="text"
                name="isubject"
                id="subject"
                placeholder={t("contact.subjectPlaceholder")}
                className="w-full rounded-sm py-1 px-2 text-sm placeholder:text-xs border outline-none focus:border-blue-500"
              />
            </label>
            <label htmlFor="message" className="space-y-3">
              <p className="font-medium text-xs text-slate-600">
                {t("contact.messageLabel")}
              </p>
              <textarea
                name="imessage"
                id="message"
                placeholder={t("contact.messagePlaceholder")}
                className="min-h-30 w-full rounded-sm py-1 px-2 text-sm placeholder:text-xs border outline-none focus:border-blue-500"
              />
            </label>
            <button
              type="submit"
              className="transition-colors bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-2xl"
            >
              {t("contact.submitMessage")}
            </button>
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
  )
}
