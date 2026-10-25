"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { MODULES } from "@/lib/constants";

export function ModulesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="funciones" className="py-20" style={{ background: "var(--card)" }} aria-labelledby="modules-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="modules-heading"
          eyebrow="MÓDULOS DEL SISTEMA"
          title={<>Todo conectado.<br />Todo bajo control.</>}
          subtitle="Once módulos integrados en un solo sistema. Activa los que necesitas y desactiva los que no, sin costos ocultos por funciones que no usas."
        />

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
                      <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                        style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                      >
                        <Icon name={mod.icon} size={20} />
                      </span>
                      <div>
                        <h3
                          className="font-heading font-semibold text-[15px] leading-tight"
                          style={{ color: "var(--text)" }}
                        >
                          {mod.name}
                        </h3>
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          {mod.desc}
                        </p>
                      </div>
                    </div>
                    <span
                      className="flex-shrink-0 mt-1.5 transition-transform duration-200"
                      style={{
                        color: "var(--text-muted)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <Icon name="chevronDown" size={16} />
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
                      className="overflow-hidden mt-4 flex flex-col gap-2"
                    >
                      {mod.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-xs"
                          style={{ color: "var(--text-3)" }}
                        >
                          <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-ink)" }}>
                            <Icon name="check" size={14} strokeWidth={2.4} />
                          </span>
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

        <p className="text-sm mt-8" style={{ color: "var(--text-muted)" }}>
          Haz clic en cualquier módulo para ver sus funciones detalladas.
        </p>
      </div>
    </section>
  );
}
