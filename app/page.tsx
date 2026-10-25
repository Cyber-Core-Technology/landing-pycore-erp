import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";

/*
  La portada llevaba doce secciones y había que deslizar un buen rato para
  llegar a los planes. El contenido estaba, pero enterrado — que para quien
  acaba de llegar es lo mismo que no estar.

  Ahora la portada **cuenta y reparte**: qué es, qué tan serio, por dónde
  entrar y cuánto cuesta. El detalle de cada tema vive en su propia pantalla,
  con su URL, su título y su sitio en el mapa del sitio:

    /modulos      los once módulos
    /capacidades  lo que sólo se ve operando + los diferenciadores
    /documentos   los PDF descargables
    /plataforma   el panel de mando + la seguridad
    /tezca        el asistente
    /tienda       la tienda en línea

  De paso cada página descarga lo suyo y no lo de las otras once, que es el
  motivo por el que esto ya venía con `dynamic()`.
*/

// Carga diferida — sólo se descargan cuando el usuario llega a esa zona
const StatsSection     = dynamic(() => import("@/components/sections/StatsSection").then(m => ({ default: m.StatsSection })));
const EcosystemSection = dynamic(() => import("@/components/sections/EcosystemSection").then(m => ({ default: m.EcosystemSection })));
const ExploraSection   = dynamic(() => import("@/components/sections/ExploraSection").then(m => ({ default: m.ExploraSection })));
const PlansSection     = dynamic(() => import("@/components/sections/PlansSection").then(m => ({ default: m.PlansSection })));
const CTASection       = dynamic(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <StatsSection />
        <EcosystemSection />
        <ExploraSection />
        <PlansSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
