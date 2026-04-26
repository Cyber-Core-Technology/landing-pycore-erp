import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ModulosPageContent } from "@/components/pages/ModulosPageContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

export const metadata: Metadata = {
  title: "Módulos del ERP",
  description:
    "Conoce los 10 módulos de PyCore ERP: inventario, ventas POS, compras, finanzas, recursos humanos, auditoría y más. Activa solo los que necesitas.",
  keywords: [
    "módulos ERP", "inventario México", "punto de venta POS", "facturación CFDI",
    "control de compras", "finanzas PyME", "recursos humanos software",
  ],
  alternates: { canonical: `${SITE_URL}/modulos` },
  openGraph: {
    title:       "Módulos de PyCore ERP — 10 módulos para tu negocio",
    description: "Inventario, ventas, finanzas, auditoría, recursos humanos y más. Activa solo lo que necesitas.",
    url:         `${SITE_URL}/modulos`,
    images: [{ url: "/web-app-manifest-512x512.png", width: 512, height: 512, alt: "PyCore ERP Módulos" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Módulos de PyCore ERP",
  description: "10 módulos integrados para la gestión completa de PyMEs mexicanas",
  url: `${SITE_URL}/modulos`,
  itemListElement: [
    "Core y sucursales", "Seguridad y accesos", "Catálogos", "Clientes y proveedores",
    "Inventario", "Compras", "Ventas y POS", "Finanzas",
    "Recursos humanos", "Auditoría",
  ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
};

export default function ModulosPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ModulosPageContent />
      </main>
      <Footer />
    </>
  );
}
