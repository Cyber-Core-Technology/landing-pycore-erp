import type { Metadata } from "next";
import { grafo, metadatosDe, migajaJsonLd, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { DocumentosSection } from "@/components/sections/DocumentosSection";
import { CTASection } from "@/components/sections/CTASection";
import { DOCUMENTOS } from "@/lib/documentos";


export const metadata: Metadata = metadatosDe({
  titulo: "PDF de ejemplo: reportes, cortes y tickets",
  descripcion: "Descarga los PDF que genera el sistema: reporte de ventas, corte de caja, resumen diario, expediente de RRHH y ticket de 80 mm. Archivos reales con datos de ejemplo.",
  ruta: "/documentos",
  claves: ["reporte de ventas PDF", "corte de caja PDF", "ticket de venta 80mm", "expediente de empleado", "reportes ERP México"],
  imagenAlt: "Los cinco PDF de ejemplo que genera PyCore SGC",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Documentos", item: `${SITE_URL}/documentos` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Documentos de ejemplo de PyCore SGC",
      url: `${SITE_URL}/documentos`,
      itemListElement: DOCUMENTOS.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: d.nombre,
        url: `${SITE_URL}${d.archivo}`,
      })),
    },
  ],
};

export default function DocumentosPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EncabezadoPagina
          icon="receipt"
          cejilla="LOS PAPELES DEL NEGOCIO"
          titulo="Los documentos ya están hechos"
          bajada="Cada PDF de esta página lo generó el sistema con datos de un abarrotes de demostración. Son los archivos de verdad: ábrelos, imprímelos, enséñaselos a tu contador."
        />
        <DocumentosSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
