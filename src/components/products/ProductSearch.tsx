import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  const { t } = useTranslation();

  const placeholder = t("filters.placeholder");

  return (
    <label className="flex w-full items-center gap-3 rounded-full border-y border-slate-200/80 bg-white/75 px-3 py-2 shadow-sm backdrop-blur-md lg:mt-4 lg:w-auto lg:bg-slate-50 lg:px-4 lg:shadow-none lg:backdrop-blur-none">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none lg:w-40 lg:flex-none"
      />

      <Search className="h-4 w-4 text-slate-400" />
    </label>
  );
}
