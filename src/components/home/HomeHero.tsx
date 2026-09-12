"use client";

import HeroButtons from "./ui/hero-buttons";
import HeroContent from "./ui/hero-content";

export default function HomeHero() {
  return (
    <header className="md:w-5xl 2xl:w-7xl mx-auto lg:-mt-55 2xl:-mt-35 relative flex min-h-screen w-full items-center justify-center overflow-hidden md:justify-start">
      <div
        className="sm:mt-45 absolute inset-x-0 bottom-0 h-[48%] bg-[url('/hero-image-mobile.png')] bg-position-[35%_bottom] bg-no-repeat md:inset-0 md:h-auto md:bg-[url('/hero-image.png')] md:bg-position-[right_center]"
        style={{
          backgroundSize: "contain"
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-[42%] text-center md:items-start md:px-0 md:pb-0 md:text-left">
        <HeroContent />
        <HeroButtons />
      </div>
    </header>
  );
}
