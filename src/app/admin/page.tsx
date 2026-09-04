import Link from "next/link";
import { ArrowRight, Package, Wrench } from "lucide-react";

const sections = [
  {
    href: "/admin/products",
    title: "Produtos",
    count: "6 itens",
    icon: Package
  },
  { href: "/admin/services", title: "Serviços", count: "3 itens", icon: Wrench }
];

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
        Administração
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-500">
        Gerencie o catálogo da SMBB.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {sections.map(({ href, title, count, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Icon className="h-6 w-6 text-blue-500" />
            <div className="mt-8 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{count}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-500 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
