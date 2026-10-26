"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { AltaProducto } from "@/components/demo/AltaProducto";
import { Mostrador } from "@/components/demo/Mostrador";
import { ElegirPlan } from "@/components/demo/ElegirPlan";
import type { CatalogoDemo, ProductoDemo } from "@/lib/demoMostrador";
import type { PlanTier } from "@/lib/constants";

/*
  Los tres pasos: compra tu plan, sube tu inventario, ponte a vender.

  Es el recorrido entero de un negocio que empieza, y está en un solo sitio a
  propósito — lo que se quiere enseñar no son tres pantallas sueltas, es que
  **lo que haces en un paso aparece en el siguiente**: el producto que das de
  alta en el dos se puede vender en el tres. Eso es lo que no puede enseñar
  un video.

  Los pasos son un `tablist`: una sola parada de tabulador y se cambian con
  las flechas. Tres pasos no deben costar tres tabulaciones.
*/

const PASOS = [
  { id: "plan", num: 1, titulo: "Compra tu plan", icono: "card", resumen: "Elige por dónde empiezas. Se cobra por sucursal y se cambia cuando quieras." },
  { id: "inventario", num: 2, titulo: "Sube tu inventario", icono: "box", resumen: "Da de alta un producto y mira qué hace el sistema cuando el dato está mal." },
  { id: "vender", num: 3, titulo: "Ponte a vender", icono: "store", resumen: "Cobra una venta de verdad, con lo que acabas de subir." },
] as const;

export function TresPasos({ catalogo }: { catalogo: CatalogoDemo }) {
  const [paso, setPaso] = useState(0);
  const [plan, setPlan] = useState<PlanTier | null>(null);
  const [agregados, setAgregados] = useState<ProductoDemo[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function porTeclado(e: React.KeyboardEvent) {
    const pasos: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const d = pasos[e.key];
    const destino =
      e.key === "Home" ? 0 : e.key === "End" ? PASOS.length - 1
        : d ? (paso + d + PASOS.length) % PASOS.length : null;
    if (destino === null) return;
    e.preventDefault();
    setPaso(destino);
    tabs.current[destino]?.focus();
  }

  const actual = PASOS[paso]!;

  return (
    <div>
      {/* ── Los tres pasos ───────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Los tres pasos para empezar"
        onKeyDown={porTeclado}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6"
      >
        {PASOS.map((p, i) => {
          const elegido = i === paso;
          const hecho = (i === 0 && plan) || (i === 1 && agregados.length > 0);
          return (
            <button
              key={p.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`paso-tab-${p.id}`}
              aria-selected={elegido}
              aria-controls={`paso-panel-${p.id}`}
              tabIndex={elegido ? 0 : -1}
              onClick={() => setPaso(i)}
              className="text-left rounded-card p-4 transition-colors"
              style={{
                background: elegido ? "var(--band)" : "var(--card)",
                border: `1px solid ${elegido ? "var(--band)" : "var(--border)"}`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold flex-shrink-0"
                  style={{
                    background: elegido ? "var(--band-eyebrow)" : hecho ? "var(--accent)" : "var(--chip)",
                    color: elegido ? "var(--band)" : hecho ? "var(--accent-fg)" : "var(--chip-ink)",
                  }}
                >
                  {hecho && !elegido ? <Icon name="check" size={14} strokeWidth={3} /> : p.num}
                </span>
                <span
                  className="font-heading font-semibold text-[15px] leading-tight"
                  style={{ color: elegido ? "var(--band-ink)" : "var(--text)" }}
                >
                  {p.titulo}
                </span>
              </div>
              <p
                className="text-xs mt-2 leading-relaxed"
                style={{ color: elegido ? "var(--band-ink-2)" : "var(--text-muted)" }}
              >
                {p.resumen}
              </p>
            </button>
          );
        })}
      </div>

      {/* ── El panel del paso ────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={actual.id}
          id={`paso-panel-${actual.id}`}
          role="tabpanel"
          aria-labelledby={`paso-tab-${actual.id}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.26 }}
        >
          {actual.id === "plan" && (
            <ElegirPlan elegido={plan} onElegir={(p) => { setPlan(p); setPaso(1); }} />
          )}

          {actual.id === "inventario" && (
            <AltaProducto
              catalogo={catalogo.productos}
              agregados={agregados}
              onAgregar={(p) => setAgregados((prev) => [p, ...prev])}
              onQuitar={(id) => setAgregados((prev) => prev.filter((x) => x.id !== id))}
            />
          )}

          {actual.id === "vender" && <Mostrador catalogo={catalogo} agregados={agregados} />}
        </motion.div>
      </AnimatePresence>

      {/* El paso siguiente, por si nadie pulsa las pestañas de arriba. */}
      {paso < PASOS.length - 1 && (
        <div className="flex justify-end mt-5">
          <button
            type="button"
            onClick={() => setPaso(paso + 1)}
            className="inline-flex items-center gap-2 rounded-btn px-4 py-2.5 text-sm font-semibold"
            style={{ background: "var(--btn2)", color: "var(--text-2)", border: "1px solid var(--btn2-border)" }}
          >
            {paso === 1 && agregados.length > 0
              ? `Vender lo que subí (${agregados.length})`
              : `Siguiente: ${PASOS[paso + 1]!.titulo.toLowerCase()}`}
            <Icon name="arrowRight" size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
