"use client";
import { motion } from "framer-motion";

interface InsightBadgeProps {
  level: "urgent" | "warning" | "success" | "info";
  text: string;
  delay?: number;
  /** Forzar texto claro cuando la tarjeta vive sobre un fondo siempre oscuro */
  onDark?: boolean;
}

const levelStyles = {
  urgent:  { bg: "rgba(231,76,60,0.15)",   border: "#D9503F", dot: "#D9503F",   label: "Urgente"  },
  warning: { bg: "rgba(241,196,15,0.15)",  border: "#E0A32E", dot: "#E0A32E",   label: "Alerta"   },
  success: { bg: "rgba(39,176,127,0.15)",  border: "#27B07F", dot: "#27B07F",   label: "Positivo" },
  info:    { bg: "rgba(52,152,219,0.15)",  border: "#3498DB", dot: "#3498DB",   label: "Info"     },
};

export function InsightBadge({ level, text, delay = 0, onDark = false }: InsightBadgeProps) {
  const s = levelStyles[level];
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: "12px",
        padding: "10px 12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: onDark ? "#F2EEE6" : "var(--text, #F2EEE6)",
        fontSize: "clamp(11px, 3vw, 13px)",
      }}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: s.dot,
          flexShrink: 0,
        }}
      />
      <span style={{ flex: 1 }}>{text}</span>
      <span
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: s.dot,
          background: `${s.bg}`,
          border: `1px solid ${s.border}`,
          borderRadius: "20px",
          padding: "2px 8px",
        }}
      >
        {s.label}
      </span>
    </motion.div>
  );
}
