"use client";

import { useTranslation } from "react-i18next";

export default function MinimalStore() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden px-6 py-40 sm:px-0">
      <div className="md:w-5xl 2xl:w-7xl mx-auto relative">
        <div>
          <span className="font-mono text-xs tracking-widest text-blue-600">
            {t("howItWorks.eyebrow")}
          </span>
          <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl text-sky-900">
            Quatro soluções. <br />
            Uma só empresa.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600">
            Da compra de um extintor à manutenção completa do teu sistema de
            segurança contra incêndios — a SMBB trata de tudo, do primeiro
            contacto até à entrega ou intervenção no local.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-4 gap-4">
          <article
            style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0, 0, 0), transparent 45%), url('/extinguisher.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
            className="h-120 rounded-[0.5rem] relative"
          >
            <div className="p-4 absolute bottom-0">
              <h1 className="text-white font-semibold">Extintores</h1>
              <p className="text-white/80">
                Extintores novos e certificados para todo o tipo de espaço.
              </p>
            </div>
          </article>
          <article
            style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0, 0, 0), transparent 45%), url('/plates.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
            className="h-120 rounded-[0.5rem] relative"
          >
            <div className="p-4 absolute bottom-0">
              <h1 className="text-white font-semibold">
                Placas de sinalização
              </h1>
              <p className="text-white/80">
                Sinalética de emergência e segurança, conforme às normas.
              </p>
            </div>
          </article>
          <article
            style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0, 0, 0), transparent 45%), url('/equipments.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
            className="h-120 rounded-[0.5rem] relative"
          >
            <div className="p-4 absolute bottom-0">
              <h1 className="text-white font-semibold">Acessórios</h1>
              <p className="text-white/80">
                Acessórios que completam a tua proteção contra incêndios.
              </p>
            </div>
          </article>
          <article
            style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0, 0, 0), transparent 45%), url('/service-image.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
            className="h-120 rounded-[0.5rem] relative"
          >
            <div className="p-4 absolute bottom-0">
              <h1 className="text-white font-semibold">Manutenção</h1>
              <p className="text-white/80">
                Inspeção, recarga e manutenção dos teus extintores.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
