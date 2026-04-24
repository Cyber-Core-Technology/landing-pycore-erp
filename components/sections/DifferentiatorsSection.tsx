"use client";
import { motion } from "framer-motion";
import { DIFFERENTIATORS } from "@/lib/constants";

export function DifferentiatorsSection() {
  return (
    <section className="py-20 bg-[var(--bg)]" aria-labelledby="diff-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full px-4 py-1.5 text-[var(--color-secondary)] text-sm font-medium mb-4"
          >
            ⚡ ¿Por qué PyCore?
          </motion.span>
          <h2
            id="diff-heading"
            className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-4"
          >
            Diseñado para la realidad de tu negocio
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            No es otro software de administración genérico. PyCore está construido para la forma en que operan los negocios mexicanos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-[16px] p-6 dark:shadow-[0_0_16px_rgba(14,124,102,0.35)] hover:dark:shadow-[0_0_32px_rgba(14,124,102,0.45)] transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{d.icon}</div>
              <h3 className="font-heading font-semibold text-lg text-[var(--text)] mb-2">
                {d.title}
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
