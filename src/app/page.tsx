import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Pillars } from "@/components/home/Pillars";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioMarquee } from "@/components/home/PortfolioMarquee";
import { AuditBanner } from "@/components/home/AuditBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Pillars />
      <ServicesPreview />
      <PortfolioMarquee />
      <AuditBanner />
    </>
  );
}
