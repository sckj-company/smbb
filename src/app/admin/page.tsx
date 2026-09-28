import Link from "next/link";
import { connection } from "next/server";
import { ArrowDown, ArrowUpRight, Mail, Package, Wrench } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCatalogCounts } from "@/lib/data/products";
import OrdersTable from "@/components/admin/OrdersTable";

async function countSafely(
  label: string,
  query: () => Promise<number>
): Promise<number> {
  try {
    return await query();
  } catch (error) {
    console.error(`Não foi possível carregar a contagem de ${label}:`, error);
    return 0;
  }
}

export default async function AdminPage() {
  await connection();

  const [[products, services], orders, unreadMessages] = await Promise.all([
    (async () => {
      try {
        return await getCatalogCounts();
      } catch (error) {
        console.error(
          "Não foi possível carregar a contagem do catálogo:",
          error
        );
        return [0, 0] as const;
      }
    })(),
    countSafely("pedidos", () => prisma.order.count()),
    countSafely("mensagens", () =>
      prisma.message.count({ where: { read: false, archived: false } })
    )
  ]);

  const sections = [
    {
      href: "#orders",
      title: "Pedidos (订单)",
      count:
        orders === 0
          ? "Sem solicitações (没有要求)"
          : orders === 1
            ? `${orders} solicitação (要求)`
            : `${orders} solicitações (要求)`,
      icon: Package,
      arrow: ArrowDown
    },
    {
      href: "/admin/messages",
      title: "Mensagens (留言)",
      count:
        unreadMessages === 0 ? "Sem Mensagens (没有消息)" : "por ler (阅读)",
      icon: Mail,
      arrow: ArrowUpRight
    },
    {
      href: "/admin/products",
      title: "Produtos (产品)",
      count:
        products === 0
          ? "Sem Produtos (没有产品)"
          : products === 1
            ? `${products} produto (产品)`
            : `${products} produtos (产品)`,
      icon: Package,
      arrow: ArrowUpRight
    },
    {
      href: "/admin/services",
      title: "Serviços (服务请求)",
      count:
        services === 0
          ? "Sem serviços (无服务)"
          : services === 1
            ? `${services} serviço (服务)`
            : `${services} serviços (服务)`,
      icon: Wrench,
      arrow: ArrowUpRight
    }
  ];

  return (
    <main className="px-4 pb-12 sm:px-8">
      <div className="mx-auto w-full lg:w-5xl 2xl:w-7xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
          Administração (行政)
        </p>
        <h1 className="mt-2 mb-4 text-2xl font-semibold text-slate-900">
          Dashboard (仪表板)
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Gerencie o catálogo da SMBB. <br />
          (管理 SMBB 目录。)
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(({ href, title, count, icon: Icon, arrow: Arrow }) => (
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
                <Arrow className="h-5 w-5 text-blue-500" />
              </div>
            </Link>
          ))}
        </div>

        <div id="orders">
          <OrdersTable />
        </div>
      </div>
    </main>
  );
}
