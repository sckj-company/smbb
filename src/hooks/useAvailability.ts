import { useEffect, useMemo, useState } from "react";

type AvailabilityVariant = "long" | "short";

function getAvailability(variant: AvailabilityVariant) {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

  const isOpen =
    (dayOfWeek >= 1 &&
      dayOfWeek <= 5 &&
      currentMinutes >= 7 * 60 + 30 &&
      currentMinutes < 17 * 60) ||
    (dayOfWeek === 6 && currentMinutes >= 8 * 60 && currentMinutes < 13 * 60);

  if (variant === "short") {
    return isOpen ? "availability.short.open" : "availability.short.closed";
  }

  return isOpen ? "availability.open" : "availability.closed";
}

export default function useAvailability(variant: AvailabilityVariant = "long") {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((t) => t + 1);
    }, 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  return useMemo(() => getAvailability(variant), [variant, tick]);
}
