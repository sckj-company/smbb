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
    <div className="inline-flex items-center gap-2" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(minimum, value - 1))}
        disabled={value === minimum}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:border-0 disabled:bg-slate-100 lg:h-5.5 lg:w-5.5 2xl:h-8 2xl:w-8"
        aria-label="Diminuir quantidade"
      >
        <Minus className="h-3.5 w-3.5 2xl:h-3.5 2xl:w-3.5" />
      </button>

      <span className="min-w-6 text-center text-sm font-semibold text-slate-800">
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 lg:h-5.5 lg:w-5.5 2xl:h-8 2xl:w-8"
        aria-label="Aumentar quantidade"
      >
        <Plus className="h-3.5 w-3.5 2xl:h-3.5 2xl:w-3.5" />
      </button>
    </div>
  );
}
