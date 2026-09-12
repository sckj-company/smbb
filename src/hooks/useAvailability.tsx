import { useEffect, useState } from "react";

function getAvailability() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

  return (dayOfWeek >= 1 &&
    dayOfWeek <= 5 &&
    currentMinutes >= 7 * 60 + 30 &&
    currentMinutes < 17 * 60) ||
    (dayOfWeek === 6 && currentMinutes >= 8 * 60 && currentMinutes < 13 * 60)
    ? "availability.open"
    : "availability.closed";
}

export default function useAvailability() {
  const [availability, setAvailability] = useState(getAvailability);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setAvailability(getAvailability());
    }, 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  return availability;
}
