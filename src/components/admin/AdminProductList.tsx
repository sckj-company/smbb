"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import SelectGroup from "../products/SelectGroup";
import type { Product } from "@/interface/products";
import useSelectGroup from "@/hooks/useSelectGroup";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import Loader from "../ui/loader";
import QrCodeDialog from "../QrCodeDialog";

export default function AdminProductList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    selectedGroup,
    setSelectedGroup,
    visibleProducts,
    isLoading,
    error,
    mutate
  } = useSelectGroup({
    searchQuery
  });

  async function remove() {
    if (!productToDelete) return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      const response = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setDeleteError(result.error ?? "Não foi possível apagar o produto.");
        return;
      }
      await mutate();
      setProductToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="w-full pb-12 px-4 sm:px-8 2xl:px-0 md:w-5xl 2xl:w-7xl mx-auto">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
            Administração
          </p>
          <h1 className="mt-2 mb-4 text-2xl font-semibold text-slate-900">
            Produtos
          </h1>

          <SelectGroup
            language="pt"
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        </div>

        <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar produto"
              aria-label="Pesquisar produto"
              className="w-40 bg-transparent text-sm outline-none"
            />
            <Search className="h-4 w-4 text-slate-400" />
          </label>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden md:block">Adicionar produto</span>
          </Link>
        </div>
      </div>

      <section className="w-full space-y-10">
        {isLoading && <Loader />}
        {error && (
          <p className="text-sm text-red-600">
            Não foi possível carregar os produtos.
          </p>
        )}
        {!isLoading && !error && visibleProducts.length === 0 && (
          <p className="text-sm text-slate-500">Nenhum produto encontrado.</p>
        )}

        <div className="mt-10 grid w-full gap-3 sm:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="group relative rounded-lg border border-slate-200 bg-white p-2 transition hover:-translate-y-1 hover:shadow-[0_20px_30px_rgba(15,23,42,0.08)]"
            >
              <Link href={`/admin/products/${product.id}`} className="group">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={180}
                    className="mx-auto h-37.5 w-37.5 object-contain xl:my-5 2xl:my-8"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 px-2 py-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      {product.groupType === "Placa de Sinalização"
                        ? "Sinalização"
                        : product.groupType}
                    </p>
                    <h2 className="mt-1 font-semibold text-slate-800 line-clamp-1">
                      {product.name}
                    </h2>
                  </div>
                  <Edit className="h-4 w-4 text-blue-500" />
                </div>
              </Link>
              <div className="flex items-center justify-between px-2 pb-2">
                <button
                  type="button"
                  onClick={() => setProductToDelete(product)}
                  className="inline-flex items-center gap-2 text-xs text-red-600"
                >
                  <Trash2 size={14} />
                  Apagar
                </button>
                <QrCodeDialog
                  href={`/${product.id}`}
                  label={`Mostrar QR Code de ${product.name}`}
                  className="border border-slate-200 p-1.5"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <AlertDialog
        open={productToDelete !== null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setProductToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apagar produto?</AlertDialogTitle>
            <AlertDialogDescription>
              O produto {productToDelete?.name} será removido permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel render={<Button variant="outline" />}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              render={<Button variant="destructive" />}
              onClick={remove}
              disabled={isDeleting}
            >
              {isDeleting ? "A apagar..." : "Apagar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
