"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, Package, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Logo from "../Logo";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produtos", icon: Package },
  { href: "/admin/services", label: "Serviços", icon: Wrench }
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return null;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <nav className="fixed top-0  left-1/2 -translate-x-1/2 z-10 w-full max-w-7xl bg-white py-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Logo link="/admin" />

        <div className="flex items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/admin" ? pathname === href : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${isActive ? "bg-blue-50 font-medium text-blue-500" : "text-gray-500 hover:text-blue-500"}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={logout}
            aria-label="Terminar sessão"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
