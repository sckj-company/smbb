"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Group = "Extintor" | "Suporte" | "Placa de Sinalização";
type FormProduct = {
  id?: string;
  name: string;
  nameZh: string;
  brand: string;
  price: number | string;
  oldPrice: number | string;
  image: string;
  description: string;
  descriptionZh: string;
  highlights: string[];
  groupType: Group;
};
type Props = {
  kind: "Produto" | "Serviço";
  item?: FormProduct;
  backHref: string;
};
const empty: FormProduct = {
  name: "",
  nameZh: "",
  brand: "SMBB",
  price: "",
  oldPrice: "",
  image: "",
  description: "",
  descriptionZh: "",
  highlights: [""],
  groupType: "Extintor"
};
const inputClass =
  "rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500";

function RequiredMark() {
  return <span className="ml-1 text-red-500" aria-hidden="true">*</span>;
}

function normalizeHighlights(highlights: string[]) {
  const values = highlights
    .flatMap((highlight) => highlight.split(","))
    .map((highlight) => highlight.trim())
    .filter(Boolean)
    .slice(0, 3);

  return values.length > 0 ? values : [""];
}

export default function CatalogForm({ kind, item, backHref }: Props) {
  const [form, setForm] = useState<FormProduct>(() => ({
    ...(item ?? empty),
    nameZh: item?.nameZh?.trim() || item?.name || empty.nameZh,
    descriptionZh:
      item?.descriptionZh?.trim() || item?.description || empty.descriptionZh,
    highlights: normalizeHighlights(item?.highlights ?? empty.highlights)
  }));
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const set = <K extends keyof FormProduct>(key: K, value: FormProduct[K]) =>
    setForm((current) => ({ ...current, [key]: value }));
  function chooseImage(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setMessage("Escolha uma imagem até 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => set("image", String(reader.result));
    reader.readAsDataURL(file);
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    if (!form.image) {
      setMessage("Adicione uma imagem do seu computador.");
      setPending(false);
      return;
    }
    const payload = {
      name: form.name,
      nameZh: form.nameZh,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || 0),
      image: form.image,
      description: form.description,
      descriptionZh: form.descriptionZh,
      highlights: kind === "Serviço" ? normalizeHighlights(form.highlights) : [],
      type: kind === "Serviço" ? "service" : "product",
      ...(kind === "Produto"
        ? { brand: form.brand, groupType: form.groupType }
        : {})
    };
    const response = await fetch(
      form.id ? `/api/products/${form.id}` : "/api/products",
      {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setMessage(result.error ?? "Não foi possível guardar o produto.");
      setPending(false);
      return;
    }
    router.push(backHref);
    router.refresh();
  }
  return (
    <main className="mx-auto max-w-3xl">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
          Catálogo real
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          {form.id
            ? `Editar ${kind.toLowerCase()}`
            : `Adicionar ${kind.toLowerCase()}`}
        </h1>
        <form className="mt-8 grid gap-5" onSubmit={submit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              <span>Título português<RequiredMark /></span>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              <span>Título chinês<RequiredMark /></span>
              <input
                className={inputClass}
                value={form.nameZh}
                onChange={(e) => set("nameZh", e.target.value)}
                required
              />
            </label>
            {kind === "Produto" && (
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                <span>Marca<RequiredMark /></span>
                <input
                  className={inputClass}
                  value={form.brand}
                  onChange={(e) => set("brand", e.target.value)}
                  required
                />
              </label>
            )}
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              <span>Preço<RequiredMark /></span>
              <input
                type="number"
                min="0"
                className={inputClass}
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Preço antigo
              <input
                type="number"
                min="0"
                className={inputClass}
                value={form.oldPrice}
                onChange={(e) => set("oldPrice", e.target.value)}
              />
            </label>
            {kind === "Produto" && (
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                <span>Grupo<RequiredMark /></span>
                <select
                  className={inputClass}
                  value={form.groupType}
                  required
                  onChange={(e) => set("groupType", e.target.value as Group)}
                >
                  <option>Extintor</option>
                  <option>Suporte</option>
                  <option>Placa de Sinalização</option>
                </select>
              </label>
            )}
          </div>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Imagem do computador<RequiredMark /></span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => chooseImage(e.target.files?.[0])}
              className="rounded-lg border border-dashed border-slate-300 p-4 text-sm"
            />
            {form.image && (
              <Image
                src={form.image}
                alt="Pré-visualização"
                width={200}
                height={200}
                className="h-40 w-40 rounded-lg object-cover"
              />
            )}
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Descrição<RequiredMark /></span>
            <textarea
              className={inputClass}
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Descrição chinesa<RequiredMark /></span>
            <textarea
              className={inputClass}
              rows={4}
              value={form.descriptionZh}
              onChange={(e) => set("descriptionZh", e.target.value)}
              required
            />
          </label>
          {kind === "Serviço" && <div className="grid gap-3 text-sm font-medium text-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>Destaques</span>
              <span className="text-xs font-normal text-slate-400">
                {form.highlights.length}/3 adicionados
              </span>
            </div>
            <div className="grid gap-2">
              {form.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    className={`${inputClass} min-w-0 flex-1`}
                    value={highlight}
                    onChange={(event) => {
                      const highlights = [...form.highlights];
                      highlights[index] = event.target.value;
                      set("highlights", highlights);
                    }}
                    placeholder={`Destaque ${index + 1}`}
                    maxLength={80}
                  />
                  {form.highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        set(
                          "highlights",
                          form.highlights.filter(
                            (_, itemIndex) => itemIndex !== index
                          )
                        )
                      }
                      className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remover destaque ${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              disabled={form.highlights.length >= 3}
              onClick={() => set("highlights", [...form.highlights, ""])}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar destaque
            </button>
          </div>}
          {message && (
            <p role="alert" className="text-sm text-red-600">
              {message}
            </p>
          )}
          <button
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 font-medium text-white disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {pending ? "A guardar..." : "Salvar"}
          </button>
        </form>
      </div>
    </main>
  );
}
