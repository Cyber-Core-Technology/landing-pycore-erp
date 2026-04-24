import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { ModulesSection } from "@/components/sections/ModulesSection";
import { TEZCASection } from "@/components/sections/TEZCASection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { PlansSection } from "@/components/sections/PlansSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <StatsSection />
        <EcosystemSection />
        <DashboardSection />
        <ModulesSection />
        <TEZCASection />
        <DifferentiatorsSection />
        <PlansSection />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
