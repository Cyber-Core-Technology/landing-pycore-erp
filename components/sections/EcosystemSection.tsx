"use client";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const worlds = [
  {
    icon: "🖥️",
    title: "Plataforma Operativa",
    url: "plataforma.pycore.app",
    desc: "El panel de control interno del negocio. Aquí trabaja tu equipo: vendedores, administradores, gerentes y contadores.",
    features: [
      "Ventas y POS con modo offline",
      "Inventario y compras en tiempo real",
      "Finanzas, CxC, CxP y gastos",
      "Facturación CFDI integrada",
      "Recursos Humanos y asistencia",
    ],
    accent: "#0E7C66",
  },
  {
    icon: "🛍️",
    title: "Tienda en Línea",
    url: "plataforma.pycore.app/p/tu-negocio",
    desc: "Tu catálogo público conectado en tiempo real con tu inventario. Sin doble captura, sin desincronía de stock.",
    features: [
      "Catálogo con filtros por categoría",
      "Stock en tiempo real visible al cliente",
      "Checkout y pago con Mercado Pago",
      "Pedidos programados (panaderías, etc.)",
      "Seguimiento del pedido en tiempo real",
    ],
    accent: "#1BAE91",
  },
];

export function EcosystemSection() {
  return (
    <section className="py-20 bg-[var(--bg)]" aria-labelledby="ecosystem-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full px-4 py-1.5 text-[var(--color-secondary)] text-sm font-medium mb-4"
          >
            🌐 El ecosistema PyCore
          </motion.span>
          <h2
            id="ecosystem-heading"
            className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-4"
          >
            Un ecosistema, dos mundos conectados
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Cada negocio obtiene su propio ecosistema digital. La plataforma interna y la tienda pública, sincronizadas en tiempo real desde el mismo ERP.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {worlds.map((w, i) => (
            <AnimatedCard key={w.title} delay={i * 0.12}>
              <div
                style={{
                  borderTop: `3px solid ${w.accent}`,
                  margin: "-24px -24px 20px -24px",
                  padding: "20px 24px 0 24px",
                  borderRadius: "16px 16px 0 0",
                }}
              />
              <div className="text-4xl mb-3">{w.icon}</div>
              <h3 className="font-heading font-bold text-xl text-[var(--text)] mb-1">{w.title}</h3>
              <p
                className="font-mono text-sm mb-3"
                style={{ color: w.accent }}
              >
                {w.url}
              </p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5">{w.desc}</p>

              <ul className="flex flex-col gap-2">
                {w.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--text)]">
                    <span style={{ color: w.accent }} className="font-bold flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </AnimatedCard>
          ))}
        </div>

        {/* Principio fundamental */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 bg-[var(--border)]" />
          <p className="text-[var(--text-muted)] italic text-sm text-center max-w-md">
            🔗 El ERP es la única fuente de verdad. Todo parte de ahí.
          </p>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </motion.div>
      </div>
    </section>
  );
}
