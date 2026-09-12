"use client";

import { useTranslation } from "react-i18next";

interface ServiceItem {
  cover: string;
  title: string;
  description: string;
}

export default function MinimalStore() {
  const { t } = useTranslation();
  const store = t("minimalStore.items", {
    returnObjects: true
  }) as ServiceItem[];

  return (
    <section className="relative overflow-hidden px-6 py-40 sm:px-0">
      <div className="md:w-5xl 2xl:w-7xl mx-auto relative">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-blue-600">
            {t("minimalStore.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl text-sky-900">
            {t("minimalStore.title1")} <br />
            {t("minimalStore.title2")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600">
            {t("minimalStore.description")}
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-4 gap-4">
          {store?.map((item, index) => (
            <article
              key={index}
              style={{
                backgroundImage: `linear-gradient(to top, rgb(0, 0, 0), transparent var(--gradient-stop)), url('${item.cover}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
              className="h-6 lg:h-90 2xl:h-120 rounded-[0.5rem] relative [--gradient-stop:70%] sm:[--gradient-stop:45%]"
            >
              <div className="p-4 absolute bottom-0">
                <h1 className="text-white font-semibold">{item.title}</h1>
                <p className="text-white/85 lg:text-sm">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
