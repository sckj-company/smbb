"use client";

import Link from "next/link";
import { ArrowRight, Flame, Star } from "lucide-react";
import { products } from "@/data/products";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const filterChips = [
  "Apple",
  "LG",
  "KitchenAid",
  "SMEG",
  "Samsung",
  "Sony",
  "Remez"
];

function formatKz(value: number) {
  return `Kz ${value.toLocaleString("pt-AO")}`;
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen px-4 pb-12 text-slate-900 md:px-6">
      <div className="mt-12 mx-auto max-w-7xl">
        <h1 className="mb-8 lg:text-lg xl:text-2xl font-semibold">
          {t("company.name")}
        </h1>

        <div className="relative grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="sticky top-10 h-fit grid gap-8 rounded-lg border border-slate-200 p-5">
            <div>
              <p className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500">
                {t("filters.reset")}
              </p>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    "Apple",
                    "SMEG",
                    "Home Appliances",
                    "Kitchen Appliances"
                  ].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600"
                    >
                      {label === "Home Appliances"
                        ? t("filters.homeAppliances")
                        : label === "Kitchen Appliances"
                          ? t("filters.kitchenAppliances")
                          : label}
                      <span className="text-slate-400">×</span>
                    </span>
                  ))}
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
                    <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                      {t("filters.brand")}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    {filterChips.map((brand) => (
                      <FieldGroup key={brand} className="mx-auto w-56">
                        <Field orientation="horizontal">
                          <Checkbox id={brand} name="terms-checkbox-basic" />
                          <FieldLabel htmlFor={brand}>{brand}</FieldLabel>
                        </Field>
                      </FieldGroup>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="space-y-10">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => {
                return (
                  <article
                    key={product.id}
                    className="group relative rounded-lg border border-slate-200 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_30px_rgba(15,23,42,0.08)]"
                  >
                    <Link href={`/${product.id}`} className="block">
                      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-1">
                        <Image
                          src={product.image}
                          alt=""
                          width={150}
                          height={150}
                          className="my-8 mx-auto"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                            {product.brand}
                          </span>
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-500">
                            {t("filters.safety")}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h2 className="text-lg font-bold text-slate-800">
                            {product.name}
                          </h2>
                          <div className="flex items-end justify-between gap-3">
                            <div>
                              <p className="text-md text-green-700 font-semibold tracking-tighter">
                                {formatKz(product.price)}
                              </p>
                              <p className="text-xs text-slate-400 line-through">
                                {formatKz(product.oldPrice)}
                              </p>
                            </div>

                            <ArrowRight className="h-4 w-4" />
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
      </div>
    </main>
  );
}
