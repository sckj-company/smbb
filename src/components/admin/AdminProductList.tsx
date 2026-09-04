"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit, Plus, Search } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";

export default function AdminProductList() {
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchQuery.trim().toLocaleLowerCase();
  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.brand} ${product.groupType}`
      .toLocaleLowerCase()
      .includes(query)
  );

  return (
    <main className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
            Administração
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Produtos
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 ring-1 ring-slate-50">
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Pesquisar produto"
              aria-label="Pesquisar produto"
              className="w-40 bg-transparent text-sm outline-none"
            />

            <Search className="h-4 w-4 text-slate-400" />
          </label>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            Adicionar produto
          </Link>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/${product.id}`}
            className="group rounded-lg border border-slate-200 bg-white p-2 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
              <Image
                src={product.image}
                alt=""
                width={180}
                height={180}
                className="mx-auto"
              />
            </div>
            <div className="flex items-start justify-between gap-3 px-2 py-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                  {product.groupType}
                </p>
                <h2 className="mt-1 font-semibold text-slate-800">
                  {product.name}
                </h2>
              </div>
              <Edit className="h-4 w-4 text-blue-500 opacity-70 transition group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
