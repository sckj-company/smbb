"use client";

import { Download, QrCode } from "lucide-react";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Props = {
  href?: string;
  title?: string;
  label?: string;
  className?: string;
};

export default function QrCodeDialog({
  href,
  title = "qrModal.title",
  label = "qrModal.title",
  className
}: Props) {
  const { t } = useTranslation();
  const [pageUrl, setPageUrl] = useState("");

  function openQrCode(open: boolean) {
    if (open) {
      setPageUrl(
        new URL(
          href ?? window.location.pathname,
          window.location.origin
        ).toString()
      );
    }
  }

  function downloadQrCode() {
    const canvas = document.querySelector<HTMLCanvasElement>(
      "[data-qr-code] canvas"
    );
    if (!canvas || !pageUrl) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "smbb-qr-code.png";
    link.click();
  }

  return (
    <Dialog onOpenChange={openQrCode}>
      <DialogTrigger
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center rounded-full p-2 text-slate-600 border border-transparent hover:bg-slate-100 hover",
          className
        )}
      >
        <QrCode className="h-4 w-4" />
      </DialogTrigger>
      
      <DialogContent className="max-w-sm p-6">
        <DialogTitle>{t(title)}</DialogTitle>
        <DialogDescription className="mt-1">
          {t("qrModal.description")}
        </DialogDescription>

        <div className="mt-6 flex flex-col items-center gap-5" data-qr-code>
          {pageUrl && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <QRCodeCanvas
                value={pageUrl}
                size={220}
                level="H"
                includeMargin
              />
            </div>
          )}
          <p className="max-w-full break-all text-center text-xs text-slate-500">
            {pageUrl}
          </p>
          <button
            type="button"
            onClick={downloadQrCode}
            className="inline-flex items-center gap-2 rounded-full transition-colors bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
          >
            <Download className="h-4 w-4" />
            {t("qrModal.download")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
