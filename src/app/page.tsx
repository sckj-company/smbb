"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import Image from "next/image"

import { products } from "@/data/products"
import { filterProducts } from "@/data/filterProducts"

function formatKz(value: number) {
  return `Kz ${value.toLocaleString("pt-AO")}`
}

export default function Home() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen px-4 pb-12 text-slate-900 md:px-6">
      <div className="mt-12 mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="lg:text-lg xl:text-2xl font-semibold">
            {t("company.name")}
          </h1>
          <ul className="flex gap-5">
            {filterProducts.map((type, index) => (
              <button
                key={type}
                className={`text-xs ${index === 0 ? "bg-blue-50 rounded-4xl py-1 px-3 text-blue-500 font-medium" : "hover:text-blue-500 text-gray-500"}`}
              >
                {t(type)}
              </button>
            ))}
          </ul>
        </div>

        <section className="space-y-10">
          <div className="grid gap-5 sm:grid-cols-3 md:grid-cols-4">
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
                        className="xl:my-5 2xl:my-8 mx-auto"
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
    </main>
  )
}
