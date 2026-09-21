import {
  Archive,
  ArchiveRestore,
  ArrowLeft,
  Mail,
  MailOpen,
  MessageCircle,
  Phone
} from "lucide-react";

import { Message } from "@/interface/message";
import MessageToolbarButton from "./MessageToolbarButton";
import MessageAvatar from "./MessageAvatar";
import { buildPhoneHref, buildWhatsAppHref, formatPhone } from "@/utils/phone";
import AnimatedTrashIcon from "../orders/AnimatedTrashIcon";
import { formatTimestampDate } from "@/utils/formatDate";

type Props = {
  message: Message;
  onBack: () => void;
  onToggleRead: () => void;
  onToggleArchive: () => void;
  onDelete: () => void;
};

const ACTION_LINK_CLASS =
  "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none";

export default function MessageDetail({
  message,
  onBack,
  onToggleRead,
  onToggleArchive,
  onDelete
}: Props) {
  const fullDate = formatTimestampDate(message.createdAt);
  const whatsAppText = `Olá ${message.name}, recebemos a sua mensagem "${message.subject}" na SMBB.`;

  return (
    <article className="flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
        <MessageToolbarButton
          label="Voltar às mensagens"
          onClick={onBack}
          className="lg:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
        </MessageToolbarButton>

        <MessageAvatar name={message.name} className="h-10 w-10" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {message.name}
          </p>
          <a
            href={buildPhoneHref(message.phone)}
            className="text-xs text-slate-500 hover:text-blue-600 hover:underline"
          >
            {formatPhone(message.phone)}
          </a>
        </div>

        <time
          dateTime={message.createdAt}
          className="hidden text-xs text-slate-400 sm:block"
        >
          {fullDate}
        </time>

        <div className="flex items-center">
          <MessageToolbarButton
            label={message.read ? "Marcar como não lida" : "Marcar como lida"}
            onClick={onToggleRead}
          >
            {message.read ? (
              <Mail className="h-4 w-4" />
            ) : (
              <MailOpen className="h-4 w-4" />
            )}
          </MessageToolbarButton>
          <MessageToolbarButton
            label={message.archived ? "Desarquivar" : "Arquivar"}
            onClick={onToggleArchive}
          >
            {message.archived ? (
              <ArchiveRestore className="h-4 w-4" />
            ) : (
              <Archive className="h-4 w-4" />
            )}
          </MessageToolbarButton>
          <MessageToolbarButton
            label="Apagar mensagem"
            onClick={onDelete}
            className="hover:bg-red-50 hover:text-red-600"
          >
            <AnimatedTrashIcon />
          </MessageToolbarButton>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <h2 className="text-2xl font-bold break-words text-slate-900">
          {message.subject}
        </h2>
        <time
          dateTime={message.createdAt}
          className="mt-1 block text-xs text-slate-400 sm:hidden"
        >
          {fullDate}
        </time>
        <p className="mt-6 text-[15px] leading-relaxed break-words whitespace-pre-wrap text-slate-800">
          {message.body}
        </p>
      </div>

      <footer className="flex flex-wrap gap-2 border-t border-slate-200 px-4 py-4 sm:px-5">
        <a
          href={buildWhatsAppHref(message.phone, whatsAppText)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${ACTION_LINK_CLASS} bg-green-600 text-white hover:bg-green-700`}
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Responder no WhatsApp
        </a>
        <a
          href={buildPhoneHref(message.phone)}
          className={`${ACTION_LINK_CLASS} border border-slate-200 text-slate-700 hover:bg-slate-50`}
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          Ligar
        </a>
      </footer>
    </article>
  );
}
