"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Revelar, TarjetaViva } from "@/components/ui/Revelar";
import { GIROS, NOTA_GIROS } from "@/lib/giros";

/*
  Los doce giros.

  La rejilla enseña los doce de un vistazo —el que entra busca el suyo, y si
  no lo ve en dos segundos se va—, y al elegir uno se abre su detalle debajo.
  Es una rejilla seleccionable, no un acordeón: con doce acordeones abiertos
  la página mide cuatro pantallas y ya nadie compara nada.

  Es un `radiogroup`, no `div`s con `onClick`: `aria-checked` dice cuál está
  elegido, y el borde de color no lo dice de ninguna forma.
*/

export function GirosSection() {
  const [activo, setActivo] = useState(GIROS[0]!.slug);
  const botones = useRef<(HTMLButtonElement | null)[]>([]);
  const giro = GIROS.find((g) => g.slug === activo) ?? GIROS[0]!;

  function porTeclado(e: React.KeyboardEvent, i: number) {
    const pasos: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const d = pasos[e.key];
    if (!d) return;
    e.preventDefault();
    const n = (i + d + GIROS.length) % GIROS.length;
    setActivo(GIROS[n]!.slug);
    botones.current[n]?.focus();
  }

  return (
    <section className="py-16" style={{ background: "var(--bg)" }} aria-labelledby="giros-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Revelar>
          <h2 id="giros-heading" className="sr-only">
            Giros de negocio
          </h2>
        </Revelar>

        <div
          role="radiogroup"
          aria-label="Elige tu giro"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2.5"
        >
          {GIROS.map((g, i) => {
            const elegido = g.slug === activo;
            return (
              <TarjetaViva key={g.slug} retardo={i * 0.03}>
                <button
                  ref={(el) => { botones.current[i] = el; }}
                  role="radio"
                  aria-checked={elegido}
                  tabIndex={elegido ? 0 : -1}
                  onClick={() => setActivo(g.slug)}
                  onKeyDown={(e) => porTeclado(e, i)}
                  className="relative w-full h-full text-left rounded-card p-3.5"
                  style={{
                    background: elegido ? "transparent" : "var(--card)",
                    border: `1px solid ${elegido ? "transparent" : "var(--border)"}`,
                  }}
                >
                  {elegido && (
                    <motion.span
                      layoutId="giro-pastilla"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-card"
                      style={{ background: "var(--tint)", border: "1px solid var(--accent)" }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span
                    className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg mb-2.5"
                    style={{
                      background: elegido ? "var(--accent)" : "var(--chip)",
                      color: elegido ? "var(--accent-fg)" : "var(--chip-ink)",
                    }}
                  >
                    <Icon name={g.icon} size={18} />
                  </span>
                  <span
                    className="relative block font-heading font-semibold text-[13px] leading-tight"
                    style={{ color: elegido ? "var(--accent-ink)" : "var(--text)" }}
                  >
                    {g.nombre}
                  </span>
                </button>
              </TarjetaViva>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={giro.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26 }}
            className="rounded-card-lg p-6 sm:p-8 mt-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] gap-8">
              <div>
                <p
                  className="text-xs font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "var(--warm-ink)" }}
                >
                  {giro.nombre}
                </p>
                <p
                  className="font-heading text-2xl lg:text-[28px] font-bold leading-[1.15] tracking-[-0.02em] mt-2.5"
                  style={{ color: "var(--text)" }}
                >
                  {giro.gancho}
                </p>
                <p className="text-base leading-relaxed mt-4 max-w-2xl" style={{ color: "var(--text-3)" }}>
                  {giro.detalle}
                </p>

                <ul className="flex flex-wrap gap-2 mt-5 list-none p-0">
                  {giro.claves.map((c) => (
                    <li
                      key={c}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-full"
                      style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-card p-5 self-start"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
              >
                <p className="text-xs font-semibold tracking-[0.1em] uppercase" style={{ color: "var(--text-muted)" }}>
                  Negocio de ejemplo
                </p>
                <p className="font-heading font-bold text-lg mt-1.5" style={{ color: "var(--text)" }}>
                  {giro.ejemplo}
                </p>
                <p className="text-xs mt-2.5 leading-relaxed" style={{ color: "var(--text-3)" }}>
                  {NOTA_GIROS}
                </p>
                <Link
                  href="/demo"
                  className="enlace-avanza inline-flex items-center gap-1.5 text-sm font-semibold mt-4"
                  style={{ color: "var(--accent-ink)" }}
                >
                  Probar el mostrador
                  <Icon name="arrowRight" size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <Revelar retardo={0.1}>
          <p className="text-sm mt-6" style={{ color: "var(--text-muted)" }}>
            ¿No está el tuyo? El sistema no se configura por giro: el giro decide qué se te
            enciende de salida, no qué puede hacer.{" "}
            <Link href="/#contacto" className="underline underline-offset-2 font-semibold" style={{ color: "var(--accent-ink)" }}>
              Cuéntanos cuál es
            </Link>
            .
          </p>
        </Revelar>
      </div>
    </section>
  );
}
