import { Check } from "lucide-react";

export default function Step({ step }: { step: string }) {
  return (
    <li className="flex items-center gap-3 text-gray-600">
      <Check size={16} className="text-sky-600" />
      {step}
    </li>
  );
}
