"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { PREGUNTAS, SALUDO, type Contexto } from "@/lib/demoTezca";

/*
  TEZCA en el demo.

  **Guionizado, y se dice en pantalla.** Un asistente de verdad en una página
  pública es un gasto por visitante sin techo; lo que sí es verdad aquí es la
  forma: responde sobre lo que hay en la pantalla —si llevas dos refrescos,
  dice dos refrescos— y cada respuesta trae su acción.

  La espera antes de contestar es deliberada y corta: sin ella la respuesta
  aparece antes de que termine de pulsarse el botón y no se lee como una
  respuesta, se lee como un texto que ya estaba ahí.
*/

type Mensaje = { de: "tezca" | "yo"; texto: string; accion?: string };

export function TezcaDemo({ contexto }: { contexto: Contexto }) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([{ de: "tezca", texto: SALUDO }]);
  const [pensando, setPensando] = useState(false);
  const hilo = useRef<HTMLDivElement>(null);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Un temporizador que sobreviva al desmontaje deja a React escribiendo en
  // un componente que ya no está.
  useEffect(() => () => { if (temporizador.current) clearTimeout(temporizador.current); }, []);

  useEffect(() => {
    hilo.current?.scrollTo({ top: hilo.current.scrollHeight, behavior: "smooth" });
  }, [mensajes, pensando]);

  function preguntar(id: string) {
    const p = PREGUNTAS.find((x) => x.id === id);
    if (!p || pensando) return;
    setMensajes((m) => [...m, { de: "yo", texto: p.texto }]);
    setPensando(true);
    temporizador.current = setTimeout(() => {
      const r = p.responder(contexto);
      setMensajes((m) => [...m, { de: "tezca", texto: r.texto, accion: r.accion }]);
      setPensando(false);
    }, 650);
  }

  return (
    <div
      className="rounded-card overflow-hidden"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div
        className="px-4 py-3 flex items-center gap-2.5"
        style={{ background: "var(--band)" }}
      >
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
          style={{ background: "var(--band-tile)", color: "var(--band-eyebrow)" }}
        >
          <Icon name="robot" size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-heading font-semibold text-sm" style={{ color: "var(--band-ink)" }}>
            TEZCA
          </p>
          <p className="text-[11px]" style={{ color: "var(--band-ink-2)" }}>
            Respuestas guionizadas para este demo
          </p>
        </div>
      </div>

      <div
        ref={hilo}
        className="px-4 py-3 flex flex-col gap-2.5 overflow-y-auto"
        style={{ maxHeight: 260 }}
        aria-live="polite"
        aria-label="Conversación con TEZCA"
      >
        <AnimatePresence initial={false}>
          {mensajes.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={m.de === "yo" ? "self-end max-w-[85%]" : "max-w-[92%]"}
            >
              <div
                className="rounded-card px-3 py-2"
                style={{
                  background: m.de === "yo" ? "var(--accent)" : "var(--bg)",
                  color: m.de === "yo" ? "var(--accent-fg)" : "var(--text-2)",
                  border: m.de === "yo" ? "none" : "1px solid var(--border)",
                }}
              >
                <p className="text-[13px] leading-relaxed">{m.texto}</p>
                {m.accion && (
                  <p className="text-[11px] font-semibold mt-1.5" style={{ color: "var(--accent-ink)" }}>
                    {m.accion}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {pensando && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 px-3 py-2"
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--text-muted)" }}
              />
            ))}
          </motion.div>
        )}
      </div>

      <div className="px-4 pb-4 pt-1 flex flex-wrap gap-1.5">
        {PREGUNTAS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => preguntar(p.id)}
            disabled={pensando}
            className="text-[11px] px-2.5 py-1.5 rounded-full font-semibold transition-opacity disabled:opacity-40"
            style={{ background: "var(--chip)", color: "var(--chip-ink)" }}
          >
            {p.texto}
          </button>
        ))}
      </div>
    </div>
  );
}
