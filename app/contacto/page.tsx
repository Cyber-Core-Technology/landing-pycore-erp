import type { Metadata } from "next";
import { grafo, metadatosDe, migajaJsonLd, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { ContactoSection } from "@/components/sections/ContactoSection";
import { QuienesSomosSection } from "@/components/sections/QuienesSomosSection";
import { CTASection } from "@/components/sections/CTASection";
import { COMPANY_NAME, COMPANY_URL } from "@/lib/constants";


export const metadata: Metadata = metadatosDe({
  titulo: "Contacto y quiénes somos",
  descripcion: "WhatsApp, correo o demo guiada sobre tu propia operación. Y quién está detrás: PyCore SGC lo respalda Global-IAnalytics, empresa de IA, automatización y analítica.",
  ruta: "/contacto",
  claves: ["contacto PyCore", "demo ERP México", "quiénes somos", "Global-IAnalytics"],
  imagenAlt: "Contacto y quiénes están detrás de PyCore SGC",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Contacto", item: `${SITE_URL}/contacto` },
      ],
    },
    {
      "@type": "ContactPage",
      url: `${SITE_URL}/contacto`,
      about: { "@type": "Organization", name: COMPANY_NAME, url: COMPANY_URL },
    },
  ],
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <EncabezadoPagina
          icon="chat"
          cejilla="CONTACTO"
          titulo="Habla con quien hace el sistema"
          bajada="No hay un centro de llamadas en medio. Escribe, agenda media hora, o mándanos el respaldo de lo que usas hoy y te decimos qué se puede traer."
        />
        <ContactoSection />
        <QuienesSomosSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
