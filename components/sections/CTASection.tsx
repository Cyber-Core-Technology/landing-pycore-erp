"use client";
import { motion } from "framer-motion";
import { useDemoModal } from "@/lib/demo-context";
import { Icon } from "@/components/ui/Icon";

/*
  La banda de marca: el único bloque donde el verde ocupa toda la superficie,
  como las páginas de cierre del brochure. Sin blobs difuminados — el brochure
  es plano; el peso lo da el color sólido y el aire.
*/

export function CTASection() {
  const { openModal } = useDemoModal();

  return (
    <section
      id="contacto"
      className="py-24"
      style={{ background: "var(--band)", color: "var(--band-ink)" }}
      aria-labelledby="cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-10">
          <div className="flex-1 min-w-0 basis-[420px] flex flex-col gap-4">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="text-xs font-semibold tracking-[0.16em]"
              style={{ color: "var(--band-eyebrow)" }}
            >
              EMPIEZA HOY
            </motion.span>

            <motion.h2
              id="cta-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.08] tracking-[-0.03em]"
            >
              Empieza hoy
              <br className="hidden sm:block" /> con PyCore SGC.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--band-ink-2)" }}
            >
              Controla ventas, inventario, sucursales y operación desde un solo
              sistema. Simple. Directo. Listo para operar.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal()}
              className="boton-vivo inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-btn text-base cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: "var(--band-btn)", color: "var(--band-btn-fg)" }}
              aria-label="Solicitar demo gratuita de PyCore SGC"
            >
              Solicitar demo gratis
              <Icon name="arrowRight" size={18} strokeWidth={2} />
            </motion.button>

            <a
              href="#planes"
              className="inline-flex items-center font-semibold px-7 py-4 rounded-btn text-base transition-colors"
              style={{
                background: "var(--band-tile)",
                color: "var(--band-ink)",
                border: "1px solid var(--band-border)",
              }}
            >
              Ver planes
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
