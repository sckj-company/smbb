"use client";

import { RiWhatsappLine } from "@remixicon/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function CompanySupportButton() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const hero = document.getElementById("home-hero");

      if (!hero) {
        setIsVisible(true);
        return;
      }

      setIsVisible(hero.getBoundingClientRect().bottom <= 0);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <Link
      href="/"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed right-10 bottom-10 flex items-center gap-1.5 rounded-2xl bg-green-500 px-2.5 py-1 text-sm text-white transition-all duration-300 hover:bg-green-600/90 ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <RiWhatsappLine className="w-4 h-4" />
      {t("smbbSupport.text")}
    </Link>
  );
}
