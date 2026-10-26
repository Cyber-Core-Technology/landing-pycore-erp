import type { Metadata } from "next";
import { metadatosDe, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { TezcaOrigenSection } from "@/components/sections/TezcaOrigenSection";
import { TEZCAPageContent } from "@/components/pages/TEZCAPageContent";
import { TEZCASection } from "@/components/sections/TEZCASection";


export const metadata: Metadata = metadatosDe({
  titulo: "TEZCA, el asistente que ve tu negocio",
  descripcion: "TEZCA es el asistente de inteligencia artificial de PyCore SGC. Analiza tu negocio cada hora, genera alertas automáticas, responde preguntas con tus datos reales y celebra tus logros.",
  ruta: "/tezca",
  claves: ["asistente IA negocio", "inteligencia artificial PyME", "TEZCA", "alertas de inventario", "analítica de ventas"],
  imagenAlt: "TEZCA, el asistente con IA de PyCore SGC",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "TEZCA",  item: `${SITE_URL}/tezca` },
    ],
  },
  {
  "@type": "SoftwareApplication",
  name: "TEZCA — Consejero de Negocios con IA",
  description: "Asistente de inteligencia artificial integrado en PyCore SGC que analiza la operación del negocio en tiempo real.",
  url: `${SITE_URL}/tezca`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  featureList: [
    "Modo Consejero interactivo con IA",
    "Modo Observador automático cada hora",
    "Alertas de stock bajo, cuentas vencidas y más",
    "Generación de imágenes de productos con IA",
    "Insignias y logros automáticos",
    "Historial de conversaciones",
  ],
  isPartOf: { "@type": "SoftwareApplication", name: "PyCore SGC", url: SITE_URL },
  },
  ],
};

export default function TEZCAPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EncabezadoPagina
          icon="robot"
          cejilla="TEZCA · ASISTENTE CON IA"
          titulo="Te dice qué hacer, no sólo qué pasó"
          bajada="Analiza tu operación cada hora y trabaja con tus datos reales: alertas de stock y cartera, el resumen de ayer, y a qué cliente conviene escribirle hoy."
        />
        <TezcaOrigenSection />
        <TEZCAPageContent />
        <TEZCASection />
      </main>
      <Footer />
    </>
  );
}
