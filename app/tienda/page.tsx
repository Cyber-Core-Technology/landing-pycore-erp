import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TiendaPageContent } from "@/components/pages/TiendaPageContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

export const metadata: Metadata = {
  title: "Tienda en Línea para tu Negocio",
  description:
    "Lanza tu tienda en línea conectada en tiempo real con tu inventario. Sin doble captura, sin desincronía. Cobros con Mercado Pago, pedidos programados y seguimiento en tiempo real.",
  keywords: [
    "tienda en línea México", "e-commerce PyME", "tienda online inventario",
    "Mercado Pago integrado", "catálogo online", "pedidos en línea México",
  ],
  alternates: { canonical: `${SITE_URL}/tienda` },
  openGraph: {
    title:       "Tienda en Línea para tu Negocio — PyCore ERP",
    description: "Tu catálogo público conectado en tiempo real con tu inventario. Sin doble captura. Mercado Pago incluido.",
    url:         `${SITE_URL}/tienda`,
    images: [{ url: "/web-app-manifest-512x512.png", width: 512, height: 512, alt: "Tienda en Línea PyCore ERP" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tienda en Línea — PyCore ERP",
  description: "Módulo de tienda en línea de PyCore ERP conectado en tiempo real al inventario.",
  url: `${SITE_URL}/tienda`,
  about: {
    "@type": "SoftwareApplication",
    name: "Módulo Tienda en Línea PyCore ERP",
    featureList: [
      "URL pública personalizada",
      "Stock en tiempo real",
      "Checkout con Mercado Pago",
      "Pedidos programados",
      "Seguimiento de pedido en tiempo real",
      "Sincronización automática con inventario ERP",
    ],
  },
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
        <TiendaPageContent />
      </main>
      <Footer />
    </>
  );
}
