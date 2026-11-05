import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { OnSet } from "@/components/home/OnSet";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioShowcase } from "@/components/home/PortfolioShowcase";
import { AuditBanner } from "@/components/home/AuditBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <OnSet />
      <ServicesPreview />
      <PortfolioShowcase />
      <AuditBanner />
    </>
  );
}
