import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/smbb-logo.webp"
        alt="SMBB Logo"
        width="200"
        height="100"
        className="lg:h-8.5 xl:h-10 w-auto"
      />
    </Link>
  );
}
