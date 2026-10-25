"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { CAPACIDADES } from "@/lib/capacidades";

/*
  Las capacidades que sólo se notan operando, en pestañas.

  Las pestañas son **una sola parada de tabulador** y se cambian con las
  flechas, como manda el patrón `tablist`: seis pestañas no deben costar seis
  tabulaciones a quien sólo quería llegar al contenido.
*/

export function CapacidadesSection() {
  const [activo, setActivo] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const grupo = CAPACIDADES[activo] ?? CAPACIDADES[0];
  if (!grupo) return null;

  function porTeclado(e: React.KeyboardEvent) {
    const pasos: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const paso = pasos[e.key];
    const destino =
      e.key === "Home" ? 0 : e.key === "End" ? CAPACIDADES.length - 1
        : paso ? (activo + paso + CAPACIDADES.length) % CAPACIDADES.length
        : null;
    if (destino === null) return;
    e.preventDefault();
    setActivo(destino);
    tabs.current[destino]?.focus();
  }

  return (
    <section
      id="capacidades"
      className="py-20"
      style={{ background: "var(--card)" }}
      aria-labelledby="capacidades-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="capacidades-heading"
          eyebrow="LO QUE SÓLO SE VE OPERANDO"
          title={<>Los detalles que deciden<br />si un sistema sirve o estorba</>}
          subtitle="Un folleto dice «control de inventario». Esto es lo que eso significa un martes a las dos de la tarde, con la fila esperando."
        />

        {/* ── Las pestañas ──────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Áreas del sistema"
          className="flex flex-wrap gap-2 mb-8"
          onKeyDown={porTeclado}
        >
          {CAPACIDADES.map((g, i) => {
            const elegida = i === activo;
            return (
              <button
                key={g.slug}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`cap-tab-${g.slug}`}
                aria-selected={elegida}
                aria-controls={`cap-panel-${g.slug}`}
                tabIndex={elegida ? 0 : -1}
                onClick={() => setActivo(i)}
                className="inline-flex items-center gap-2 rounded-btn px-4 py-2.5 text-sm font-semibold transition-colors"
                style={{
                  background: elegida ? "var(--accent)" : "var(--btn2)",
                  color: elegida ? "var(--accent-fg)" : "var(--text-2)",
                  border: `1px solid ${elegida ? "var(--accent)" : "var(--btn2-border)"}`,
                }}
              >
                <Icon name={g.icon} size={16} />
                {g.nombre}
              </button>
            );
          })}
        </div>

        {/* ── El panel ──────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={grupo.slug}
            id={`cap-panel-${grupo.slug}`}
            role="tabpanel"
            aria-labelledby={`cap-tab-${grupo.slug}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26 }}
          >
            <p
              className="text-lg leading-relaxed max-w-3xl mb-7"
              style={{ color: "var(--text-3)" }}
            >
              {grupo.resumen}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {grupo.items.map((c, i) => (
                <motion.div
                  key={c.titulo}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: 0.04 + i * 0.05 }}
                  className="rounded-card p-5"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-ink)" }}>
                      <Icon name="check" size={15} strokeWidth={2.4} />
                    </span>
                    <h3
                      className="font-heading font-semibold text-[15px] leading-snug"
                      style={{ color: "var(--text)" }}
                    >
                      {c.titulo}
                    </h3>
                  </div>
                  <p
                    className="text-sm mt-2.5 leading-relaxed"
                    style={{ color: "var(--text-3)" }}
                  >
                    {c.detalle}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
