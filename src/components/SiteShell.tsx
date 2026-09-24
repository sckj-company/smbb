"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import { CartProvider } from "@/hooks/useCart";
import CompanySupportButton from "./ui/company-support-button";
import { Toaster } from "./ui/toaster";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const showPublicShell = !isAdminRoute;

  return (
    <CartProvider>
      <ScrollToTop />
      {showPublicShell && <Navbar />}
      {children}
      {showPublicShell && <Footer />}
      {showPublicShell && <CompanySupportButton />}
      <Toaster />
    </CartProvider>
  );
}
