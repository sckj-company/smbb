import React from "react";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <ScrollToTop />
      <Navbar />
      {children}
    </React.Fragment>
  );
}
