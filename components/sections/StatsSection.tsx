"use client";
import { motion } from "framer-motion";

// Franja de cifras del brochure: número y etiqueta, sin icono que compita.
const stats = [
  { value: "10",  suffix: "",   label: "módulos integrados" },
  { value: "100", suffix: "%",  label: "mexicano y en la nube" },
  { value: "4",   suffix: "",   label: "planes para cada etapa" },
  { value: "24",  suffix: "/7", label: "sistema en tiempo real" },
];

export function StatsSection() {
  return (
    <section
      className="py-14"
      style={{
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col gap-1"
            >
              <div
                className="font-heading font-bold text-[42px] leading-none tracking-[-0.03em] tabular-nums"
                style={{ color: "var(--accent-ink)" }}
              >
                {s.value}
                <span className="text-2xl">{s.suffix}</span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
