import Availability from "@/components/Availability"
import { useTranslation } from "react-i18next"

export default function HeroContent() {
  const { t } = useTranslation()

  return (
    <div className="mt-0 lg:mt-20 2xl:mt-0 max-w-164 text-center lg:text-left">
      <Availability />
      <h1 className="mt-8 text-4xl font-bold tracking-tighter sm:text-6xl lg:text-5xl 2xl:text-[4.2rem]">
        {t("header.title")}
      </h1>

      <p className="sm:max-w-110 lg:max-w-120 2xl:max-w-140 mx-auto mt-8 text-black/65 lg:mx-0">
        {t("header.description")}
      </p>
    </div>
  )
}
