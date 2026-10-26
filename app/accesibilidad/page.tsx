import type { Metadata } from "next";
import { grafo, metadatosDe, migajaJsonLd, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { AccesibilidadSection } from "@/components/sections/AccesibilidadSection";


export const metadata: Metadata = metadatosDe({
  titulo: "Accesibilidad: qué cumplimos y qué no",
  descripcion: "Declaración de accesibilidad de PyCore SGC. Objetivo WCAG 2.2 AA: qué está hecho, qué está medido con su número, y qué falta todavía.",
  ruta: "/accesibilidad",
  claves: ["accesibilidad WCAG", "software accesible México", "declaración de accesibilidad", "ERP accesible"],
  imagenAlt: "Declaración de accesibilidad de PyCore SGC",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Accesibilidad", item: `${SITE_URL}/accesibilidad` },
  ],
};

export default function AccesibilidadPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <EncabezadoPagina
          icon="eye"
          cejilla="ACCESIBILIDAD"
          titulo="Qué cumplimos, y qué todavía no"
          bajada="El objetivo es WCAG 2.2 nivel AA en todo lo que toca quien administra su negocio. Esta página dice hasta dónde llegamos — incluida la parte que falta."
        />
        <AccesibilidadSection />
      </main>
      <Footer />
    </>
  );
}
