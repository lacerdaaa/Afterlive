import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Problem } from "@/components/sections/problem";
import { Signals } from "@/components/sections/signals";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-16 pb-16">
        <Hero />
        <Problem />
        <HowItWorks />
        <Signals />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
