"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import { CartProvider } from "@/hooks/useCart";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <CartProvider>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </CartProvider>
  );
}
