"use client"

import HeroButtons from "./ui/hero-buttons"
import HeroContent from "./ui/hero-content"

export default function HomeHero() {
  return (
    <header className="lg:w-5xl 2xl:w-7xl mx-auto lg:-mt-55 2xl:-mt-35 relative flex min-h-screen w-full items-center justify-center overflow-hidden lg:justify-start">
      <div
        className="lg:mt-55 absolute inset-x-0 bottom-0 h-[48%] sm:h-[65%] lg:h-auto bg-[url('/hero-image-mobile.webp')] bg-position-[35%_bottom] bg-no-repeat lg:inset-0 lg:bg-[url('/hero-image.webp')] lg:bg-position-[right_center]"
        style={{
          backgroundSize: "contain",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-[42%] text-center lg:items-start lg:px-0 lg:pb-0 lg:text-left">
        <HeroContent />
        <HeroButtons />
      </div>
    </header>
  )
}
