"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const REACTIONS = [
  { key: "util",      icon: "👍", label: "Me sirvió" },
  { key: "aprendi",   icon: "💡", label: "Aprendí algo" },
  { key: "dudas",     icon: "🤔", label: "Me quedan dudas" },
] as const;

type ReactionKey = (typeof REACTIONS)[number]["key"];

const storageKey = (slug: string) => `pycore:blog-reaction:${slug}`;

/**
 * Reacción por artículo. Se guarda en el navegador del visitante (localStorage)
 * para no perder el estado al navegar; no se envía a ningún servidor.
 */
export function PostReactions({ slug }: { slug: string }) {
  const [selected, setSelected] = useState<ReactionKey | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey(slug));
      if (saved && REACTIONS.some((r) => r.key === saved)) {
        setSelected(saved as ReactionKey);
      }
    } catch {
      // localStorage bloqueado (modo privado): la reacción simplemente no persiste.
    }
  }, [slug]);

  function choose(key: ReactionKey) {
    const next = selected === key ? null : key;
    setSelected(next);
    try {
      if (next) window.localStorage.setItem(storageKey(slug), next);
      else       window.localStorage.removeItem(storageKey(slug));
    } catch {
      // Ídem: el estado sigue vivo en memoria durante la visita.
    }
  }

  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <p className="font-heading font-semibold text-[var(--text)] mb-1">
        ¿Te sirvió este artículo?
      </p>
      <p className="text-[var(--text-muted)] text-sm mb-5">
        Tu respuesta nos ayuda a decidir sobre qué escribir después.
      </p>

      <div className="flex items-center justify-center gap-2.5 flex-wrap">
        {REACTIONS.map((r) => {
          const active = selected === r.key;
          return (
            <motion.button
              key={r.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => choose(r.key)}
              aria-pressed={active}
              className="rounded-full px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                background:  active ? "var(--color-primary)" : "var(--bg)",
                border:      `1px solid ${active ? "var(--color-primary)" : "var(--border)"}`,
                color:       active ? "#FFFFFF" : "var(--text-muted)",
              }}
            >
              <span aria-hidden="true" className="mr-1.5">{r.icon}</span>
              {r.label}
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--color-primary)] text-sm font-medium mt-4"
        >
          {selected === "dudas"
            ? "Gracias. Si quieres resolverlas con alguien del equipo, agenda una demo abajo."
            : "¡Gracias por decirnos!"}
        </motion.p>
      )}
    </div>
  );
}
