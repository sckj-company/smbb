const foundedAt = new Date("2024-05-31T00:00:00Z");

function getYearsInBusiness() {
  const today = new Date();
  const years = today.getUTCFullYear() - foundedAt.getUTCFullYear();
  const anniversaryNotReached =
    today.getUTCMonth() < foundedAt.getUTCMonth() ||
    (today.getUTCMonth() === foundedAt.getUTCMonth() &&
      today.getUTCDate() < foundedAt.getUTCDate());

  return anniversaryNotReached ? years - 1 : years;
}

export default function Numbers() {
  const yearsInBusiness = getYearsInBusiness();

  return (
    <section className="bg-[#041636] py-10">
      <div className="md:w-5xl 2xl:w-7xl mx-auto flex justify-between gap-10">
        <div className="space-y-4 text-center">
          <h1 className="text-sky-300 text-5xl font-bold">
            {yearsInBusiness}
            <span className="text-blue-400 animate-pulse">+</span>
          </h1>
          <p className="text-white/70">Anos no mercado</p>
        </div>
        <div className="space-y-4 text-center">
          <h1 className="text-sky-300 text-5xl font-bold">
            200<span className="text-blue-400 animate-pulse">+</span>
          </h1>
          <p className="text-white/70">Clientes fiéis</p>
        </div>
        <div className="space-y-4 text-center">
          <h1 className="text-sky-300 text-5xl font-bold">
            1.200<span className="text-blue-400 animate-pulse">+</span>
          </h1>
          <p className="text-white/70">Equipamentos fornecidos</p>
        </div>
        <div className="space-y-4 text-center">
          <h1 className="text-sky-300 text-5xl font-bold">
            24
            <span className="text-blue-400 animate-pulse">/7</span>
          </h1>

          <p className="text-white/70">Compromisso com a segurança</p>
        </div>
      </div>
    </section>
  );
}
