import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  link?: string;
}

export default function Logo({
  className,
  variant = "dark",
  link = "/"
}: LogoProps) {
  return (
    <Link href={link}>
      <Image
        src={
          variant === "dark" ? "/smbb-logo-dark.webp" : "/smbb-logo-light.webp"
        }
        alt="SMBB Logo"
        width="200"
        height="250"
        className={`h-6.5 sm:h-5.5 2xl:h-6.5 w-auto ${className}`}
      />
    </Link>
  );
}
