"use client"

import { useTranslation } from "react-i18next"
import Logo from "./Logo"
import Image from "next/image"
import Link from "next/link"

export default function CTA() {
  const { t } = useTranslation()

  return (
    <section className="mx-4 sm:mx-8 mt-55 -mb-30 lg:w-5xl 2xl:w-7xl lg:mx-auto bg-blue-500 rounded-3xl p-8 sm:p-12 2xl:p-20 shadow-[0_20px_30px_rgba(15,23,42,0.08)] flex sm:flex sm:items-center sm:justify-between">
      <div className="grid sm:max-w-[40%]">
        <Logo className="mb-8" variant="light" />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-white font-semibold lg:text-2xl 2xl:text-[1.8rem] mb-5">
            {t("cta.title")}
          </h1>
          <p className="text-white/80 xl:text-sm mb-8.5">
            {t("cta.description")}
          </p>
          <Link
            href="#contact"
            className="bg-white transition-colors hover:shadow-[0_20px_30px_rgba(15,23,42,0.08)] hover:bg-white/90 w-fit mx-auto rounded-4xl text-sm px-4 py-2"
          >
            {t("cta.button")}
          </Link>
        </div>
      </div>

      <Image
        src="/smbb-qrcode.png"
        alt="SMBB QR Code"
        width="300"
        height="300"
        className="hidden sm:block rounded-md"
      />
    </section>
  )
}
