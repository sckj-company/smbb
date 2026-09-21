import { MailOpen } from "lucide-react";

export default function MessageEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <MailOpen aria-hidden="true" className="h-5 w-5" />
      </span>
      <p className="text-sm text-slate-500">
        Selecione uma mensagem para a ler.
      </p>
    </div>
  );
}
