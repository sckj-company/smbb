"use client";

import { Check, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/interface/products";

function formatKz(value: number) {
  return `Kz ${value.toLocaleString("pt-AO")}`;
}
export default function CatalogDetail({ item }: { item: Product }) {
  return (
    <main className="mx-auto mt-35 max-w-7xl bg-white p-6">
      <div className="grid gap-12 md:grid-cols-2">
        <section className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <div className="relative h-95 w-full rounded-xl bg-white p-6">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-contain"
            />
          </div>
        </section>
        <aside className="py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            {item.brand}
          </p>
          <h1 className="mt-5 text-3xl font-semibold text-slate-900">
            {item.name}
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
          <p className="mt-5 text-xl font-bold text-slate-900">
            {formatKz(item.price)}
          </p>
          <div className="mt-7 space-y-3">
            {item.highlights.map((feature) => (
              <div
                key={feature}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button className="rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white">
              Comprar
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">
              <ShoppingCart className="h-4 w-4" />
              Adicionar
            </button>
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
            <Star className="h-4 w-4 text-blue-500" />
            Produto gerido pela SMBB
          </div>
        </aside>
      </div>
    </main>
  );
}
