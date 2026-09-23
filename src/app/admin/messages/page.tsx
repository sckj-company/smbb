import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MessagesInbox from "@/components/messages/MessagesInbox";

export default function AdminMessagesPage() {
  return (
    <main className="px-4 pb-12 sm:px-8">
      <div className="mx-auto w-full lg:w-5xl 2xl:w-7xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Dashboard
        </Link>
        <h1 className="mt-4 mb-1 text-2xl font-semibold text-slate-900">
          Mensagens
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          Mensagens enviadas pelo formulário de contacto da loja.
        </p>
        
        <MessagesInbox />
      </div>
    </main>
  );
}
