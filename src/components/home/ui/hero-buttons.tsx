import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HeroButtons() {
  return (
    <div className="flex items-center gap-4 sm:flex-row">
      <Button
        size="lg"
        className="cursor-pointer mt-6 rounded-lg bg-sky-500 dark:bg-sky-950 px-4 py-1.5 text-white transition-colors hover:bg-sky-600 hover:dark:bg-sky-800"
      >
        Ver produtos
      </Button>

      <Button
        size="lg"
        variant="ghost"
        className="cursor-pointer mt-6 rounded-lg px-4 py-1.5 text-black dark:text-white transition-colors"
      >
        <Link href="#benefits">Ver Serviços</Link>
      </Button>
    </div>
  );
}
