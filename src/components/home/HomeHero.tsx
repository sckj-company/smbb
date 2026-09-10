"use client";

import HeroButtons from "./ui/hero-buttons";
import HeroContent from "./ui/hero-content";

export default function HomeHero() {
  return (
    <header className="pt-60 pb-60 flex flex-col items-center justify-center gap-4 text-center">
      <HeroContent />
      <HeroButtons />
    </header>
  );
}
