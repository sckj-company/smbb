const MAX_DISPLAYED_COUNT = 9;

type Props = {
  count: number;
};

export default function UnreadBadge({ count }: Props) {
  if (count <= 0) return null;

  const displayed =
    count > MAX_DISPLAYED_COUNT ? `${MAX_DISPLAYED_COUNT}+` : String(count);

  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none font-semibold text-white"
      >
        {displayed}
      </span>
      <span className="sr-only">{count} por ler</span>
    </>
  );
}
