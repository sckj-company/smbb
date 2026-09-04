"use client";

import Link from "next/link";
import Logo from "./Logo";
import CTA from "./CTA";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <section>
      <CTA />

      <footer className=" md:w-5xl 2xl:w-7xl mx-auto mt-20 grid gap-30">
        <article className="grid md:flex justify-between">
          <div className="grid gap-5 w-120">
            <Logo />
            <p className="text-gray-600">{t("footer.description")}</p>
          </div>
          
          <div className="flex gap-20">
            <div className="space-y-3">
              <h2 className="font-semibold text-blue-950">Explore</h2>
              <ul className="grid gap-1.5">
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:underline hover:text-blue-900"
                >
                  Home
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:underline hover:text-blue-900"
                >
                  Produtos
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:underline hover:text-blue-900"
                >
                  Serviços
                </Link>
              </ul>
            </div>
            <div className="space-y-3">
              <h2 className="font-semibold text-blue-950">Serviços</h2>
              <ul className="grid gap-1.5">
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:underline hover:text-blue-900"
                >
                  Home
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:underline hover:text-blue-900"
                >
                  Produtos
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:underline hover:text-blue-900"
                >
                  Serviços
                </Link>
              </ul>
            </div>
            <div className="space-y-3">
              <h2 className="font-semibold text-blue-950">Siga-nos</h2>
              <ul className="grid gap-1.5">
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:underline hover:text-blue-900"
                >
                  Home
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:underline hover:text-blue-900"
                >
                  Produtos
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:underline hover:text-blue-900"
                >
                  Serviços
                </Link>
              </ul>
            </div>
          </div>
        </article>
        <p className="text-gray-600">
          © {currentYear} {t("footer.copyright")}
        </p>
      </footer>
    </section>
  );
}
