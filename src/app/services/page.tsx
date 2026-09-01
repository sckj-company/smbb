import Link from "next/link";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-600">
            Serviços
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tighter text-slate-900">
            Proteção e suporte técnico
          </h2>
        </div>
        <button className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100">
          Solicitar orçamento
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <article
              key={service.id}
              className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
            >
              <Link href={`/${service.id}`} className="block">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
              </Link>
              <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <span className="text-sm font-medium text-slate-700">
                  {service.price}
                </span>
                <Link
                  href={`/${service.id}`}
                  className="rounded-full bg-white p-2 text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                  aria-label={`Abrir detalhes de ${service.title}`}
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
