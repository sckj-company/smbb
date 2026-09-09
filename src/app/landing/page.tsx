import CTA from "@/components/CTA";
import HomeHero from "@/components/home/HomeHero";

export default function HomePage() {
  return (
    <main className="mt-30 sm:mt-35 xl:mt-40 2xl:mt-45 w-full pb-12 px-4 sm:px-8 2xl:px-0 md:w-5xl 2xl:w-7xl mx-auto">
      <HomeHero />
      <CTA />
    </main>
  );
}
