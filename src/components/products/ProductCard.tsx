import Image from "next/image";
import Link from "next/link";

export default function ProductCard() {
  return (
    <Link href="/">
      <Image
        src="/smbb-logo.webp"
        alt="SMBB Logo"
        width="200"
        height="100"
        className="h-13 w-auto"
      />
    </Link>
  );
}
