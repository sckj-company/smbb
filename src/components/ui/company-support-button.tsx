import { RiWhatsappLine } from "@remixicon/react";
import Link from "next/link";

export default function CompanySupportButton() {
  return (
    <Link
      href="/"
      className="fixed flex items-center gap-1.5 right-10 bottom-10 rounded-2xl py-1 px-2.5 text-sm transition-colors bg-green-500 hover:bg-green-600/90 text-white"
    >
      <RiWhatsappLine className="w-4 h-4" />
      Suporte SMBB
    </Link>
  );
}
