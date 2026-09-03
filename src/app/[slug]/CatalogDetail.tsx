"use client"

import { Check, ShoppingCart, Star } from "lucide-react"
import { Product, products } from "@/data/products"
import { Service, services } from "@/data/services"
import { useTranslation } from "react-i18next"
import Image from "next/image"

const catalogItems = [...products, ...services]

function formatKz(value: number) {
  return `Kz ${value.toLocaleString("pt-AO")}`
}

export default function CatalogDetail({ slug }: { slug: string }) {
  const { t } = useTranslation()
  const item = catalogItems.find((entry) => entry.id === slug)

  if (!item) return null

  const isProduct = item.type === "product"
  const product = isProduct ? (item as Product) : null
  const service = !isProduct ? (item as Service) : null
  const productTranslationId = product?.id
    .replace("extintore-abc", "extintor-abc")
    .replace("deteector-fumaca", "detector-fumaca")
    .replace("sprinkleres", "sprinklers")
  const translationKey = service
    ? `servicesPage.items.${service.id}`
    : `products.${productTranslationId}`
  const title = t(`${translationKey}.title`, { defaultValue: product?.name })
  const description = service
    ? t(`${translationKey}.description`)
    : t(`${translationKey}.description`, {
        defaultValue: product?.description,
      })
  const highlights = service
    ? (t(`${translationKey}.highlights`, { returnObjects: true }) as string[])
    : (t(`${translationKey}.highlights`, {
        returnObjects: true,
        defaultValue: product?.highlights,
      }) as string[])

  return (
    <main className="mx-auto mt-12 md:max-full md:p-6 2xl:w-7xl bg-white">
      <div className="sm:relative grid md:gap-12 2xl:gap-15 md:grid-cols-[1fr_1fr]">
        <section className="sm:sticky top-10 h-fit rounded-xl border border-blue-200 bg-blue-50 p-4 md:p-5">
          <div className="mb-5">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
              {t("detail.bestseller")}
            </span>
          </div>

          <div
            className={`relative overflow-hidden rounded-xl border border-slate-200 bg-linear-to-b from-slate-100 ${isProduct ? "p-6" : "p-2"} via-slate-50 to-white`}
          >
            <div className="absolute inset-x-10 bottom-8 h-10 rounded-full bg-slate-200/80 blur-2xl" />
            <div className="relative h-95 w-full">
              <div className="rounded-full border border-slate-200 bg-slate-50/80 blur-2xl" />
              <div className="relative h-full w-full">
                {isProduct ? (
                  <Image
                    src={product?.image ?? "/product.png"}
                    alt=""
                    width={200}
                    height={200}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Image
                    src={service?.image ?? "/service.jpg"}
                    alt=""
                    fill
                    className="rounded-lg h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-xl py-4 md:py-5">
          <div className="flex items-center justify-between gap-3">
            <p className="border-b pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              {isProduct ? product?.brand : "SMBB Care"}
            </p>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
              {isProduct ? t("detail.product") : t("detail.service")}
            </span>
          </div>

          <h1 className="mt-5 md:text-2xl  2xl:text-3xl font-semibold tracking-[-0.07em] text-slate-900">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
          <div className="mt-5 flex items-end gap-3">
            <p className="xl:text-lg 2xl:text-xl font-bold tracking-[-0.06em] text-slate-900">
              {isProduct ? formatKz(product!.price) : service!.price}
            </p>
            {isProduct && (
              <span className="mb-1 md:text-xs 2xl:text-sm text-slate-400 line-through">
                {formatKz(product!.oldPrice)}
              </span>
            )}
          </div>
          <div className="mt-7">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {t("detail.features")}
            </p>
            <div className="space-y-3">
              {highlights?.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-slate-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-slate-700 shadow-sm">
                  <Star className="h-4 w-4 fill-white stroke-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    {t("detail.warranty")}
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {t("detail.warrantyValue")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button className="rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
              {t("detail.buyNow")}
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <ShoppingCart className="h-4 w-4" />
              {t("detail.addToCart")}
            </button>
          </div>
        </aside>
      </div>
    </main>
  )
}
