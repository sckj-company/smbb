"use client";

import { useTranslation } from "react-i18next";

interface StepItem {
  command: string;
  label: string;
  description: string;
}

export default function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = t("howItWorks.items", { returnObjects: true }) as StepItem[];

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16">
      <div className="md:w-5xl 2xl:w-7xl mx-auto relative">
        <span className="font-mono text-xs tracking-widest text-blue-600">
          {t("howItWorks.eyebrow")}
        </span>

        <h2 className="mt-3 text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
          {t("howItWorks.title1")}
          <br />
          {t("howItWorks.title2")}
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600">
          {t("howItWorks.description")}
        </p>

        <div className="mt-14 grid grid-cols-1 divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
          {steps?.map((item, index) => (
            <div
              key={item.command}
              className="group relative flex flex-col gap-3 border-neutral-200 p-8 transition-colors hover:bg-blue-50/50 sm:border-t sm:sm:nth-[-n+3]:border-t-0 lg:nth-[-n+3]:border-t-0"
            >
              <span className="absolute right-6 top-6 font-mono text-xs text-neutral-300">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="mt-2 text-base font-semibold text-neutral-900">
                {item.command}
              </p>

              <p className="font-mono text-xs tracking-wider text-blue-600">
                {item.label}
              </p>

              <p className="text-sm leading-relaxed text-neutral-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
