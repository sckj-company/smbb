"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { navLink } from "@/data/links";

export default function NavLinks() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex items-center gap-5">
      {navLink.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`transition-colors ${
            isActive(link.href)
              ? "text-blue-500 font-semibold"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          {t(link.key)}
        </Link>
      ))}
    </div>
  );
}
