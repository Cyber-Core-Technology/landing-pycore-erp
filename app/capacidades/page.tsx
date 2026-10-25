import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { CapacidadesSection } from "@/components/sections/CapacidadesSection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { CTASection } from "@/components/sections/CTASection";
import { CAPACIDADES } from "@/lib/capacidades";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

export const metadata: Metadata = {
  title: "Qué hace PyCore SGC de verdad — las capacidades que sólo se ven operando",
  description:
    "Presentaciones de producto, recetas y combos, venta por peso, cola offline que no duplica ventas, listas de precios leídas con IA, CFDI por renglones y migración desde otro POS.",
  keywords: [
    "POS offline México", "venta por peso granel", "presentaciones de producto",
    "lista de precios proveedor", "migración punto de venta", "recetas e insumos",
  ],
  alternates: { canonical: `${SITE_URL}/capacidades` },
  openGraph: {
    title: "Lo que sólo se ve operando — PyCore SGC",
    description:
      "Los detalles que deciden si un sistema sirve o estorba: el cigarro suelto y por cartón, el granel en gramos, cobrar sin internet sin duplicar la venta.",
    url: `${SITE_URL}/capacidades`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Capacidades de PyCore SGC" }],
  },
};

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
