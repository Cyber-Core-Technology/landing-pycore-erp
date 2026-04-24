import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TEZCAPageContent } from "@/components/pages/TEZCAPageContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

export const metadata: Metadata = {
  title: "TEZCA — Consejero de Negocios con IA",
  description:
    "TEZCA es el asistente de inteligencia artificial de PyCore ERP. Analiza tu negocio cada hora, genera alertas automáticas, responde preguntas con tus datos reales y celebra tus logros.",
  keywords: [
    "IA para negocios", "inteligencia artificial ERP", "asistente IA México",
    "TEZCA PyCore", "alertas automáticas negocio", "analítica inteligente PyME",
  ],
  alternates: { canonical: `${SITE_URL}/tezca` },
  openGraph: {
    title:       "TEZCA — Tu Consejero de Negocios con IA · PyCore ERP",
    description: "Analiza tu negocio en tiempo real, genera alertas automáticas y te dice qué hacer con tus datos. Sin configuración.",
    url:         `${SITE_URL}/tezca`,
    images: [{ url: "/web-app-manifest-512x512.png", width: 512, height: 512, alt: "TEZCA IA PyCore ERP" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TEZCA — Consejero de Negocios con IA",
  description: "Asistente de inteligencia artificial integrado en PyCore ERP que analiza la operación del negocio en tiempo real.",
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
  isPartOf: { "@type": "SoftwareApplication", name: "PyCore ERP", url: SITE_URL },
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
        <TEZCAPageContent />
      </main>
      <Footer />
    </>
  );
}
