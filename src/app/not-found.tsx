"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div>
      <main className="mt-30 sm:mt-35 xl:mt-40 2xl:mt-45 2xl:px-0 md:w-5xl 2xl:w-7xl mx-auto">
        <div className="w-full text-center">
          <h1 className="font-bold text-[20rem] text-blue-500">404</h1>
          <Link href="/">
            <Button variant="link" className="text-black">
              {t("pageTitle.not-found")}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
