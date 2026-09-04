"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <React.Fragment>
      <ScrollToTop />
      {!isAdminRoute && <Navbar  />}
      {children}
      {!isAdminRoute && <Footer />}
    </React.Fragment>
  );
}
