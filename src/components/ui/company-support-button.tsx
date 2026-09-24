"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { createSupportMessage, createWhatsAppLink } from "@/lib/whatsapp";

import { RiWhatsappLine } from "@remixicon/react";

export default function CompanySupportButton() {
  const { t } = useTranslation();

  return (
    <Link
      href={createWhatsAppLink(createSupportMessage())}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden fixed left-4 sm:right-6 bottom-20 sm:bottom-6 z-40 lg:flex w-fit items-center gap-1.5 rounded-2xl bg-green-500 px-2.5 py-1 text-xs text-white transition-all duration-300 hover:bg-green-600/90"
    >
      <RiWhatsappLine className="h-4 w-4" />
      {t("smbbSupport.text")}
    </Link>
  );
}
