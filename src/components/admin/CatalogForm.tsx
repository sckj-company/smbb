"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Group = "Extintor" | "Suporte" | "Placa de Sinalização";
type FormProduct = {
  id?: string;
  name: string;
  brand: string;
  price: number | string;
  oldPrice: number | string;
  accent: string;
  accentColor: string;
  image: string;
  description: string;
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
  brand: "",
  price: "",
  oldPrice: "",
  accent: "from-slate-700 via-stone-700 to-neutral-900",
  accentColor: "#facc15",
  image: "",
  description: "",
  highlights: [""],
  groupType: "Extintor"
};
const inputClass =
  "rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500";

export default function CatalogForm({ kind, item, backHref }: Props) {
  const [form, setForm] = useState<FormProduct>(item ?? empty);
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
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || 0),
      highlights: form.highlights.filter(Boolean),
      type: kind === "Serviço" ? "service" : "product"
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
              Nome
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Marca
              <input
                className={inputClass}
                value={form.brand}
                onChange={(e) => set("brand", e.target.value)}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Preço
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
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Grupo
              <select
                className={inputClass}
                value={form.groupType}
                onChange={(e) => set("groupType", e.target.value as Group)}
              >
                <option>Extintor</option>
                <option>Suporte</option>
                <option>Placa de Sinalização</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Cor
              <input
                type="color"
                className="h-10 w-full rounded-lg border border-slate-200"
                value={form.accentColor}
                onChange={(e) => set("accentColor", e.target.value)}
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Imagem do computador
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
            Descrição
            <textarea
              className={inputClass}
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Destaques
            <input
              className={inputClass}
              value={form.highlights.join(", ")}
              onChange={(e) =>
                set(
                  "highlights",
                  e.target.value.split(",").map((value) => value.trim())
                )
              }
              placeholder="Ex.: Garantia, certificado"
            />
          </label>
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
