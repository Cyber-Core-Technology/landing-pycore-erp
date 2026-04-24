"use client";
import { motion } from "framer-motion";
import { SECURITY_FEATURES } from "@/lib/constants";

export function SecuritySection() {
  return (
    <section className="py-20 bg-[var(--card)]" aria-labelledby="security-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full px-4 py-1.5 text-[var(--color-secondary)] text-sm font-medium mb-4">
                🔒 Seguridad y trazabilidad
              </span>
              <h2
                id="security-heading"
                className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-4 leading-tight"
              >
                Tu negocio protegido.{" "}
                <span style={{ color: "var(--color-primary)" }}>Cada acción registrada.</span>
              </h2>
              <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
                Arquitectura multitenancy: los datos de cada empresa están completamente aislados. Nadie ve lo que es tuyo. Cada movimiento queda ligado al usuario que lo realizó, con fecha y detalle exacto.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {["CFDI certificado", "PAC Facturama", "Nube segura", "2FA disponible"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-secondary)]"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </motion.div>
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
                className="bg-[var(--bg)] border border-[var(--border)] rounded-[14px] p-5"
              >
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-heading font-semibold text-sm text-[var(--text)] mb-1">{f.title}</h3>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
