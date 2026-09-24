"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { createSupportMessage, createWhatsAppLink } from "@/lib/whatsapp";
import { useMediaQuery } from "react-responsive";

import { RiWhatsappLine } from "@remixicon/react";

export default function CompanySupportButton() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 884 });

  return (
    <Link
      href={createWhatsAppLink(createSupportMessage())}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 bottom-20 sm:bottom-6 z-40 flex w-fit items-center gap-1.5 rounded-2xl bg-green-500 px-2.5 py-1 text-xs text-white transition-all duration-300 hover:bg-green-600/90 md:text-sm"
    >
      <RiWhatsappLine className="h-4 w-4" />
      {isMobile ? "SMBB" : t("smbbSupport.text")}
    </Link>
  );
}
