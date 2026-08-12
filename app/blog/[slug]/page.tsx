import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogPostContent } from "@/components/pages/BlogPostContent";
import { getAllPosts, getPostBySlug, getRelatedPosts, readingMinutes, toSummary } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Artículo no encontrado" };

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title:       post.title,
    description: post.excerpt,
    keywords:    post.tags,
    authors:     [{ name: post.author }],
    alternates:  { canonical: url },
    openGraph: {
      type:          "article",
      title:         post.title,
      description:   post.excerpt,
      url,
      publishedTime: post.date,
      authors:       [post.author],
      tags:          post.tags,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       post.title,
      description: post.excerpt,
      images:      ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio",     item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog",       item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title,   item: url },
        ],
      },
      {
        "@type":           "BlogPosting",
        "@id":             url,
        headline:          post.title,
        description:       post.excerpt,
        datePublished:     post.date,
        dateModified:      post.date,
        articleSection:    post.category,
        keywords:          post.tags.join(", "),
        inLanguage:        "es-MX",
        url,
        mainEntityOfPage:  { "@type": "WebPage", "@id": url },
        author:            { "@type": "Organization", name: post.author, url: SITE_URL },
        publisher:         { "@id": `${SITE_URL}/#organization` },
        image:             `${SITE_URL}/og-image.png`,
        isPartOf:          { "@id": `${SITE_URL}/blog#blog` },
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
        <BlogPostContent
          post={post}
          minutes={readingMinutes(post)}
          related={getRelatedPosts(post.slug).map(toSummary)}
        />
      </main>
      <Footer />
    </>
  );
}
