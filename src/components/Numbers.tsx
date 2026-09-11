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
    <section className="border-y border-blue-200 bg-sky-50 py-10">
      <div className="md:w-5xl 2xl:w-7xl mx-auto flex justify-between gap-10">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-sky-900">
            {yearsInBusiness}
            <span className="text-blue-400 animate-pulse">+</span>
          </h1>
          <p className="text-sky-900/70">Anos no mercado</p>
        </div>
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-sky-900">
            200<span className="text-blue-400 animate-pulse">+</span>
          </h1>
          <p className="text-sky-900/70">Clientes fiéis</p>
        </div>
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-sky-900">
            1.200<span className="text-blue-400 animate-pulse">+</span>
          </h1>
          <p className="text-sky-900/70">Equipamentos fornecidos</p>
        </div>
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-sky-900">
            97
            <span className="text-blue-400 animate-pulse">%</span>
          </h1>

          <p className="text-sky-900/70">Taxa de satisfação</p>
        </div>
      </div>
    </section>
  );
}
