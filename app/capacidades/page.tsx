import type { Metadata } from "next";
import { grafo, metadatosDe, migajaJsonLd, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { CapacidadesSection } from "@/components/sections/CapacidadesSection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { CTASection } from "@/components/sections/CTASection";
import { CAPACIDADES } from "@/lib/capacidades";


export const metadata: Metadata = metadatosDe({
  titulo: "POS offline, granel, presentaciones y CFDI",
  descripcion: "Presentaciones de producto, recetas y combos, venta por peso, cola offline que no duplica ventas, listas de precios leídas con IA, CFDI por renglones y migración desde otro POS.",
  ruta: "/capacidades",
  claves: ["POS offline México", "venta por peso granel", "presentaciones de producto", "lista de precios proveedor", "migración punto de venta", "recetas e insumos"],
  imagenAlt: "Las capacidades de PyCore SGC que sólo se ven operando",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Capacidades", item: `${SITE_URL}/capacidades` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Capacidades de PyCore SGC",
      url: `${SITE_URL}/capacidades`,
      itemListElement: CAPACIDADES.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.nombre,
        description: g.resumen,
      })),
    },
  ],
};

export default function CapacidadesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EncabezadoPagina
          icon="bolt"
          cejilla="LO QUE SÓLO SE VE OPERANDO"
          titulo="Los detalles que deciden si un sistema sirve o estorba"
          bajada="Un folleto dice «control de inventario». Esto es lo que eso significa un martes a las dos de la tarde, con la fila esperando."
        />
        <CapacidadesSection />
        <DifferentiatorsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
