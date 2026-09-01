import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Heart, ShoppingCart, Star } from "lucide-react";
import { Product, products } from "@/data/products";
import { Service, services } from "@/data/services";

const catalogItems = [...products, ...services];

function formatKz(value: number) {
  return `Kz ${value.toLocaleString("pt-AO")}`;
}

export function generateStaticParams() {
  return catalogItems.map((item) => ({ slug: item.id }));
}

export default async function CatalogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalogItems.find((entry) => entry.id === slug);

  if (!item) {
    notFound();
  }

  const isProduct = item.type === "product";
  const product = isProduct ? (item as Product) : null;
  const service = !isProduct ? (item as Service) : null;
  const Icon = item.icon;

  return (
    <main className="mx-auto mt-12 max-w-7xl  bg-white">
      <div className="grid gap-15 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl bg-[#f7f7f5] p-4 md:p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
              Bestseller
            </span>

            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm">
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-100 via-slate-50 to-white p-6">
            <div className="absolute inset-x-10 bottom-8 h-10 rounded-full bg-slate-200/80 blur-2xl" />
            <div className="relative flex min-h-[380px] items-center justify-center">
              <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-slate-50/80 blur-2xl" />

              <div className="relative flex items-center justify-center gap-3">
                <div
                  className="relative flex h-40 w-28 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-b from-slate-200 via-white to-slate-100 shadow-[inset_0_0_35px_rgba(255,255,255,0.8),0_10px_30px_rgba(15,23,42,0.08)]"
                  style={
                    isProduct ? { color: product?.accentColor } : undefined
                  }
                >
                  <div className="absolute left-3 top-3 h-6 w-3 rounded-full bg-slate-900/80 blur-[2px]" />
                  <Icon className="h-16 w-16" strokeWidth={1.3} />
                </div>

                <div
                  className="relative flex h-52 w-32 items-center justify-center rounded-xl border border-slate-200 bg-linear-to-b from-slate-200 via-white to-slate-100 shadow-[inset_0_0_35px_rgba(255,255,255,0.8),0_12px_35px_rgba(15,23,42,0.1)]"
                  style={
                    isProduct ? { color: product?.accentColor } : undefined
                  }
                >
                  <div className="absolute right-3 top-3 h-6 w-3 rounded-full bg-slate-900/80 blur-[2px]" />
                  <Icon className="h-16 w-16" strokeWidth={1.3} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={[
                  "flex h-14 w-14 items-center justify-center rounded-xl border bg-white shadow-sm transition",
                  index === 0 ? "border-slate-300" : "border-slate-200"
                ].join(" ")}
                style={isProduct ? { color: product?.accentColor } : undefined}
              >
                <Icon className="h-7 w-7" strokeWidth={1.3} />
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-xl bg-white">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              {isProduct ? product?.brand : "SMBB Care"}
            </p>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
              {isProduct ? "Produto" : "Serviço"}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.07em] text-slate-900 md:text-[2.2rem]">
            {isProduct ? product?.name : service?.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium text-slate-700">4.2</span>
            <span className="text-sm text-slate-400">12,384 reviews</span>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {item.description}
          </p>

          <div className="mt-5 flex items-end gap-3">
            <p className="text-xl font-bold tracking-[-0.06em] text-slate-900">
              {isProduct ? formatKz(product!.price) : service!.price}
            </p>
            {isProduct && (
              <span className="mb-1 text-sm text-slate-400 line-through">
                {formatKz(product!.oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-7">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Key features
            </p>
            <div className="space-y-3">
              {item.highlights.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button className="rounded-full bg-blue-500 text-white px-5 py-3 text-sm font-semibold transition hover:bg-blue-600">
              Buy Now
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Warranty
                </p>
                <p className="text-sm font-semibold text-slate-700">2 years</p>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              Voltar
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
