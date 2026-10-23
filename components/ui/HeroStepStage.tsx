"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

/*
  Escenario animado del héroe. Todo vive en un solo marco: las tres pestañas
  arriba y, debajo, el paso en curso contado en dos tiempos — una portada que
  lo anuncia y el proceso en marcha.

  El área de la escena es una ilustración, no una interfaz: va marcada
  aria-hidden y nada de su interior recibe foco. Las pestañas sí son botones
  reales, por eso el marco entero no puede ir oculto al lector de pantalla.

  Las tres escenas comparten alto exacto (SCENE_H) y reparten su contenido con
  justify-between, así el relevo nunca mueve el layout.
*/

export type Phase = "title" | "scene";

type SceneProps = { reduced: boolean };

const SCENE_H = 300;

export const STEPS = [
  { title: "Compra tu plan",     detail: "Pago en línea, sin contratos de permanencia." },
  { title: "Sube tu inventario", detail: "Arrastra tu hoja de cálculo y queda cargado." },
  { title: "Ponte a vender",     detail: "Cobra, factura y actualiza stock al instante." },
];

const PLANS = ["Básico", "Profesional", "Empresarial", "Elite"];
const CHOSEN = 2;   // Empresarial

const PRODUCTS = [
  { name: "Café Molido",      size: "500 g", price: "$78.00" },
  { name: "Aceite de Cocina", size: "1 L",   price: "$42.00" },
];

const TICKET = [
  { name: "Cereal",   qty: "1 pza", price: 28 },
  { name: "Refresco", qty: "1 pza", price: 22 },
  { name: "Galletas", qty: "1 pza", price: 18 },
];

/* ── Utilidades de movimiento ── */

const SPRING = { type: "spring" as const, stiffness: 420, damping: 26, mass: 0.7 };

