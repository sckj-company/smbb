import useAvailability from "@/hooks/useAvailability";
import { useTranslation } from "react-i18next";

export default function Availability() {
  const { t } = useTranslation();
  const availability = useAvailability();

  return (
    <div
      className={`mx-auto mt-10 flex h-fit w-fit items-center gap-1 rounded-[6rem] border px-2 py-1 md:mx-0 ${availability === "availability.open" ? "border-green-300 bg-green-100" : "border-red-300 bg-red-100"}`}
    >
      <div
        className={`inline-flex ${availability === "availability.open" ? "bg-green-500" : "bg-red-500"} w-2 h-2 rounded-full animate-pulse`}
      />
      <span className="text-xs sm:text-sm font-medium">{t(availability)}</span>
    </div>
  );
}
