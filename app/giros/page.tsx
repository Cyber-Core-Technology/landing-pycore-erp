import type { Metadata } from "next";
import { grafo, metadatosDe, migajaJsonLd, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { GirosSection } from "@/components/sections/GirosSection";
import { CTASection } from "@/components/sections/CTASection";
import { GIROS } from "@/lib/giros";


export const metadata: Metadata = metadatosDe({
  titulo: "Para tu giro: abarrotes, farmacia, taller",
  descripcion: "PyCore SGC en doce giros: abarrotes, carnicería, restaurante, panadería, farmacia, ropa, ferretería, billar, estética, taller, gimnasio y papelería. Cada uno con su negocio de ejemplo.",
  ruta: "/giros",
  claves: GIROS.map((g) => `software para ${g.nombre.toLowerCase()}`),
  imagenAlt: "Los doce giros que atiende PyCore SGC",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Para tu giro", item: `${SITE_URL}/giros` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿PyCore SGC sirve para mi tipo de negocio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El sistema no se configura por giro: el giro decide qué se activa de salida, no qué puede hacer. Hay doce perfiles listos —abarrotes, carnicería, restaurante, panadería, farmacia, ropa, ferretería, billar, estética, taller, gimnasio y papelería— y el resto se ajusta igual.",
          },
        },
        {
          "@type": "Question",
          name: "¿Puedo vender por peso, en kilos y gramos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. El granel se captura en gramos, que es lo que marca la báscula, y el peso y el importe se equilibran en los dos sentidos. El inventario se lleva en la unidad base.",
          },
        },
        {
          "@type": "Question",
          name: "¿Sirve para un restaurante con recetas y mesas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. La mesa se cobra como sesión, el platillo descuenta sus ingredientes al venderse y el costo sale de lo que costaron los insumos ese día, no de un precio tecleado a mano.",
          },
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Giros que atiende PyCore SGC",
      url: `${SITE_URL}/giros`,
      itemListElement: GIROS.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.nombre,
        description: g.gancho,
      })),
    },
  ],
};

export default function GirosPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <EncabezadoPagina
          icon="store"
          cejilla="PARA TU GIRO"
          titulo="Tu negocio no es «un negocio»"
          bajada="Una carnicería pesa, una panadería hornea, una boutique maneja tallas y un billar cobra por reloj. Doce giros, cada uno con lo que de verdad necesita."
        />
        <GirosSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
