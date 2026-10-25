import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { CTASection } from "@/components/sections/CTASection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

export const metadata: Metadata = {
  title: "La plataforma — panel de mando, seguridad e infraestructura",
  description:
    "El panel que ves al entrar, con todo en tiempo real. 2FA, aislamiento entre empresas, auditoría de cada acción y tokens con expiración. Infraestructura en contenedores.",
  keywords: [
    "dashboard ERP tiempo real", "seguridad ERP", "2FA empresa",
    "multitenancy", "auditoría de sistema", "ERP en la nube México",
  ],
  alternates: { canonical: `${SITE_URL}/plataforma` },
  openGraph: {
    title: "La plataforma de PyCore SGC",
    description:
      "Panel de mando en tiempo real, 2FA, aislamiento entre empresas y auditoría completa de cada acción.",
    url: `${SITE_URL}/plataforma`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "La plataforma de PyCore SGC" }],
  },
};

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
