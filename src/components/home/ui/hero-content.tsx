import React from "react";

export default function HeroContent() {
  return (
    <React.Fragment>
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-xl font-semibold leading-tight tracking-tighter sm:text-7xl md:text-[5.3rem]">
          Onde equipes e agentes <br />
        </h1>
        <h1 className="flex items-center gap-4 text-xl font-semibold leading-tight tracking-tighter sm:text-7xl md:text-[5.3rem]">
          <span className="inline-flex items-center gap-4 w-fit font-normal sm:text-[4rem] dark:text-sky-100 bg-sky-100 dark:bg-sky-950 rounded-full pb-1.5 px-10">
            <span className="inline-flex mt-1 bg-sky-500  dark:bg-sky-300 w-8 h-8 rounded-full animate-pulse" />
            Pensam
          </span>{" "}
          Juntos.
        </h1>
      </div>

      <p className="mt-4 text-lg dark:text-zinc-400 max-w-175">
        Projeto independente, financiado pela comunidade.
      </p>
    </React.Fragment>
  );
}
