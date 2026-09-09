export default function MobileCheckoutIntro() {
  return (
    <header className="mb-15 flex flex-col gap-3">
      <div className="grid gap-3">
        <span className="uppercase text-sky-600 font-medium">
          Doar pelo telemóvel
        </span>
        <h1 className="text-xl font-semibold tracking-tighter sm:text-4xl md:text-[3rem]">
          Digitalizar para abrir o checkout pelo telemóvel
        </h1>
      </div>

      <p className="mt-4 text-gray-600 max-w-175">
        Aponte a câmara ao código QR para ires direto à página de checkout com
        todas as referências de pagamento prontas.
      </p>
    </header>
  );
}
