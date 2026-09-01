"use client"

import Link from "next/link"
import { ArrowRight, Flame, Heart, Star } from "lucide-react"
import { products } from "@/data/products"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "react-i18next"

const filterChips = [
  "Apple",
  "LG",
  "KitchenAid",
  "SMEG",
  "Samsung",
  "Sony",
  "Remez",
]

function formatKz(value: number) {
  return `Kz ${value.toLocaleString("pt-AO")}`
}

function ProductVisual({
  Icon,
  accent,
  accentColor,
}: {
  Icon: typeof Flame
  accent: string
  accentColor: string
}) {
  return (
    <div
      className={`relative flex h-56 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br ${accent}`}
    >
      <div className="absolute inset-x-6 bottom-3 h-8 rounded-full bg-black/25 blur-xl" />
      <div
        className="relative flex h-24 w-24 items-center justify-center rounded-[26%] border border-white/10 bg-white/5 shadow-[inset_0_0_25px_rgba(255,255,255,0.1)]"
        style={{ color: accentColor }}
      >
        <Icon className="h-12 w-12" strokeWidth={1.4} />
      </div>
    </div>
  )
}

export default function Home() {
  const { t } = useTranslation()
  return (
    <main className="min-h-screen px-4 pb-12 pt-4 text-slate-900 md:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="my-8 lg:text-lg xl:text-2xl font-semibold">{t("company.name")}</h1>

        <div className="relative grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="sticky top-10 h-fit grid gap-8 rounded-lg border border-slate-200 p-5">
            <div>
              <p className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500">
                Reset filters
              </p>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    "Apple",
                    "SMEG",
                    "Home Appliances",
                    "Kitchen Appliances",
                  ].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600"
                    >
                      {label}
                      <span className="text-slate-400">×</span>
                    </span>
                  ))}
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
                    <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                      Brand
                    </p>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    {filterChips.map((brand) => (
                      <FieldGroup key={brand} className="mx-auto w-56">
                        <Field orientation="horizontal">
                          <Checkbox
                            id={brand}
                            name="terms-checkbox-basic"
                            defaultChecked={
                              brand === "Apple" ||
                              brand === "SMEG" ||
                              brand === "Remez"
                            }
                          />
                          <FieldLabel htmlFor="terms-checkbox-basic">
                            {brand}
                          </FieldLabel>
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
                const Icon = product.icon

                return (
                  <article
                    key={product.id}
                    className="group relative rounded-lg border border-slate-200 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_30px_rgba(15,23,42,0.08)]"
                  >
                    <button
                      className="absolute right-4 top-4 z-10 rounded-full border border-slate-200 bg-white/90 p-2 text-slate-500 transition hover:bg-slate-100"
                      aria-label={`Guardar ${product.name}`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>

                    <Link href={`/${product.id}`} className="block">
                      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-1">
                        <ProductVisual
                          Icon={Icon}
                          accent={product.accent}
                          accentColor={product.accentColor}
                        />
                      </div>

                      <div className="mb-4 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-900">
                          {product.tag}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="text-xs font-medium text-slate-700">
                            4.8
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                            {product.brand}
                          </span>
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-500">
                            Safety
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
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
