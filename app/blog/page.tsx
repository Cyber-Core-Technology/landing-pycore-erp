import type { Metadata } from "next";
import { metadatosDe, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { BlogPageContent } from "@/components/pages/BlogPageContent";
import { getAllPosts, toSummary } from "@/lib/blog";


export const metadata: Metadata = metadatosDe({
  titulo: "Blog: gestión, inventario y tecnología",
  descripcion: "Artículos prácticos sobre control de inventario, punto de venta, impuestos mexicanos e inteligencia artificial aplicada a negocios pequeños y medianos.",
  ruta: "/blog",
  claves: ["blog ERP", "gestión de inventario", "consejos PyME", "tecnología para negocios"],
  imagenAlt: "Blog de PyCore SGC",
});

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog",   item: `${SITE_URL}/blog` },
        ],
      },
      {
        "@type":     "Blog",
        "@id":       `${SITE_URL}/blog#blog`,
        name:        "Blog PyCore SGC",
        description: "Gestión, inventario, ventas e IA para PyMEs mexicanas.",
        url:         `${SITE_URL}/blog`,
        inLanguage:  "es-MX",
        publisher:   { "@id": `${SITE_URL}/#organization` },
        blogPost: posts.map((p) => ({
          "@type":        "BlogPosting",
          "@id":          `${SITE_URL}/blog/${p.slug}`,
          headline:       p.title,
          description:    p.excerpt,
          datePublished:  p.date,
          author:         { "@type": "Organization", name: p.author },
          url:            `${SITE_URL}/blog/${p.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EncabezadoPagina
          icon="bulb"
          cejilla="BLOG"
          titulo="Lo que aprendemos operando"
          bajada="Inventario, punto de venta, facturación y el día a día de un negocio mexicano. Sin humo y sin listas de diez trucos."
        />
        <BlogPageContent posts={posts.map(toSummary)} />
      </main>
      <Footer />
    </>
  );
}
