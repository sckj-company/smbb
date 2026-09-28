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
          Dashboard (仪表板)
        </Link>
        <h1 className="mt-4 mb-1 text-2xl font-semibold text-slate-900">
          Mensagens (消息)
        </h1>
        <p className="mb-12 text-sm text-slate-500 leading-">
          Mensagens enviadas pelo formulário de contacto da loja. <br />
          (通过商店联系表格发送的消息)
        </p>

        <MessagesInbox />
      </div>
    </main>
  );
}
