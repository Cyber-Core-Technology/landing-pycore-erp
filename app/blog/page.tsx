import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogPageContent } from "@/components/pages/BlogPageContent";
import { getAllPosts, toSummary } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

export const metadata: Metadata = {
  title: "Blog — Gestión, inventario y tecnología para PyMEs",
  description:
    "Artículos prácticos sobre control de inventario, punto de venta, impuestos mexicanos e inteligencia artificial aplicada a negocios pequeños y medianos.",
  keywords: [
    "blog ERP México", "control de inventario PyME", "punto de venta offline",
    "IVA IEPS software", "IA para PyMEs", "gestión de negocios México",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title:       "Blog PyCore — Ideas para operar mejor tu negocio",
    description: "Inventario, ventas, impuestos y tecnología explicados para PyMEs mexicanas.",
    url:         `${SITE_URL}/blog`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Blog PyCore SGC" }],
  },
};

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
        <BlogPageContent posts={posts.map(toSummary)} />
      </main>
      <Footer />
    </>
  );
}
