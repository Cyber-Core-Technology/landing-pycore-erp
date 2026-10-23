"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

/*
  Satélites del héroe: piezas que asoman por fuera del marco para romper el
  rectángulo. Cada uno pertenece a un paso y vive lo que vive su proceso: el
  insight de stock entra cuando la importación termina de contar, el ticket
  cuando la venta queda registrada, y los dos se van con su paso. La
  visibilidad la decide el mismo estado que la escena; aquí solo se declara
  con cuánto retardo entra, para no adelantarse a su momento.

  Son ilustración: van aria-hidden y no reciben foco. Y solo aparecen desde lg,
  porque por debajo de ese ancho no hay aire fuera del marco donde asomar.
*/

/* ── El ticket de 80 mm ──
   Campos y orden tomados del ticket real del sistema (printTicket.ts):
   insignia de folio, Fecha / Cajero / Sucursal, partidas, Subtotal,
   IVA (16%), TOTAL y el cierre. */

const TICKET_LINES = [
  { name: "Cereal",   qty: 1, total: "28.00" },
  { name: "Refresco", qty: 1, total: "22.00" },
  { name: "Galletas", qty: 1, total: "18.00" },
];

/** Borde dentado de papel cortado, generado para no depender de una imagen. */
const TEETH = 13;
const TORN_EDGE = (() => {
  const pts = ["0% 0%", "100% 0%"];
  for (let i = TEETH; i >= 0; i--) {
    const x = ((i / TEETH) * 100).toFixed(2);
    pts.push(`${x}% ${i % 2 === 0 ? "100%" : "calc(100% - 6px)"}`);
  }
  return `polygon(${pts.join(", ")})`;
})();

export function TicketSatellite({
  visible,
  reduced,
  delay = 0,
}: {
  visible: boolean;
  reduced: boolean;
  delay?: number;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="hidden lg:block absolute z-20 -left-8 xl:-left-14 bottom-6 w-[172px] font-mono pointer-events-none"
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, y: -28, rotate: -14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotate: -5, scale: 1 }}
          exit={{ opacity: 0, y: 22, rotate: -11, scale: 0.94, transition: { duration: 0.28, ease: "easeIn" } }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 260, damping: 22, mass: 0.9, delay }
          }
          style={{
            background: "var(--card)",
            clipPath: TORN_EDGE,
            boxShadow: "0 16px 34px rgba(28, 26, 23, 0.20)",
          }}
        >
          <div className="px-3 pt-3 pb-5 flex flex-col gap-2">
            <div className="text-center flex flex-col gap-1">
              <span
                className="font-heading font-bold text-[11px] tracking-[0.06em]"
                style={{ color: "var(--text)" }}
              >
                PYCORE SGC
              </span>
              <span
                className="self-center text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
              >
                # F-000125
              </span>
            </div>

            <div className="flex flex-col gap-0.5 text-[8px]" style={{ color: "var(--text-muted)" }}>
              <div className="flex justify-between gap-2">
                <span>Fecha</span>
                <span style={{ color: "var(--text-2)" }}>23/10/26 10:24</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Cajero</span>
                <span style={{ color: "var(--text-2)" }}>María G.</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Sucursal</span>
                <span style={{ color: "var(--text-2)" }}>Centro</span>
              </div>
            </div>

            <div style={{ borderTop: "1px dashed var(--btn2-border)" }} />

            <div className="flex flex-col gap-1 text-[9px]" style={{ color: "var(--text-2)" }}>
              {TICKET_LINES.map((l) => (
                <div key={l.name} className="flex justify-between gap-2">
                  <span>
                    {l.qty} {l.name}
                  </span>
                  <span className="tabular-nums">${l.total}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px dashed var(--btn2-border)" }} />

            <div className="flex flex-col gap-0.5 text-[9px]" style={{ color: "var(--text-muted)" }}>
              <div className="flex justify-between gap-2">
                <span>Subtotal</span>
                <span className="tabular-nums">$58.62</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>IVA (16%)</span>
                <span className="tabular-nums">$9.38</span>
              </div>
            </div>

            <div
              className="flex justify-between items-baseline gap-2 pt-1"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span className="text-[9px] font-bold" style={{ color: "var(--text)" }}>
                TOTAL
              </span>
              <span
                className="font-heading font-bold text-[14px] tabular-nums"
                style={{ color: "var(--text)" }}
              >
                $68.00
              </span>
            </div>

            <span className="text-[8px] text-center" style={{ color: "var(--text-muted)" }}>
              Efectivo · ¡Gracias por su compra!
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── El insight de TEZCA ──
   Clasificación real del sistema: origen `observador`, tipo `alerta`,
   nivel `warning`, y una de las cinco métricas que TezcaRegla puede vigilar
   (aquí, stock crítico). */

export function InsightSatellite({
  visible,
  reduced,
  delay = 0,
}: {
  visible: boolean;
  reduced: boolean;
  delay?: number;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="hidden lg:block absolute z-20 -right-6 xl:-right-12 top-20 w-[206px] rounded-card p-3 pointer-events-none"
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, x: 24, rotate: 8, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, rotate: 3, scale: 1 }}
          exit={{ opacity: 0, x: 26, scale: 0.94, transition: { duration: 0.28, ease: "easeIn" } }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 280, damping: 24, mass: 0.8, delay }
          }
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "0 16px 34px rgba(28, 26, 23, 0.16)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--warm-tint)", color: "var(--warm-ink)" }}
            >
              <Icon name="bulb" size={13} />
            </span>
            <span
              className="text-[9px] font-semibold tracking-[0.1em]"
              style={{ color: "var(--text-muted)" }}
            >
              TEZCA · OBSERVADOR
            </span>
            {/* El punto late: el observador sigue corriendo */}
            <motion.span
              className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "var(--color-warning)" }}
              animate={reduced ? {} : { opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
              transition={reduced ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <p
            className="font-heading font-semibold text-[12px] leading-tight mb-1"
            style={{ color: "var(--text)" }}
          >
            Stock crítico
          </p>
          <p className="text-[10px] leading-snug mb-2.5" style={{ color: "var(--text-3)" }}>
            3 productos de Abarrotes bajaron de su mínimo. Pedido sugerido: 48 piezas.
          </p>

          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[9px] font-bold tracking-[0.06em] px-2 py-0.5 rounded-full"
              style={{ background: "var(--warm-tint)", color: "var(--warm-ink)" }}
            >
              ALERTA
            </span>
            <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>
              hace 2 min
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
