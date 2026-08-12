"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";
import { useDemoModal } from "@/lib/demo-context";
import { CATEGORIES, type Category, type PostSummary } from "@/lib/blog";

type Filter = Category | "Todos";

export function BlogPageContent({ posts }: { posts: PostSummary[] }) {
  const { openModal } = useDemoModal();
  const [filter, setFilter] = useState<Filter>("Todos");

  // Solo mostramos categorías que tienen al menos un artículo publicado.
  const filters = useMemo<Filter[]>(
    () => ["Todos", ...CATEGORIES.filter((c) => posts.some((p) => p.category === c))],
    [posts]
  );

  const visible = useMemo(
    () => (filter === "Todos" ? posts : posts.filter((p) => p.category === filter)),
    [posts, filter]
  );

  const [featured, ...rest] = visible;

  return (
    <>
      {/* Hero */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A1714 0%, #0F2D26 60%, #0E3D30 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#1BAE91]/20 border border-[#1BAE91]/40 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-5"
          >
            📝 Blog PyCore
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6F2EE] mb-5"
          >
            Ideas para operar mejor
            <br />
            <span style={{ color: "#1BAE91" }}>tu negocio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#94B8B0] text-lg max-w-2xl mx-auto"
          >
            Inventario, ventas, impuestos y tecnología, explicados para PyMEs mexicanas.
            Sin humo y sin tecnicismos innecesarios.
          </motion.p>
        </div>
      </section>

      {/* Filtro por categoría */}
      <section className="bg-[var(--bg)] pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center gap-2 flex-wrap justify-center"
            role="group"
            aria-label="Filtrar artículos por categoría"
          >
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                  style={{
                    background: active ? "var(--color-primary)" : "var(--card)",
                    border:     `1px solid ${active ? "var(--color-primary)" : "var(--border)"}`,
                    color:      active ? "#FFFFFF" : "var(--text-muted)",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Listado */}
      <section className="py-12 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!featured ? (
            <p className="text-center text-[var(--text-muted)] py-16">
              Todavía no hay artículos en esta categoría. Muy pronto.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Destacado: el más reciente del filtro activo */}
              <motion.div
                key={featured.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PostCard post={featured} featured />
              </motion.div>

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-[var(--card)]">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--text)] mb-4">
            ¿Quieres ver esto aplicado a tu negocio?
          </h2>
          <p className="text-[var(--text-muted)] text-lg mb-8">
            En una demo revisamos tu operación real —inventario, ventas, sucursales— y te
            mostramos qué cambiaría con PyCore SGC.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => openModal()}
              className="bg-[var(--color-primary)] text-white rounded-full px-8 py-3 font-semibold hover:bg-[var(--color-secondary)] transition-colors"
            >
              Solicitar Demo
            </button>
            <a
              href="/modulos"
              className="border border-[var(--border)] text-[var(--text-muted)] rounded-full px-8 py-3 font-semibold hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
            >
              Ver todos los módulos
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
