"use client";
import { motion } from "framer-motion";
import { PLANS } from "@/lib/constants";
import { useDemoModal } from "@/lib/demo-context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function PlansSection() {
  const { openModal } = useDemoModal();

  return (
    <section id="planes" className="py-20" style={{ background: "var(--bg)" }} aria-labelledby="plans-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="plans-heading"
          eyebrow="PLANES Y PRECIOS"
          title={<>Elige el control que<br />tu negocio necesita.</>}
          subtitle="Empieza simple y escala cuando tu operación lo pida. Se cobra por cada sucursal activa, desde $1,500 MXN al mes."
        />

        {/* Grid: mismo tamaño para todas las tarjetas */}
        <div className="overflow-x-auto pb-4 md:overflow-x-visible md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                // h-full asegura que todas las cards en el mismo row de grid tengan igual altura
                className={`
                  relative flex flex-col rounded-card-lg border h-full
                  w-72 md:w-auto
                  ${plan.highlight
                    ? "border-2 shadow-card-lg dark:shadow-[0_18px_48px_rgba(0,0,0,0.40)]"
                    : ""
                  }
                `}
                style={{
                  background: "var(--card)",
                  borderColor: plan.highlight ? "var(--accent)" : "var(--border)",
                }}
              >
                {/* Badge "más elegido" */}
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="text-[11px] font-bold tracking-[0.04em] px-4 py-1.5 rounded-full whitespace-nowrap shadow-card-md"
                      style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
                    >
                      MÁS ELEGIDO
                    </span>
                  </div>
                )}

                {/* Header */}
                <div
                  className="p-6 pb-5 rounded-t-[20px]"
                  style={plan.highlight ? { background: "var(--tint)" } : {}}
                >
                  <h3 className="font-heading font-bold text-xl mb-3" style={{ color: "var(--text)" }}>
                    {plan.name}
                  </h3>

                  {/* Precio */}
                  <div className="flex min-h-[52px] flex-col items-start gap-1">
                    {plan.oldPrice && (
                      <span
                        className="text-sm line-through decoration-2 opacity-80"
                        style={{ color: "var(--text-muted)", textDecorationColor: "var(--accent)" }}
                      >
                        {plan.oldPrice}
                      </span>
                    )}
                    <div className="flex items-end gap-1">
                      <span
                        className="font-heading font-bold leading-none tracking-[-0.03em] tabular-nums"
                        style={{
                          color: "var(--text)",
                          fontSize: plan.price === "Personalizado" ? "22px" : "38px",
                        }}
                      >
                        {plan.price}
                      </span>
                      {plan.priceNote && (
                        <span className="text-xs mb-1 leading-tight" style={{ color: "var(--text-muted)" }}>
                          {plan.priceNote}
                        </span>
                      )}
                    </div>
                  </div>
                  {plan.promoLabel && (
                    <div
                      className="mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{ background: "var(--warm-tint)", color: "var(--warm-ink)" }}
                    >
                      {plan.promoLabel}
                    </div>
                  )}
                  <p className="text-xs mt-2 min-h-[32px]" style={{ color: "var(--text-muted)" }}>
                    {plan.subtitle}
                  </p>
                </div>

                <div className="h-px mx-6" style={{ background: "var(--border)" }} />

                {/* Features — flex-1 empuja el CTA al fondo */}
                <ul className="flex flex-col gap-2.5 flex-1 p-6 pt-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-2)" }}>
                      <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-ink)" }}>
                        <Icon name="check" size={15} strokeWidth={2.4} />
                      </span>
                      <span
                        className={f.startsWith("Todo lo") ? "font-semibold" : ""}
                        style={f.startsWith("Todo lo") ? { color: "var(--accent-ink)" } : {}}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA siempre al fondo */}
                <div className="p-6 pt-0 mt-auto">
                  <button
                    onClick={() => openModal(plan.name)}
                    className="w-full text-center rounded-btn px-4 py-3.5 text-sm font-semibold transition-colors"
                    style={
                      plan.highlight
                        ? { background: "var(--accent)", color: "var(--accent-fg)" }
                        : {
                            background: "var(--btn2)",
                            color: "var(--text)",
                            border: "1px solid var(--btn2-border)",
                          }
                    }
                    aria-label={`Solicitar plan ${plan.name}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-sm mt-10" style={{ color: "var(--text-muted)" }}>
          Todos los planes incluyen soporte técnico y acceso a todas las actualizaciones. Precios en pesos mexicanos.
        </p>
      </div>
    </section>
  );
}
