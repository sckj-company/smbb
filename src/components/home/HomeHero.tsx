"use client";

import Availability from "../Availability";

export default function HomeHero() {
  return (
    <header className="relative w-full min-h-screen flex items-center overflow-hidden bg-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-image.png')",
          backgroundSize: "contain",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat"
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent md:via-white/40" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6">
        <div className="max-w-xl text-left">
          <Availability />
          <h1 className="mt-8 text-4xl font-bold tracking-tighter sm:text-6xl md:text-[4.2rem]">
            Onde Equipes e Agentes Pensam Juntos.
          </h1>

          <p className="mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            aspernatur quas accusamus illum adipisci!
          </p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="#"
              className="rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white hover:bg-sky-600 transition"
            >
              Pedir Orçamento
            </a>
            <a
              href="#"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-zinc-900 border border-zinc-200 hover:bg-zinc-50 transition"
            >
              Saber Mais
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
