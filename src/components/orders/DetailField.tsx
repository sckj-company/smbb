import type { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
};

export default function DetailField({ label, children }: Props) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium break-words text-slate-800">
        {children}
      </dd>
    </div>
  );
}
