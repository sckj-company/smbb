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
    <div className="flex items-center gap-2">
      {navLink.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-1.5 text-sm xl:text-base rounded-4xl py-1 px-3 transition-colors ${
            isActive(link.href)
              ? "bg-blue-50 rounded-4xl py-1 px-3 text-blue-500 font-medium"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          <link.icon size={16} />
          {t(link.key)}
        </Link>
      ))}
    </div>
  );
}
