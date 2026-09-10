import CTA from "@/components/CTA";
import { Faq } from "@/components/Faq";
import HomeHero from "@/components/home/HomeHero";
import HowItWorksSection from "@/components/HowItWorksSection";
import Service from "@/components/Service";

export default function HomePage() {
  return (
    <main className=" bg-dotted mt-30 sm:mt-35 xl:mt-40 2xl:mt-10 w-full pb-12 px-4 sm:px-8 2xl:px-0 ">
      <div>
        <HomeHero />
        <Service />
        <HowItWorksSection />
        <Faq />
        <CTA />
      </div>
    </main>
  );
}
