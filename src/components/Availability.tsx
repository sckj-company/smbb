import useAvailability from "@/hooks/useAvailability";

export default function Availability() {
  const availability = useAvailability();

  return (
    <div className="self-end mt-10 h-fit w-fit bg-red-200 rounded-[6rem] flex items-center gap-1 py-1 px-2">
      <div className="inline-flex bg-red-500 w-2 h-2 rounded-full animate-pulse" />
      <h1 className="text-sm font-medium">{availability}</h1>
    </div>
  );
}
