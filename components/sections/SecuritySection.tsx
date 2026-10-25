"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { SECURITY_FEATURES } from "@/lib/constants";

export function SecuritySection() {
  return (
    <section className="py-20" style={{ background: "var(--card)" }} aria-labelledby="security-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <SectionHeading
              id="security-heading"
              eyebrow="SEGURIDAD Y TRAZABILIDAD"
              title={<>Tu negocio protegido.<br />Cada acción registrada.</>}
              subtitle="Arquitectura multitenancy: los datos de cada empresa están completamente aislados. Cada movimiento queda ligado al usuario que lo realizó, con fecha y detalle exacto."
              className="mb-7"
            />
            <div className="flex items-center gap-2 flex-wrap">
              {["Datos aislados", "Nube segura", "2FA disponible"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-2 rounded-full"
                  style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                >
                  <Icon name="check" size={14} strokeWidth={2.4} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SECURITY_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-card p-5"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                  style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                >
                  <Icon name={f.icon} size={19} />
                </span>
                <h3 className="font-heading font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
