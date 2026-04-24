"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "14",   suffix: "",  label: "módulos integrados",      icon: "🧩" },
  { value: "100",  suffix: "%", label: "mexicano y en la nube",   icon: "🇲🇽" },
  { value: "4",    suffix: "",  label: "planes para cada etapa",  icon: "📈" },
  { value: "24",   suffix: "/7", label: "sistema en tiempo real", icon: "⚡" },
];

export function StatsSection() {
  return (
    <section className="py-14 bg-[var(--card)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-heading font-extrabold text-4xl text-[var(--color-primary)] leading-none mb-1">
                {s.value}
                <span className="text-2xl">{s.suffix}</span>
              </div>
              <p className="text-[var(--text-muted)] text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
