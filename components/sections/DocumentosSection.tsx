"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { HojaPreview } from "@/components/ui/HojaPreview";
import { DOCUMENTOS, DOCUMENTO_INICIAL, DOCUMENTOS_INTOCABLES } from "@/lib/documentos";

/*
  Los documentos que el sistema entrega, con el archivo de verdad detrás del
  botón. Enseñar la hoja y no dejar bajarla es pedir que se confíe en una
  captura de pantalla; el PDF que se descarga es el que genera el ERP, con los
  mismos datos que pinta la vista previa.

  Elegir documento es un grupo de radios, no una lista de `div`s con
  `onClick`: `aria-checked` dice cuál está elegido y el borde de color no lo
  dice de ninguna forma. Se mueve con las flechas, como un `tablist`.
*/

export function DocumentosSection() {
  const [activo, setActivo] = useState(DOCUMENTO_INICIAL.slug);
  const doc = DOCUMENTOS.find((d) => d.slug === activo) ?? DOCUMENTO_INICIAL;

  function porTeclado(e: React.KeyboardEvent, i: number) {
    const teclas: Record<string, number> = {
      ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1,
    };
    const paso = teclas[e.key];
    if (!paso) return;
    e.preventDefault();
    const siguiente = DOCUMENTOS[(i + paso + DOCUMENTOS.length) % DOCUMENTOS.length];
    if (!siguiente) return;
    setActivo(siguiente.slug);
    document.getElementById(`doc-${siguiente.slug}`)?.focus();
  }

  return (
    <section
      id="documentos"
      className="py-20"
      style={{ background: "var(--bg)" }}
      aria-labelledby="documentos-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="documentos-heading"
          tone="warm"
          eyebrow="LOS PAPELES DEL NEGOCIO"
          title={<>Los documentos ya están hechos.<br />Míralos antes de decidir.</>}
          subtitle="Cada PDF de aquí abajo lo generó el sistema con datos de un abarrotes de demostración. Son los archivos de verdad: ábrelos, imprímelos, enséñaselos a tu contador."
        />

        <div className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-8 items-start">
          {/* ── El selector ─────────────────────────────────────────── */}
          <div
            role="radiogroup"
            aria-label="Documento de ejemplo"
            className="flex flex-col gap-2"
          >
            {DOCUMENTOS.map((d, i) => {
              const elegido = d.slug === activo;
              return (
                <button
                  key={d.slug}
                  id={`doc-${d.slug}`}
                  role="radio"
                  aria-checked={elegido}
                  tabIndex={elegido ? 0 : -1}
                  onClick={() => setActivo(d.slug)}
                  onKeyDown={(e) => porTeclado(e, i)}
                  className="text-left rounded-card p-4 transition-colors"
                  style={{
                    background: elegido ? "var(--tint)" : "var(--card)",
                    border: `1px solid ${elegido ? "var(--accent)" : "var(--border)"}`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                      style={{
                        background: elegido ? "var(--accent)" : "var(--chip)",
                        color: elegido ? "var(--accent-fg)" : "var(--chip-ink)",
                      }}
                    >
                      <Icon name={d.icon} size={18} />
                    </span>
                    <div className="min-w-0">
                      <p
                        className="font-heading font-semibold text-sm leading-tight"
                        style={{ color: elegido ? "var(--accent-ink)" : "var(--text)" }}
                      >
                        {d.nombre}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        {d.modulo}  ·  {d.formato}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Lo que no se toca, y por qué. */}
            <div
              className="rounded-card p-4 mt-2"
              style={{ background: "var(--warm-tint)", border: "1px solid var(--warm-tint-border)" }}
            >
              <p
                className="text-xs font-semibold tracking-[0.1em] uppercase mb-3"
                style={{ color: "var(--warm-ink)" }}
              >
                Y dos que no se diseñan
              </p>
              {DOCUMENTOS_INTOCABLES.map((d) => (
                <div key={d.nombre} className="flex items-start gap-2.5 mb-3 last:mb-0">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--warm-ink)" }}>
                    <Icon name={d.icon} size={14} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                      {d.nombre}
                    </p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {d.nota}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── La hoja ─────────────────────────────────────────────── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={doc.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,280px)] gap-6 items-start">
                  <HojaPreview doc={doc} />

                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.14em] uppercase"
                      style={{ color: "var(--accent-ink)" }}
                    >
                      {doc.modulo}
                    </p>
                    <h3
                      className="font-heading font-bold text-xl mt-2 leading-tight"
                      style={{ color: "var(--text)" }}
                    >
                      {doc.nombre}
                    </h3>
                    <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {doc.resumen}
                    </p>

                    <div
                      className="rounded-card p-3.5 mt-4"
                      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                    >
                      <p
                        className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-1.5"
                        style={{ color: "var(--warm-ink)" }}
                      >
                        Por qué es así
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>
                        {doc.porque}
                      </p>
                    </div>

                    <a
                      href={doc.archivo}
                      download
                      className="inline-flex items-center gap-2 rounded-btn px-4 py-2.5 mt-5 font-semibold text-sm transition-opacity hover:opacity-90"
                      style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
                    >
                      <Icon name="download" size={16} />
                      Descargar PDF
                    </a>
                    <p className="text-xs mt-2.5" style={{ color: "var(--text-muted)" }}>
                      {doc.formato}  ·  {doc.paginas}{" "}
                      {doc.paginas === 1 ? "página" : "páginas"}  ·  {doc.peso}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
