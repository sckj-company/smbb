import Availability from "@/components/Availability";
import { useTranslation } from "react-i18next";

export default function HeroContent() {
  const { t } = useTranslation();

  return (
    <div className="max-w-164 text-center md:text-left">
      <Availability />
      <h1 className="mt-8 text-4xl font-bold tracking-tighter sm:text-5xl 2xl:text-[4.2rem]">
        {t("header.title")}
      </h1>

      <p className="mx-auto mt-8 lg:max-w-120 2xl:max-w-140 text-black/65 md:mx-0">
        {t("header.description")}
      </p>
    </div>
  );
}
