import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";

// Carga diferida — sólo se descargan cuando el usuario llega a esa zona
const StatsSection         = dynamic(() => import("@/components/sections/StatsSection").then(m => ({ default: m.StatsSection })));
const EcosystemSection     = dynamic(() => import("@/components/sections/EcosystemSection").then(m => ({ default: m.EcosystemSection })));
const DashboardSection     = dynamic(() => import("@/components/sections/DashboardSection").then(m => ({ default: m.DashboardSection })));
const ModulesSection       = dynamic(() => import("@/components/sections/ModulesSection").then(m => ({ default: m.ModulesSection })));
const TEZCASection         = dynamic(() => import("@/components/sections/TEZCASection").then(m => ({ default: m.TEZCASection })));
const DifferentiatorsSection = dynamic(() => import("@/components/sections/DifferentiatorsSection").then(m => ({ default: m.DifferentiatorsSection })));
const PlansSection         = dynamic(() => import("@/components/sections/PlansSection").then(m => ({ default: m.PlansSection })));
const SecuritySection      = dynamic(() => import("@/components/sections/SecuritySection").then(m => ({ default: m.SecuritySection })));
const CTASection           = dynamic(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));

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
