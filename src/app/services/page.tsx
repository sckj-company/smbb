"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

type Service = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ServicesPage() {
  const { data: services = [], isLoading } = useSWR<Service[]>(
    "/api/products?type=service",
    fetcher
  );
  return (
    <main className="mt-38 2xl:px-0 md:w-5xl 2xl:w-7xl mx-auto bg-white">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
          Serviços
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tighter text-slate-900">
          Soluções profissionais
        </h2>
      </div>
      {isLoading ? (
        <p className="text-sm text-slate-500">A carregar serviços...</p>
      ) : services.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
          Nenhum serviço disponível.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Link
              href={`/admin/services/${service.id}`}
              key={service.id}
              className="group rounded-lg border border-slate-200 bg-white p-2"
            >
              <img
                src={service.image}
                alt={service.name}
                className="h-48 w-full rounded-sm object-cover object-bottom"
              />
              <div className="px-5 pb-4 pt-4">
                <h3 className="mb-2 text-xl font-semibold text-blue-900">
                  {service.name}
                </h3>
                <p className="mb-4 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-sm font-medium text-slate-700">
                    {service.price} €
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-blue-700" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
