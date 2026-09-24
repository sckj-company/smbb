"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  variant?: "default" | "card";
};

export default function QuantitySelector({
  value,
  onChange,
  label = "Quantidade",
  variant = "default"
}: Props) {
  const minimum = variant === "card" ? 0 : 1;

  return (
    <div className="mt-1.5 inline-flex items-center gap-2" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(minimum, value - 1))}
        disabled={value === minimum}
        className="flex h-5.5 w-5.5 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:border-0 disabled:bg-slate-100 lg:h-5.5 lg:w-5.5 2xl:h-8 2xl:w-8"
        aria-label="Diminuir quantidade"
      >
        <Minus className="w-3 h-3 sm:h-3.5 sm:w-3.5" />
      </button>

      <span className="min-w-6 text-center text-sm font-semibold text-slate-800">
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex h-5.5 w-5.5 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 lg:h-5.5 lg:w-5.5 2xl:h-8 2xl:w-8"
        aria-label="Aumentar quantidade"
      >
        <Plus className="w-3 h-3 sm:h-3.5 sm:w-3.5" />
      </button>
    </div>
  );
}
