"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { DIFFERENTIATORS } from "@/lib/constants";

export function DifferentiatorsSection() {
  return (
    <section className="py-20" style={{ background: "var(--bg)" }} aria-labelledby="diff-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="diff-heading"
          eyebrow="POR QUÉ PYCORE"
          title={<>Diseñado para la realidad<br />de tu negocio</>}
          subtitle="No es otro software de administración genérico. PyCore está construido para la forma en que operan los negocios mexicanos."
          tone="warm"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-card p-6 shadow-card-sm hover:shadow-card-lg dark:shadow-[0_2px_8px_rgba(0,0,0,0.30)] hover:dark:shadow-[0_18px_48px_rgba(0,0,0,0.42)] transition-shadow duration-300"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
              >
                <Icon name={d.icon} size={22} />
              </span>
              <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
                {d.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
