import type { Metadata } from "next";
import { grafo, metadatosDe, migajaJsonLd, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { CTASection } from "@/components/sections/CTASection";


export const metadata: Metadata = metadatosDe({
  titulo: "Panel de mando, seguridad e infraestructura",
  descripcion: "El panel que ves al entrar, con todo en tiempo real. 2FA, aislamiento entre empresas, auditoría de cada acción y tokens con expiración. Infraestructura en contenedores.",
  ruta: "/plataforma",
  claves: ["dashboard ERP tiempo real", "seguridad ERP", "2FA empresa", "multitenancy", "auditoría de sistema", "ERP en la nube México"],
  imagenAlt: "El panel de mando y la seguridad de PyCore SGC",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Plataforma", item: `${SITE_URL}/plataforma` },
  ],
};

export default function PlataformaPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EncabezadoPagina
          icon="shield"
          cejilla="LA PLATAFORMA"
          titulo="Lo que sostiene todo lo demás"
          bajada="El panel que ves al entrar, quién puede ver qué, y por qué tus datos no se mezclan con los de ningún otro negocio."
        />
        <DashboardSection />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
