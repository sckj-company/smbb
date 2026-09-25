"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

import ClientOrdersTable from "@/components/orders/ClientOrdersTable";
import MobileStoreHeader from "@/components/products/MobileStoreHeader";

export default function OrdersPage() {
  const { t } = useTranslation();

  const [phone, setPhone] = useState("");
  const [searchPhone, setSearchPhone] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedPhone = phone.replace(/\D/g, "");

    if (!/^9\d{8}$/.test(normalizedPhone)) {
      setSearchPhone(null);
      return;
    }

    setSearchPhone(normalizedPhone);
  };

  return (
    <>
      <MobileStoreHeader />

      <main className="min-h-screen mt-8 sm:mt-35 xl:mt-40 2xl:mt-45 w-full pb-12 px-4 sm:px-8 lg:px-0 md:w-5xl 2xl:w-7xl mx-auto">
        <div className="mb-15 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
              SMBB
            </p>

            <div className="space-y-2">
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                {t("pageTitle.orders")}
              </h1>
              <p className="text-gray-500 text-sm">{t("orders.description")}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-3 rounded-full border-y border-slate-200/80 bg-white/75 pl-4 pr-1.5 py-1 shadow-sm backdrop-blur-md lg:mt-4 lg:w-auto lg:bg-slate-50 lg:pl-4 lg:pr-1.5 lg:shadow-none lg:backdrop-blur-none"
          >
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="923456789"
              aria-label="Pesquisar por telefone"
              inputMode="tel"
              maxLength={9}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none lg:w-40 lg:flex-none"
            />

            <button
              type="submit"
              aria-label="Pesquisar pedidos"
              className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        <ClientOrdersTable searchPhone={searchPhone} />
      </main>
    </>
  );
}
