"use client";
import { motion } from "framer-motion";
import { useDemoModal } from "@/lib/demo-context";

export function CTASection() {
  const { openModal } = useDemoModal();

  return (
    <section
      id="contacto"
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--color-primary)" }}
      aria-labelledby="cta-heading"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "-80px", left: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "var(--color-secondary)", filter: "blur(80px)", opacity: 0.2,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "-80px", right: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "var(--color-accent-soft)", filter: "blur(80px)", opacity: 0.2,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl lg:text-5xl font-extrabold text-white mb-4"
        >
          ¿Listo para tomar el control?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/80 text-lg mb-8 max-w-2xl mx-auto"
        >
          Únete a cientos de PyMEs mexicanas que ya gestionan su negocio con PyCore ERP. Demo gratuita, sin compromiso.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => openModal()}
          className="inline-block bg-white text-[var(--color-primary)] font-bold px-8 py-4 rounded-full hover:bg-[var(--color-accent-soft)] transition-colors text-lg cursor-pointer"
          aria-label="Solicitar demo gratuita de PyCore ERP"
        >
          Solicitar Demo Gratis →
        </motion.button>
      </div>
    </section>
  );
}
