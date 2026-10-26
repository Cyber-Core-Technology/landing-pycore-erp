import type { Metadata } from "next";
import { grafo, metadatosDe, migajaJsonLd, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { MigracionSection } from "@/components/sections/MigracionSection";
import { CTASection } from "@/components/sections/CTASection";


export const metadata: Metadata = metadatosDe({
  titulo: "Migrar tu punto de venta sin recapturar",
  descripcion: "Trae tu catálogo, tus clientes, tus existencias y años de historial de ventas desde tu sistema actual. Se simula completa antes de tocar nada, y se puede deshacer.",
  ruta: "/migracion",
  claves: ["migrar punto de venta", "cambiar de sistema POS", "importar catálogo", "migración Eleventa", "cambiar de ERP sin perder datos"],
  imagenAlt: "Cómo se migra a PyCore SGC sin recapturar nada",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Migración", item: `${SITE_URL}/migracion` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Pierdo mi historial de ventas al cambiar de sistema?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. El historial se trae como historia de sólo lectura: queda consultable pero no mueve inventario ni caja, porque tu existencia inicial ya refleja lo que vendiste.",
          },
        },
        {
          "@type": "Question",
          name: "¿Se puede probar la migración antes de hacerla?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. La migración corre completa dentro de una transacción que se deshace al terminar, así que el informe conoce los choques de clave y los datos que no caben antes de modificar nada.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué pasa si la migración sale mal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cada registro migrado recuerda de dónde vino, así que volver a correrla no duplica nada y deshacerla no borra los registros que ya existían y sólo se enlazaron.",
          },
        },
      ],
    },
  ],
};

export default function MigracionPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <EncabezadoPagina
          icon="refresh"
          cejilla="VIENES DE OTRO SISTEMA"
          titulo="Cambiar de sistema sin recapturar nada"
          bajada="Lo que detiene a un negocio no es el precio: es pensar en teclear otra vez quinientos productos y perder diez años de historia. Ni una cosa ni la otra."
        />
        <MigracionSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
