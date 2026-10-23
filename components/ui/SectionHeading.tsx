"use client";
import { motion } from "framer-motion";

/*
  Encabezado de sección. Gramática del brochure: cejilla en mayúsculas con
  tracking abierto, titular corto a dos líneas y una sola línea de apoyo.
  Sin píldoras ni emoji: la jerarquía la carga la tipografía.

  La cejilla alterna entre el cálido y el acento para que ninguna sección
  compita con la de al lado — por eso `tone`.
*/

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  id?: string;
  tone?: "warm" | "accent";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  tone = "accent",
  align = "left",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-3 mb-12 ${centered ? "items-center text-center" : ""} ${className}`}
    >
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold tracking-[0.16em]"
        style={{ color: tone === "warm" ? "var(--warm-ink)" : "var(--accent-ink)" }}
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="font-heading text-3xl lg:text-[38px] font-bold leading-[1.12] tracking-[-0.025em]"
        style={{ color: "var(--text)" }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className={`text-lg leading-relaxed ${centered ? "max-w-2xl" : "max-w-xl"}`}
          style={{ color: "var(--text-3)" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
