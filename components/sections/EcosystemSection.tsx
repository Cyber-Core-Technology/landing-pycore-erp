"use client";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

const worlds = [
  {
    icon: "monitor",
    title: "Plataforma operativa",
    url: "plataforma.pycore.app",
    desc: "El panel de control interno del negocio. Aquí trabaja tu equipo: vendedores, administradores, gerentes y contadores.",
    features: [
      "Ventas y POS con modo offline",
      "Inventario y compras en tiempo real",
      "Finanzas, CxC, CxP y gastos",
      "Recursos Humanos y asistencia",
    ],
  },
  {
    icon: "bag",
    title: "Tienda en línea",
    url: "pycore.app/p/tu-negocio",
    desc: "Tu catálogo público conectado en tiempo real con tu inventario. Sin doble captura, sin desincronía de stock.",
    features: [
      "Catálogo con filtros por categoría",
      "Stock en tiempo real visible al cliente",
      "Checkout y pago con Mercado Pago",
      "Pedidos programados (panaderías, etc.)",
      "Seguimiento del pedido en tiempo real",
    ],
  },
];

export function EcosystemSection() {
  return (
    <section className="py-20" style={{ background: "var(--bg)" }} aria-labelledby="ecosystem-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="ecosystem-heading"
          eyebrow="EL ECOSISTEMA PYCORE"
          title={<>Un ecosistema,<br />dos mundos conectados</>}
          subtitle="La plataforma interna y la tienda pública, sincronizadas en tiempo real desde el mismo ERP."
        />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {worlds.map((w, i) => (
            <AnimatedCard key={w.title} delay={i * 0.12}>
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
              >
                <Icon name={w.icon} size={22} />
              </span>
              <h3 className="font-heading font-bold text-xl mb-1" style={{ color: "var(--text)" }}>
                {w.title}
              </h3>
              <p className="font-mono text-sm mb-3" style={{ color: "var(--accent-ink)" }}>
                {w.url}
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-3)" }}>
                {w.desc}
              </p>

              <ul className="flex flex-col gap-2.5">
                {w.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-2)" }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-ink)" }}>
                      <Icon name="check" size={16} strokeWidth={2.2} />
                    </span>
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
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <p className="text-sm text-center max-w-md" style={{ color: "var(--text-muted)" }}>
            El ERP es la única fuente de verdad. Todo parte de ahí.
          </p>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </motion.div>
      </div>
    </section>
  );
}
