"use client";
import { motion } from "framer-motion";
import { ChatConversation } from "@/components/ui/ChatConversation";
import { InsightBadge } from "@/components/ui/InsightBadge";
import { TEZCA_INSIGHTS, TEZCA_BADGES, TEZCA_FEATURES } from "@/lib/constants";

export function TEZCASection() {
  return (
    <section
      id="tezca"
      style={{ background: "linear-gradient(135deg, #0F1E1A 0%, #1A3A33 100%)" }}
      className="py-20"
      aria-labelledby="tezca-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#1BAE91]/20 border border-[#1BAE91]/40 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-4"
          >
            🤖 Inteligencia Artificial integrada
          </motion.span>
          <motion.h2
            id="tezca-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl lg:text-5xl font-bold text-[#E6F2EE] mb-4"
          >
            TEZCA — Tu consejero de negocios con IA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#94B8B0] text-lg max-w-2xl mx-auto"
          >
            La mayoría de los ERPs te dan datos. TEZCA te dice qué hacer con ellos.
            Analiza tu negocio en segundo plano las 24 horas, sin que tengas que preguntar.
          </motion.p>
        </div>

        {/* Modo Consejero + Modo Observador */}
        <div className="grid md:grid-cols-2 gap-10 mb-14 items-start">

          {/* Modo Consejero — chat animado */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#1BAE91]/20 border border-[#1BAE91]/40 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-5">
              💬 Modo Consejero — Pregúntale lo que quieras
            </div>
            <ChatConversation />
            <p className="text-[#94B8B0] text-xs mt-3">
              Responde con tus datos reales, no respuestas genéricas. El historial se guarda completo.
            </p>
          </motion.div>

          {/* Modo Observador */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#3498DB]/20 border border-[#3498DB]/40 rounded-full px-4 py-1.5 text-[#94B8B0] text-sm font-medium mb-5">
              👁 Modo Observador — Analiza cada hora en segundo plano
            </div>
            <div className="flex flex-col gap-3 mb-4">
              {TEZCA_INSIGHTS.map((ins, i) => (
                <InsightBadge key={i} level={ins.level} text={ins.text} delay={i * 0.1} />
              ))}
            </div>
            <p className="text-[#94B8B0] text-xs mt-2">
              Cada insight incluye una acción concreta sugerida. Los insights se guardan por 30 días y puedes filtrarlos por tipo o urgencia.
            </p>
          </motion.div>
        </div>

        {/* Insignias */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <h3 className="font-heading font-bold text-xl text-[#E6F2EE]">
              🏆 Insignias y logros automáticos
            </h3>
            <p className="text-[#94B8B0] text-sm mt-1">
              TEZCA reconoce los hitos de tu negocio y los celebra contigo.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {TEZCA_BADGES.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                style={{
                  background: "rgba(27,174,145,0.1)",
                  border: "1px solid rgba(27,174,145,0.3)",
                  borderRadius: "14px",
                  padding: "16px 12px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{b.icon}</div>
                <p style={{ fontFamily: "var(--font-poppins,sans-serif)", fontWeight: 600, fontSize: "11px", color: "#E6F2EE", marginBottom: "4px" }}>
                  {b.name}
                </p>
                <p style={{ fontSize: "10px", color: "#94B8B0", lineHeight: 1.4 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TEZCA_FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(27,174,145,0.08)",
                border: "1px solid rgba(27,174,145,0.25)",
                borderRadius: "12px",
                padding: "12px 16px",
              }}
            >
              <span style={{ fontSize: "20px", flexShrink: 0 }}>{f.icon}</span>
              <span style={{ fontSize: "13px", color: "#7AE0C3" }}>{f.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