function useMotion(reduced: boolean) {
  return {
    from: (v: Record<string, number | string>) => (reduced ? false : v),
    /** Entrada con resorte: rebasa un poco y se asienta. */
    spring: (delay = 0) => (reduced ? { duration: 0 } : { ...SPRING, delay }),
    at: (duration: number, delay = 0) =>
      reduced ? { duration: 0, delay: 0 } : { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/** Cifra que sube hasta su valor. Se reinicia con la escena. */
function useCountUp(to: number, duration: number, delay: number, reduced: boolean) {
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    let startedAt = 0;
    const step = (t: number) => {
      if (!startedAt) startedAt = t;
      const p = Math.min((t - startedAt) / (duration * 1000), 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const id = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay * 1000);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [to, duration, delay, reduced]);

  return value;
}

/** Cursor de mentira que recorre la escena y "hace clic". */
function Cursor({
  path,
  reduced,
}: {
  path: { left: string[]; top: string[]; times: number[]; duration: number };
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <motion.span
      className="absolute z-20 pointer-events-none"
      style={{ color: "var(--text)", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}
      initial={{ left: path.left[0], top: path.top[0], opacity: 0, scale: 0.8 }}
      animate={{
        left: path.left,
        top: path.top,
        opacity: [0, 1, 1, 1, 0],
        scale: [0.8, 1, 0.82, 1, 1],
      }}
      transition={{ duration: path.duration, times: path.times, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <Icon name="cursor" size={15} strokeWidth={1.6} />
    </motion.span>
  );
}

/** Onda que sale del elemento al ser "pulsado". */
function Ripple({ delay, reduced }: { delay: number; reduced: boolean }) {
  if (reduced) return null;
  return (
    <motion.span
      className="absolute inset-0 rounded-btn pointer-events-none"
      style={{ border: "2px solid var(--accent)" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: [0, 0.75, 0], scale: [0.9, 1.25, 1.4] }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
}

const label = "text-[10px] font-semibold tracking-[0.1em]";
const row = "flex items-center gap-2.5 rounded-lg px-3 py-1.5";
const rowStyle = { background: "var(--surface-2)", border: "1px solid var(--border)" };

/* ─────────────────────── Portada del paso ─────────────────────── */

function TitleCard({ step, reduced }: { step: number; reduced: boolean }) {
  const m = useMotion(reduced);
  const s = STEPS[step];

  return (
    <div className="flex flex-col items-center justify-center text-center h-full gap-2.5 px-4">
      <motion.span
        className="relative w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-[22px] tabular-nums"
        style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
        initial={m.from({ scale: 0.3, rotate: -25, opacity: 0 })}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={m.spring()}
      >
        {step + 1}
        {/* Anillo que se expande al aparecer el número */}
        {!reduced && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid var(--accent)" }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          />
        )}
      </motion.span>

      <motion.span
        className={label}
        style={{ color: "var(--warm-ink)" }}
        initial={m.from({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={m.at(0.3, 0.18)}
      >
        PASO {step + 1} DE {STEPS.length}
      </motion.span>

      <motion.h3
        className="font-heading font-bold text-[27px] leading-[1.08] tracking-[-0.02em]"
        style={{ color: "var(--text)" }}
        initial={m.from({ opacity: 0, y: 16 })}
        animate={{ opacity: 1, y: 0 }}
        transition={m.spring(0.12)}
      >
        {s?.title}
      </motion.h3>

      <motion.p
        className="text-[13px] leading-snug max-w-[260px]"
        style={{ color: "var(--text-muted)" }}
        initial={m.from({ opacity: 0, y: 12 })}
        animate={{ opacity: 1, y: 0 }}
        transition={m.spring(0.2)}
      >
        {s?.detail}
      </motion.p>
    </div>
  );
}

/* ───────────────────────── 1 · Compra tu plan ───────────────────────── */

function PlanScene({ reduced }: SceneProps) {
  const m = useMotion(reduced);

  return (
    <div className="relative flex flex-col justify-between h-full">
      <Cursor
        reduced={reduced}
        path={{
          left: ["62%", "22%", "22%", "48%", "48%"],
          top: ["78%", "40%", "40%", "84%", "84%"],
          times: [0, 0.22, 0.4, 0.62, 1],
          duration: 2.6,
        }}
      />

      <div className="flex items-center justify-between">
        <span className={label} style={{ color: "var(--text-muted)" }}>
          PAGO EN LÍNEA
        </span>
        <span
          className="inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
        >
          <Icon name="lock" size={10} strokeWidth={2.2} />
          100% SEGURO
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {PLANS.map((plan, i) => {
          const picked = i === CHOSEN;
          return (
            <motion.div
              key={plan}
              className={`relative ${row}`}
              style={rowStyle}
              initial={m.from({ opacity: 0, x: -14 })}
              animate={
                picked && !reduced
                  ? { opacity: 1, x: 0, y: [0, 0, -2, 0], scale: [1, 1, 1.025, 1.015] }
                  : { opacity: 1, x: 0 }
              }
              transition={
                picked && !reduced
                  ? { ...SPRING, delay: 0.05 * i, y: { duration: 0.5, delay: 0.62, times: [0, 0.2, 0.5, 1] }, scale: { duration: 0.5, delay: 0.62, times: [0, 0.2, 0.5, 1] } }
                  : m.spring(0.05 * i)
              }
            >
              <motion.span
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: "2px solid var(--btn2-border)" }}
                animate={picked ? { borderColor: "var(--accent)" } : {}}
                transition={m.at(0.2, 0.62)}
              >
                {picked && (
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                    initial={m.from({ scale: 0 })}
                    animate={{ scale: 1 }}
                    transition={m.spring(0.66)}
                  />
                )}
              </motion.span>
              <span className="text-[12px] font-medium" style={{ color: "var(--text)" }}>
                {plan}
              </span>
              {picked && (
                <motion.span
                  className="ml-auto text-[9px] font-bold tracking-[0.06em] px-1.5 py-0.5 rounded-full"
                  style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                  initial={m.from({ opacity: 0, scale: 0.6 })}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={m.spring(0.78)}
                >
                  ELEGIDO
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-lg p-2.5 flex flex-col gap-2" style={rowStyle}>
        <div className="flex items-center justify-between">
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            Plan seleccionado
          </span>
          <motion.span
            className="text-[12px] font-semibold"
            style={{ color: "var(--text)" }}
            initial={m.from({ opacity: 0, y: 8 })}
            animate={{ opacity: 1, y: 0 }}
            transition={m.spring(0.85)}
          >
            {PLANS[CHOSEN]}
          </motion.span>
        </div>

        <div className="relative">
          <motion.div
            className="rounded-btn py-2.5 text-center text-[12px] font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
            animate={reduced ? {} : { scale: [1, 1, 0.95, 1.02, 1] }}
            transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 1.5, times: [0, 0.3, 0.5, 0.75, 1] }}
          >
            Pagar ahora
          </motion.div>
          <Ripple delay={1.62} reduced={reduced} />
        </div>

        <motion.div
          className="flex items-center gap-1.5 text-[11px] font-semibold"
          style={{ color: "var(--accent-ink)" }}
          initial={m.from({ opacity: 0, x: -10 })}
          animate={{ opacity: 1, x: 0 }}
          transition={m.spring(2.05)}
        >
          <motion.span
            initial={m.from({ scale: 0 })}
            animate={{ scale: 1 }}
            transition={m.spring(2.15)}
          >
            <Icon name="check" size={13} strokeWidth={2.6} />
          </motion.span>
          Pago aprobado
        </motion.div>
      </div>
    </div>
  );
}

/* ──────────────────── 2 · Sube tu inventario ──────────────────── */

function ImportScene({ reduced }: SceneProps) {
  const m = useMotion(reduced);
  const imported = useCountUp(248, 1.2, 1.05, reduced);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-between gap-2">
        <span className={label} style={{ color: "var(--text-muted)" }}>
          IMPORTAR INVENTARIO
        </span>
      </div>

      {/* Dos caminos: la hoja de cálculo y la base de tu sistema actual */}
      <div className="grid grid-cols-2 gap-1.5">
        <motion.div
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
          style={{ background: "var(--tint)", border: "1px solid var(--accent)" }}
          initial={m.from({ opacity: 0, y: -8 })}
          animate={{ opacity: 1, y: 0 }}
          transition={m.spring(0)}
        >
          <span style={{ color: "var(--accent-ink)" }}>
            <Icon name="sheet" size={13} />
          </span>
          <span className="text-[10px] font-semibold" style={{ color: "var(--accent-ink)" }}>
            Excel o CSV
          </span>
        </motion.div>
        <motion.div
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          initial={m.from({ opacity: 0, y: -8 })}
          animate={{ opacity: 1, y: 0 }}
          transition={m.spring(0.08)}
        >
          <span style={{ color: "var(--text-muted)" }}>
            <Icon name="database" size={13} />
          </span>
          <span className="text-[10px] font-semibold" style={{ color: "var(--text-2)" }}>
            Eleventa
          </span>
        </motion.div>
      </div>

      {/* La hoja entra desde fuera del marco, se bambolea y aterriza */}
      <motion.div
        className="relative rounded-lg flex flex-col items-center justify-center gap-1.5 py-3"
        style={{ border: "2px dashed var(--btn2-border)" }}
        animate={
          reduced
            ? { background: "var(--tint)", borderColor: "var(--accent)", scale: 1 }
            : {
                background: ["transparent", "transparent", "var(--tint)"],
                borderColor: ["var(--btn2-border)", "var(--btn2-border)", "var(--accent)"],
                scale: [1, 1, 1.03, 1],
              }
        }
        transition={reduced ? { duration: 0 } : { duration: 1.3, times: [0, 0.62, 0.78, 1] }}
      >
        <motion.div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          initial={m.from({ x: -96, y: -76, rotate: -14, opacity: 0 })}
          animate={
            reduced
              ? { x: 0, y: 0, rotate: 0, opacity: 1 }
              : {
                  x: [-96, -30, 0, 0],
                  y: [-76, -24, 2, 0],
                  rotate: [-14, -6, 3, 0],
                  opacity: [0, 1, 1, 1],
                  boxShadow: [
                    "0 16px 28px rgba(28,26,23,0.20)",
                    "0 10px 20px rgba(28,26,23,0.16)",
                    "0 2px 6px rgba(28,26,23,0.08)",
                    "0 1px 2px rgba(28,26,23,0.05)",
                  ],
                }
          }
          transition={reduced ? { duration: 0 } : { duration: 1, delay: 0.05, times: [0, 0.5, 0.82, 1], ease: "easeInOut" }}
        >
          <span style={{ color: "var(--accent-ink)" }}>
            <Icon name="sheet" size={17} />
          </span>
          <span className="flex flex-col">
            <span className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>
              productos.xlsx
            </span>
            <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>
              248 filas
            </span>
          </span>
        </motion.div>

        <motion.span
          className="text-[10px]"
          style={{ color: "var(--accent-ink)" }}
          initial={m.from({ opacity: 0, y: 6 })}
          animate={{ opacity: 1, y: 0 }}
          transition={m.spring(0.9)}
        >
          Suelta tu hoja de cálculo aquí
        </motion.span>
      </motion.div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
          <span>Importando productos</span>
          <span className="font-semibold tabular-nums" style={{ color: "var(--accent-ink)" }}>
            {imported} / 248
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--chip)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--accent)" }}
            initial={m.from({ width: "0%" })}
            animate={{ width: "100%" }}
            transition={m.at(1.2, 1.05)}
          />
        </div>
      </div>

      {/* Los productos aterrizan en el catálogo */}
      <div className="flex flex-col gap-1.5">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.name}
            className={row}
            style={rowStyle}
            initial={m.from({ opacity: 0, y: 14, scale: 0.96 })}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={m.spring(2.15 + i * 0.12)}
          >
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
            >
              <Icon name="box" size={12} />
            </span>
            <span className="text-[11px] font-medium" style={{ color: "var(--text)" }}>
              {p.name}
            </span>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              {p.size}
            </span>
            <span className="ml-auto text-[11px] font-semibold tabular-nums" style={{ color: "var(--text)" }}>
              {p.price}
            </span>
          </motion.div>
        ))}
        <motion.span
          className="text-[10px] font-semibold"
          style={{ color: "var(--accent-ink)" }}
          initial={m.from({ opacity: 0 })}
          animate={{ opacity: 1 }}
          transition={m.at(0.3, 2.45)}
        >
          + 246 productos más · migración sin recapturar
        </motion.span>
      </div>
    </div>
  );
}

/* ─────────────────────── 3 · Ponte a vender ─────────────────────── */

function SaleScene({ reduced }: SceneProps) {
  const m = useMotion(reduced);
  const total = TICKET.reduce((s, t) => s + t.price, 0);
  const shown = useCountUp(total, 0.9, 1.15, reduced);

  return (
    <div className="relative flex flex-col justify-between h-full">
      <Cursor
        reduced={reduced}
        path={{
          left: ["70%", "70%", "48%", "48%", "48%"],
          top: ["40%", "40%", "86%", "86%", "86%"],
          times: [0, 0.4, 0.62, 0.8, 1],
          duration: 2.8,
        }}
      />

      <div className="flex items-center justify-between">
        <span className={label} style={{ color: "var(--text-muted)" }}>
          TICKET DE VENTA
        </span>
        <span className="text-[10px] tabular-nums" style={{ color: "var(--text-muted)" }}>
          #C-00125
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {TICKET.map((t, i) => (
          <motion.div
            key={t.name}
            className={row}
            style={rowStyle}
            initial={m.from({ opacity: 0, x: 40, rotate: 2 })}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={m.spring(0.15 + i * 0.3)}
          >
            <motion.span
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
              initial={m.from({ scale: 0.4 })}
              animate={{ scale: 1 }}
              transition={m.spring(0.22 + i * 0.3)}
            >
              <Icon name="cart" size={12} />
            </motion.span>
            <span className="text-[12px] font-medium" style={{ color: "var(--text)" }}>
              {t.name}
            </span>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              {t.qty}
            </span>
            <span className="ml-auto text-[12px] font-semibold tabular-nums" style={{ color: "var(--text)" }}>
              ${t.price}.00
            </span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-lg p-2.5 flex flex-col gap-2" style={rowStyle}>
        <div className="flex items-end justify-between">
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            Total
          </span>
          <motion.span
            className="font-heading font-bold text-[23px] leading-none tabular-nums"
            style={{ color: "var(--text)" }}
            initial={m.from({ opacity: 0, scale: 0.85 })}
            animate={{ opacity: 1, scale: 1 }}
            transition={m.spring(1.1)}
          >
            ${shown}.00
          </motion.span>
        </div>

        <div className="relative">
          <motion.div
            className="rounded-btn py-2.5 text-center text-[12px] font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
            animate={reduced ? {} : { scale: [1, 1, 0.95, 1.02, 1] }}
            transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 1.7, times: [0, 0.3, 0.5, 0.75, 1] }}
          >
            Cobrar
          </motion.div>
          <Ripple delay={1.82} reduced={reduced} />
        </div>

        <motion.div
          className="flex items-center gap-1.5 text-[11px] font-semibold"
          style={{ color: "var(--accent-ink)" }}
          initial={m.from({ opacity: 0, x: -10 })}
          animate={{ opacity: 1, x: 0 }}
          transition={m.spring(2.2)}
        >
          <motion.span
            initial={m.from({ scale: 0 })}
            animate={{ scale: 1 }}
            transition={m.spring(2.3)}
          >
            <Icon name="check" size={13} strokeWidth={2.6} />
          </motion.span>
          Venta registrada · inventario actualizado
        </motion.div>
      </div>
    </div>
  );
}

/* ────────────────────────── El marco ────────────────────────── */

const SCENES = [PlanScene, ImportScene, SaleScene];

export function HeroStepStage({
  step,
  phase,
  reduced,
  onPick,
  stepMs,
  paused,
  cycle,
}: {
  step: number;
  phase: Phase;
  reduced: boolean;
  onPick: (i: number) => void;
  stepMs: number;
  paused: boolean;
  cycle: number;
}) {
  const Scene = SCENES[step] ?? PlanScene;

  return (
    <div
      className="w-full max-w-[460px] rounded-card-lg overflow-hidden shadow-card-lg"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* Barra de la ventana */}
      <div
        className="flex items-center gap-2 px-3.5 py-2.5"
        style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}
      >
        <span
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background: "var(--brand)", color: "var(--brand-fg)" }}
        >
          <Icon name="layers" size={12} strokeWidth={2} />
        </span>
        <span className="font-heading font-semibold text-[12px]" style={{ color: "var(--text)" }}>
          PyCore SGC
        </span>
        {/* Las cifras son de demostración y conviene decirlo. */}
        <span
          className="ml-auto text-[9px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: "var(--chip)", color: "var(--chip-ink)" }}
        >
          Ejemplo ilustrativo
        </span>
      </div>

      {/* Las tres pestañas, dentro del mismo marco que el proceso */}
      <ol
        className="grid grid-cols-3 gap-1.5 p-2 items-stretch list-none"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {STEPS.map((s, i) => {
          const active = i === step;
          return (
            <li key={s.title} className="flex">
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-current={active ? "step" : undefined}
                className="w-full flex flex-col items-center gap-1 rounded-lg px-1.5 pt-1.5 pb-1 transition-colors"
                style={{
                  background: active ? "var(--tint)" : "transparent",
                  border: `1px solid ${active ? "var(--accent)" : "transparent"}`,
                }}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold tabular-nums transition-colors"
                    style={{
                      background: active ? "var(--accent)" : "var(--chip)",
                      color: active ? "var(--accent-fg)" : "var(--chip-ink)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="font-heading font-semibold text-[10px] leading-tight text-left"
                    style={{ color: active ? "var(--accent-ink)" : "var(--text-2)" }}
                  >
                    {s.title}
                  </span>
                </span>
                {/* Cuánto falta para el siguiente paso */}
                <span
                  className="w-full h-[3px] rounded-full overflow-hidden mt-auto"
                  style={{ background: active ? "var(--warm-tint-border)" : "transparent" }}
                >
                  {active && !reduced && (
                    <motion.span
                      key={`${step}-${cycle}-${paused}`}
                      className="block h-full rounded-full"
                      style={{ background: "var(--accent)" }}
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? "0%" : "100%" }}
                      transition={{ duration: paused ? 0 : stepMs / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Portada y proceso: alto exacto e idéntico en los tres pasos */}
      <div className="p-3.5" style={{ height: SCENE_H }} aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${step}-${phase}`}
            className="w-full h-full"
            initial={
              reduced
                ? false
                : phase === "title"
                  ? { opacity: 0, scale: 0.96 }
                  : { opacity: 0, x: 28 }
            }
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, x: -24, scale: 0.98 }}
            transition={reduced ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {phase === "title" ? <TitleCard step={step} reduced={reduced} /> : <Scene reduced={reduced} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
