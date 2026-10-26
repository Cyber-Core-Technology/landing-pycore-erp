import type { Metadata } from "next";
import { metadatosDe, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { TiendaPageContent } from "@/components/pages/TiendaPageContent";


export const metadata: Metadata = metadatosDe({
  titulo: "Tienda en línea con stock en tiempo real",
  descripcion: "Lanza tu tienda en línea conectada en tiempo real con tu inventario. Sin doble captura, sin desincronía. Cobros con Mercado Pago, pedidos programados y seguimiento en tiempo real.",
  ruta: "/tienda",
  claves: ["tienda en línea México", "ecommerce con inventario", "catálogo público", "Mercado Pago", "vender en línea PyME"],
  imagenAlt: "La tienda en línea de PyCore SGC",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",         item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tienda en Línea", item: `${SITE_URL}/tienda` },
    ],
  },
  {
  "@type": "WebPage",
  name: "Tienda en Línea — PyCore SGC",
  description: "Módulo de tienda en línea de PyCore SGC conectado en tiempo real al inventario.",
  url: `${SITE_URL}/tienda`,
  about: {
    "@type": "SoftwareApplication",
    name: "Módulo Tienda en Línea PyCore SGC",
    featureList: [
      "URL pública personalizada",
      "Stock en tiempo real",
      "Checkout con Mercado Pago",
      "Pedidos programados",
      "Seguimiento de pedido en tiempo real",
      "Sincronización automática con inventario ERP",
    ],
  },
  },
  ],
};

export default function TiendaPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EncabezadoPagina
          icon="store"
          cejilla="TU TIENDA EN LÍNEA"
          titulo="Tu catálogo público, conectado al mismo inventario"
          bajada="Lo que vendes en el mostrador y lo que vendes en línea salen de la misma existencia. Sin doble captura y sin que se te caiga el stock por desincronía."
        />
        <TiendaPageContent />
      </main>
      <Footer />
    </>
  );
}
