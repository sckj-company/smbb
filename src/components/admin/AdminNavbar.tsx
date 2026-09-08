"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Wrench,
  X
} from "lucide-react";
import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/admin/login") {
    return null;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <nav className="fixed left-1/2 top-0 z-30 w-full max-w-7xl -translate-x-1/2 bg-white/95 px-4 py-4 backdrop-blur sm:px-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Logo link="/admin" />

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu administrativo"
          className="rounded-full p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div
          className={`${menuOpen ? "absolute left-4 right-4 top-16 flex" : "hidden"} flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg sm:static sm:flex sm:flex-row sm:items-center sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}
        >
          {links.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/admin" ? pathname === href : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
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
