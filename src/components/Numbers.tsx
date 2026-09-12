"use client";

import { useTranslation } from "react-i18next";

interface NumberItem {
  number: string;
  label: string;
  description: string;
}

const foundedAt = new Date("2024-05-31T00:00:00Z");

function getYearsInBusiness() {
  const today = new Date();
  const years = today.getUTCFullYear() - foundedAt.getUTCFullYear();
  const anniversaryNotReached =
    today.getUTCMonth() < foundedAt.getUTCMonth() ||
    (today.getUTCMonth() === foundedAt.getUTCMonth() &&
      today.getUTCDate() < foundedAt.getUTCDate());

  return anniversaryNotReached ? years - 1 : years;
}

export default function Numbers() {
  const { t } = useTranslation();
  const yearsInBusiness = getYearsInBusiness();

  const numbers = t("numbers.items", {
    returnObjects: true
  }) as NumberItem[];

  return (
    <section className="border-y border-blue-200 bg-sky-50 py-8 lg:py-10 px-4 sm:px-0">
      <div className="md:w-5xl 2xl:w-7xl mx-auto grid grid-cols-2 gap-y-8 lg:flex lg:justify-between lg:gap-10">
        {numbers?.map((item, index) => (
          <div key={index} className="sm:space-y-4 text-center">
            <h1 className="text-[1.5rem] sm:text-4xl font-bold text-sky-900">
              {item.number ? item.number : yearsInBusiness}
              <span className="text-blue-400 animate-pulse">{item.label}</span>
            </h1>
            <p className="text-sm sm:text-base text-sky-900/70">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
