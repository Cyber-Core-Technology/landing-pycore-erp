import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";
  const now  = new Date();

  return [
    {
      url:              base,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         1.0,
    },
    {
      url:              `${base}/modulos`,
      lastModified:     now,
      changeFrequency:  "monthly",
      priority:         0.9,
    },
    {
      url:              `${base}/tezca`,
      lastModified:     now,
      changeFrequency:  "monthly",
      priority:         0.9,
    },
    {
      url:              `${base}/tienda`,
      lastModified:     now,
      changeFrequency:  "monthly",
      priority:         0.8,
    },
    {
      url:              `${base}/blog`,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         0.8,
    },
    ...getAllPosts().map((post) => ({
      url:             `${base}/blog/${post.slug}`,
      lastModified:    new Date(`${post.date}T12:00:00Z`),
      changeFrequency: "monthly" as const,
      priority:        0.7,
    })),
  ];
}
