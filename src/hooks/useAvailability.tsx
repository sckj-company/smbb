export default function useAvailability() {
  const currentHour = new Date().getHours();
  const availability =
    currentHour >= 5 && currentHour < 17 ? "Aberto" : "Fechado";

  return availability;
}
