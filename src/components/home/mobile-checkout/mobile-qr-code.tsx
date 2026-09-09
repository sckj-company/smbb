import Image from "next/image";

export default function MobileQrCode() {
  return (
    <div className="bg-white border border-sky-900/20 grid gap-8 justify-between pt-4 px-4">
      <div className="border border-sky-900/10 p-4">
        <Image
          src="/qr-code.svg"
          alt="QR Code for checkout"
          width={500}
          height={500}
        />
      </div>

      <p className="text-center text-xs font-medium text-gray-500">
        Funciona com qualquer câmara
      </p>
    </div>
  );
}
