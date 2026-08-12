import Link from "next/link";
import { formatDate, type PostSummary } from "@/lib/blog";

export function PostCard({ post, featured = false }: { post: PostSummary; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl p-6 h-full transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className={featured ? "text-5xl" : "text-4xl"} aria-hidden="true">{post.emoji}</span>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: "rgba(27,174,145,0.12)",
            border:     "1px solid rgba(27,174,145,0.3)",
            color:      "var(--color-primary)",
          }}
        >
          {post.category}
        </span>
      </div>

      <h3
        className={`font-heading font-bold text-[var(--text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors ${
          featured ? "text-2xl lg:text-3xl" : "text-lg"
        }`}
      >
        {post.title}
      </h3>

      <p className={`text-[var(--text-muted)] leading-relaxed mb-5 ${featured ? "text-base" : "text-sm"}`}>
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center gap-2 text-[var(--text-muted)] text-xs">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.minutes} min de lectura</span>
        <span className="ml-auto text-[var(--color-primary)] font-semibold group-hover:translate-x-0.5 transition-transform">
          Leer →
        </span>
      </div>
    </Link>
  );
}
