"use client";
import { motion } from "framer-motion";
import { PLANS } from "@/lib/constants";
import { useDemoModal } from "@/lib/demo-context";

export function PlansSection() {
  const { openModal } = useDemoModal();

  return (
    <section id="planes" className="py-20 bg-[var(--bg)]" aria-labelledby="plans-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full px-4 py-1.5 text-[var(--color-secondary)] text-sm font-medium mb-4"
          >
            📈 Planes y precios
          </motion.span>
          <h2
            id="plans-heading"
            className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-4"
          >
            Empieza pequeño, crece sin límites
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Sin contratos de permanencia. Sin costos de migración. Cambia de plan cuando tu negocio lo pida.
          </p>
        </div>

        {/* Grid: mismo tamaño para todas las tarjetas */}
        <div className="overflow-x-auto pb-4 md:overflow-x-visible md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-5 min-w-max md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                // h-full asegura que todas las cards en el mismo row de grid tengan igual altura
                className={`
                  relative flex flex-col rounded-[20px] border h-full
                  w-72 md:w-auto
                  ${plan.highlight
                    ? "border-2 border-[var(--color-primary)] shadow-[0_0_28px_rgba(14,124,102,0.4)]"
                    : "border-[var(--border)]"
                  }
                `}
                style={{ background: "var(--card)" }}
              >
                {/* Badge "más popular" */}
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-md">
                      ⭐ Más popular
                    </span>
                  </div>
                )}

                {/* Header con color en plan destacado */}
                <div
                  className="p-6 pb-5 rounded-t-[18px]"
                  style={plan.highlight ? { background: "rgba(14,124,102,0.08)" } : {}}
                >
                  <h3 className="font-heading font-bold text-xl text-[var(--text)] mb-0.5">{plan.name}</h3>
                  <p className="text-[var(--text-muted)] text-xs mb-5 min-h-[32px]">{plan.subtitle}</p>

                  {/* Precio */}
                  <div className="flex items-end gap-1 min-h-[52px]">
                    <span
                      className="font-heading font-extrabold leading-none text-[var(--text)]"
                      style={{ fontSize: plan.price === "Personalizado" ? "22px" : "38px" }}
                    >
                      {plan.price}
                    </span>
                    {plan.priceNote && (
                      <span className="text-[var(--text-muted)] text-sm mb-1">{plan.priceNote}</span>
                    )}
                  </div>
                  {plan.price !== "Personalizado" && (
                    <p className="text-[var(--text-muted)] text-xs mt-1">MXN + IVA · mensual</p>
                  )}
                  {plan.price === "Personalizado" && (
                    <p className="text-[var(--text-muted)] text-xs mt-1">Cotización a medida</p>
                  )}
                </div>

                <div className="h-px bg-[var(--border)] mx-6" />

                {/* Features — flex-1 empuja el CTA al fondo */}
                <ul className="flex flex-col gap-2.5 flex-1 p-6 pt-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text)]">
                      <span className="text-[var(--color-success)] font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span className={f.startsWith("Todo lo") ? "font-semibold text-[var(--color-secondary)]" : ""}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA siempre al fondo */}
                <div className="p-6 pt-0 mt-auto">
                  <button
                    onClick={() => openModal(plan.name)}
                    className={`
                      w-full text-center rounded-full px-4 py-3 text-sm font-semibold transition-colors
                      ${plan.highlight
                        ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]"
                        : "border border-[var(--border)] text-[var(--text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                      }
                    `}
                    aria-label={`Solicitar plan ${plan.name}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-center text-[var(--text-muted)] text-sm mt-10">
          Todos los planes incluyen soporte técnico y acceso a todas las actualizaciones. Precios en pesos mexicanos.
        </p>
      </div>
    </section>
  );
}
