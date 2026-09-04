"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

type CatalogFormProps = {
  kind: "Produto" | "Serviço";
  item?: {
    name: string;
    description: string;
    price: string;
    image: string;
  };
  backHref: string;
};

export default function CatalogForm({
  kind,
  item,
  backHref
}: CatalogFormProps) {
  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [price, setPrice] = useState(item?.price ?? "");
  const [image, setImage] = useState<File | null>(null);

  return (
    <main className="mx-auto max-w-3xl">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para {kind.toLocaleLowerCase()}s
      </Link>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
          Administração
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          {item
            ? `Personalizar ${kind.toLocaleLowerCase()}`
            : `Adicionar ${kind.toLocaleLowerCase()}`}
        </h1>

        <form
          className="mt-8 grid gap-5"
          encType="multipart/form-data"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Nome
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Descrição
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              rows={5}
              className="resize-y rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500"
            />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              {kind === "Produto" ? "Preço" : "Preço inicial"}
              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
                className="rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Imagem
              <input
                type="file"
                accept="image/*"
                required={!item}
                onChange={(event) => setImage(event.target.files?.[0] ?? null)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-blue-700 focus:border-blue-500"
              />
              {item?.image && !image && (
                <span className="text-xs font-normal text-slate-400">
                  Imagem atual: {item.image}
                </span>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <Save className="h-4 w-4" />
            Salvar {kind.toLocaleLowerCase()}
          </button>
        </form>
      </div>
    </main>
  );
}
