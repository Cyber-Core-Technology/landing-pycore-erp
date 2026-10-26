import type { Metadata } from "next";
import { metadatosDe, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { ModulosPageContent } from "@/components/pages/ModulosPageContent";
import { ModulesSection } from "@/components/sections/ModulesSection";


export const metadata: Metadata = metadatosDe({
  titulo: "Once módulos integrados para tu negocio",
  descripcion: "Conoce los 11 módulos de PyCore SGC: inventario en tiempo real, ventas POS offline, compras, facturación CFDI, finanzas, recursos humanos y auditoría. Activa solo los que necesitas.",
  ruta: "/modulos",
  claves: ["módulos ERP", "inventario México", "punto de venta POS", "control de compras", "finanzas PyME", "recursos humanos software"],
  imagenAlt: "Los once módulos de PyCore SGC",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio",   item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Módulos",  item: `${SITE_URL}/modulos` },
    ],
  },
  {
  "@type": "ItemList",
  name: "Módulos de PyCore SGC",
  description: "11 módulos integrados para la gestión completa de PyMEs mexicanas",
  url: `${SITE_URL}/modulos`,
  itemListElement: [
    "Core y sucursales", "Seguridad y accesos", "Catálogos", "Clientes y proveedores",
    "Inventario", "Compras", "Ventas y POS", "Facturación CFDI", "Finanzas",
    "Recursos humanos", "Auditoría",
  ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
  },
  ],
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
        <EncabezadoPagina
          icon="layers"
          cejilla="LOS MÓDULOS"
          titulo="Todo lo que tu negocio necesita, en un solo lugar"
          bajada="Once módulos integrados. Activas los que necesitas y desactivas los que no: PyCore crece contigo sin cambiar de sistema ni migrar datos."
        />
        <ModulosPageContent />
        <ModulesSection />
      </main>
      <Footer />
    </>
  );
}
