"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { MODULES } from "@/lib/constants";

export function ModulesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="funciones" className="py-20 bg-[var(--card)]" aria-labelledby="modules-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full px-4 py-1.5 text-[var(--color-secondary)] text-sm font-medium mb-4"
          >
            🧩 Módulos del sistema
          </motion.span>
          <h2
            id="modules-heading"
            className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-4"
          >
            Todo lo que tu negocio necesita
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            14 módulos integrados. Un solo sistema. Activa los que necesitas y desactiva los que no. Sin costos ocultos por funciones que no usas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod, index) => {
            const isOpen = expanded === mod.name;
            return (
              <AnimatedCard
                key={mod.name}
                delay={index * 0.04}
                className="group cursor-pointer select-none"
              >
                <button
                  className="w-full text-left"
                  onClick={() => setExpanded(isOpen ? null : mod.name)}
                  aria-expanded={isOpen}
                  aria-controls={`module-${index}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        {mod.icon}
                      </span>
                      <div>
                        <h3 className="font-heading font-semibold text-[var(--text)] group-hover:text-[var(--color-secondary)] transition-colors text-sm leading-tight">
                          {mod.name}
                        </h3>
                        <p className="text-[var(--text-muted)] text-xs mt-0.5">{mod.desc}</p>
                      </div>
                    </div>
                    <span
                      className="text-[var(--text-muted)] text-sm flex-shrink-0 mt-0.5 transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      ▾
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      id={`module-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-4 flex flex-col gap-1.5"
                    >
                      {mod.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                          <span className="text-[var(--color-success)] font-bold mt-0.5 flex-shrink-0">✓</span>
                          {f}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </AnimatedCard>
            );
          })}
        </div>

        <p className="text-center text-[var(--text-muted)] text-sm mt-8">
          Haz clic en cualquier módulo para ver sus funciones detalladas.
        </p>
      </div>
    </section>
  );
}
