"use client";
import { motion } from "framer-motion";
import { useContador } from "@/hooks/useContador";

// Franja de cifras del brochure: número y etiqueta, sin icono que compita.
const stats = [
  { value: 11,  suffix: "",   label: "módulos integrados" },
  { value: 100, suffix: "%",  label: "mexicano y en la nube" },
  { value: 4,   suffix: "",   label: "planes para cada etapa" },
  { value: 24,  suffix: "/7", label: "sistema en tiempo real" },
];

function Cifra({ value, suffix }: { value: number; suffix: string }) {
  const { ref, valor } = useContador(value);

  return (
    <div
      className="font-heading font-bold text-[42px] leading-none tracking-[-0.03em] tabular-nums"
      style={{ color: "var(--accent-ink)" }}
    >
      {/*
        El valor final va en el DOM desde el primer pintado (`aria-label` sobre
        el grupo) y lo que cuenta es el texto de dentro: a un lector no se le
        lee «uno, dos, siete, trece…», se le lee el número.
      */}
      <span ref={ref} aria-hidden="true">
        {valor}
      </span>
      <span className="text-2xl" aria-hidden="true">
        {suffix}
      </span>
    </div>
  );
}

export function StatsSection() {
  return (
    <section
      className="py-14"
      style={{
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col gap-1"
            >
              <p className="sr-only">{`${s.value}${s.suffix} ${s.label}`}</p>
              <Cifra value={s.value} suffix={s.suffix} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }} aria-hidden="true">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
