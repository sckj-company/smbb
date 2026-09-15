import Link from "next/link";
import { ArrowRight, Package, Wrench } from "lucide-react";
import { prisma } from "@/lib/prisma";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function AdminPage() {
  const products = await prisma.product.count({ where: { type: "product" } });
  const services = await prisma.product.count({ where: { type: "service" } });
  let orders = 0;

  try {
    orders = await prisma.order.count();
  } catch (error) {
    console.error("Não foi possível carregar a contagem de pedidos:", error);
  }

  const sections = [
    {
      href: "/admin/products",
      title: "Produtos",
      count: `${products} itens`,
      icon: Package
    },
    {
      href: "/admin/services",
      title: "Serviços",
      count: `${services} itens`,
      icon: Wrench
    },
    {
      href: "#orders",
      title: "Pedidos",
      count: `${orders} solicitações`,
      icon: Package
    }
  ];
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-8 2xl:px-0">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
        Administração
      </p>
      <h1 className="mt-2 mb-4 text-2xl font-semibold text-slate-900">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Gerencie o catálogo da SMBB.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
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
              <ArrowRight className="h-5 w-5 text-blue-500" />
            </div>
          </Link>
        ))}
      </div>
      <div id="orders">
        <OrdersTable />
      </div>
    </main>
  );
}
