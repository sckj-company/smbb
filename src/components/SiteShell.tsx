"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import ScrollToTop from "./ScrollToTop"
import Footer from "./Footer"
import { CartProvider } from "@/hooks/useCart"
import CompanySupportButton from "./ui/company-support-button"

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")
  const isTestStoreRoute = pathname === "/teste"
  const showPublicShell = !isAdminRoute && !isTestStoreRoute

  return (
    <CartProvider>
      <ScrollToTop />
      {showPublicShell && <Navbar />}
      {children}
      {showPublicShell && <Footer />}
      {showPublicShell && <CompanySupportButton />}
    </CartProvider>
  )
}
