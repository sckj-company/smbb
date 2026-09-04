"use client";

import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import { products } from "@/data/products";

const productGroups = Array.from(
  new Set(products.map((product) => product.groupType))
);

const groupTranslationKeys = {
  Extintor: "filters.extinguishers",
  Suporte: "filters.supports",
  "Placa de Sinalização": "filters.plates"
} as const;

function formatKz(value: number) {
  return `Kz ${value.toLocaleString("pt-AO")}`;
}

export default function Home() {
  const { t } = useTranslation();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();

  const visibleProducts = products.filter((product) => {
    const matchesGroup = !selectedGroup || product.groupType === selectedGroup;
    const searchableText =
      `${product.name} ${product.brand} ${product.groupType}`.toLocaleLowerCase();
    const matchesSearch = searchableText.includes(normalizedSearchQuery);

    return matchesGroup && matchesSearch;
  });

  return (
    <main className="mt-38 min-h-screen pb-12 text-slate-900">
      <div className="md:w-5xl 2xl:w-7xl mx-auto">
        <div className="mb-10 grid gap-4">
          <h1 className="lg:text-lg xl:text-2xl font-semibold">
            {t("company.name")}
          </h1>

          <div className="flex items-center justify-between">
            <ul className="flex gap-2.5">
              {[null, ...productGroups].map((groupType) => {
                const isSelected = selectedGroup === groupType;
                const label = groupType
                  ? t(
                      groupTranslationKeys[
                        groupType as keyof typeof groupTranslationKeys
                      ]
                    )
                  : t("filters.all");

                return (
                  <button
                    key={groupType ?? "all"}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedGroup(groupType)}
                    className={`text-sm py-1 px-3 ${isSelected ? "bg-blue-50 rounded-4xl text-blue-500 font-medium" : "text-gray-500 hover:text-blue-500"}`}
                  >
                    {label}
                  </button>
                );
              })}
            </ul>

            <label className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Pesquisar produto"
              aria-label="Pesquisar produto"
              className="w-40 bg-transparent text-sm outline-none"
            />

            <Search className="h-4 w-4 text-slate-400" />
          </label>
          </div>
        </div>

        <section className="space-y-10">
          <div className="grid gap-5 sm:grid-cols-3 md:grid-cols-4">
            {visibleProducts.map((product) => {
              return (
                <article
                  key={product.id}
                  className="group relative rounded-lg border border-slate-200 bg-white p-2 transition hover:-translate-y-1 hover:shadow-[0_20px_30px_rgba(15,23,42,0.08)]"
                >
                  <Link href={`/${product.id}`} className="group">
                    <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-1">
                      <Image
                        src={product.image}
                        alt=""
                        width={150}
                        height={150}
                        className="xl:my-5 2xl:my-8 mx-auto"
                      />
                    </div>

                    <div className="space-y-3 px-2 pb-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                          {product.brand}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] uppercase text-slate-500">
                          {t("filters.safety")}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h2 className="2xl:text-lg font-bold text-slate-800">
                          {product.name}
                        </h2>
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-sm text-green-700 font-semibold tracking-tighter">
                              {formatKz(product.price)}
                            </p>
                            <p className="text-xs text-slate-400 line-through">
                              {formatKz(product.oldPrice)}
                            </p>
                          </div>

                          <div className="rounded-full p-2 bg-blue-100 text-blue-700 ring-1 ring-blue-200 transition opacity-0 group-hover:opacity-100">
                            <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
