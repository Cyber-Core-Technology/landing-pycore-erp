"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { PostBlocks } from "@/components/blog/PostBlocks";
import { PostCard } from "@/components/blog/PostCard";
import { PostReactions } from "@/components/blog/PostReactions";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareBar } from "@/components/blog/ShareBar";
import { useDemoModal } from "@/lib/demo-context";
import { formatDate, type Post, type PostSummary } from "@/lib/blog";

interface Props {
  post:    Post;
  minutes: number;
  related: PostSummary[];
}

export function BlogPostContent({ post, minutes, related }: Props) {
  const { openModal } = useDemoModal();
  const path = `/blog/${post.slug}`;

  return (
    <>
      <ReadingProgress />

      {/* Encabezado */}
      <header
        className="pt-14 pb-12"
        style={{ background: "linear-gradient(135deg, #0A1714 0%, #0F2D26 60%, #0E3D30 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Ruta de navegación" className="mb-6 text-sm">
            <Link href="/blog" className="text-[#7AE0C3] hover:text-white transition-colors">
              ← Todos los artículos
            </Link>
          </nav>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl" aria-hidden="true">{post.emoji}</span>
              <span className="rounded-full px-3 py-1 text-xs font-semibold bg-[#1BAE91]/20 border border-[#1BAE91]/40 text-[#7AE0C3]">
                {post.category}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6F2EE] mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-[#94B8B0] text-lg leading-relaxed mb-6">{post.excerpt}</p>

            <div className="flex items-center gap-2 text-[#94B8B0] text-sm flex-wrap">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{minutes} min de lectura</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Cuerpo */}
      <article className="py-14 bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <PostBlocks blocks={post.content} />

          {/* Etiquetas */}
          <div className="flex items-center gap-2 flex-wrap mt-12 pt-8 border-t border-[var(--border)]">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs font-medium text-[var(--text-muted)]"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interacción */}
          <div className="mt-8 flex flex-col gap-6">
            <ShareBar path={path} title={post.title} />
            <PostReactions slug={post.slug} />
          </div>

          {/* CTA */}
          <div
            className="mt-8 rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, #0F2D26 0%, #0E3D30 100%)" }}
          >
            <h2 className="font-heading text-xl lg:text-2xl font-bold text-[#E6F2EE] mb-3">
              Del artículo a tu operación
            </h2>
            <p className="text-[#94B8B0] text-base mb-6 max-w-lg mx-auto">
              Agenda una demo de 30 minutos y revisamos con tus propios números cómo se
              resolvería esto en PyCore SGC.
            </p>
            <button
              onClick={() => openModal()}
              className="bg-[#1BAE91] text-white rounded-full px-7 py-3 font-semibold hover:bg-[#159A7E] transition-colors"
            >
              Solicitar Demo
            </button>
          </div>
        </div>
      </article>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="py-16 bg-[var(--bg)] border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--text)] mb-8 text-center">
              Sigue leyendo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <PostCard post={r} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
