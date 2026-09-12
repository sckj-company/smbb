import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function HeroButtons() {
  const { t } = useTranslation();

  return (
    <div className="mt-12 flex items-center justify-center gap-2 md:justify-start">
      <Link
        href="/products"
        className="flex items-center gap-2 rounded-full bg-sky-500 px-4.5 py-2 sm:py-2.5 text-sm font-semibold text-white hover:bg-sky-600 transition"
      >
        {t("header.primaryBtn")} <ArrowUp className="w-4 h-4" />
      </Link>

      <Link
        href="#services"
        className="flex items-center gap-2 rounded-full bg-white px-4.5 py-2 sm:py-2.5 text-sm font-semibold text-zinc-900 border border-transparent hover:border-zinc-200 hover:bg-zinc-50 transition"
      >
        {t("header.secondaryBtn")} <ArrowDown className="w-4 h-4" />
      </Link>
    </div>
  );
}
