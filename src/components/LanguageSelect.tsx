import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { languages, type Language } from "@/i18n/languages";
import { Globe } from "lucide-react";

type LanguageSelectProps = {
  value: Language;
  onChange: (value: string | null) => void;
  label: string;
  placeholder: string;
};

export default function LanguageSelect({
  value,
  onChange,
  label,
  placeholder
}: LanguageSelectProps) {
  const renderSelectedValue = (selectedValue: string | null) => {
    if (!selectedValue) return placeholder;
    return languages[selectedValue as Language] ?? selectedValue;
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <Globe strokeWidth={1.7} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
