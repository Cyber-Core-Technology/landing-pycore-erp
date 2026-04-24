"use client";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { DashboardMockup } from "@/components/ui/DashboardMockup";
import { useDemoModal } from "@/lib/demo-context";

const pillStats = [
  { icon: "🧩", text: "14 módulos integrados" },
  { icon: "📶", text: "Funciona sin internet" },
  { icon: "🧾", text: "CFDI incluido" },
  { icon: "🤖", text: "IA integrada" },
];

export function HeroSection() {
  const { openModal } = useDemoModal();

  return (
    <section
      style={{ background: "#0F1E1A", position: "relative", overflow: "hidden" }}
      className="min-h-screen flex items-center"
      aria-label="Hero — PyCore ERP"
    >
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 border border-[#7AE0C3]/40 bg-[#7AE0C3]/10 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-6"
            >
              🇲🇽 Hecho en México para PyMEs mexicanas
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="font-heading text-5xl lg:text-7xl font-extrabold text-[#E6F2EE] leading-tight mb-4"
            >
              El{" "}
              <span
                style={{
                  background: "linear-gradient(to right, #0E7C66, #1BAE91)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                núcleo
              </span>{" "}
              de tu negocio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[#94B8B0] text-lg lg:text-xl max-w-lg mb-8 leading-relaxed"
            >
              ERP modular y escalable para PyMEs mexicanas. Ventas, inventario,
              finanzas, facturación CFDI y tienda en línea, todo conectado en un solo lugar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => openModal()}
                className="bg-[#0E7C66] hover:bg-[#1BAE91] text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-base cursor-pointer"
                aria-label="Solicitar demo de PyCore ERP"
              >
                Solicitar Demo Gratis
              </motion.button>
              <motion.a
                href="#funciones"
                whileTap={{ scale: 0.97 }}
                className="border border-white/40 text-white hover:bg-white/10 px-7 py-3.5 rounded-full transition-colors text-base"
                aria-label="Ver funciones de PyCore ERP"
              >
                Ver Funciones →
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {pillStats.map((p) => (
                <span
                  key={p.text}
                  className="flex items-center gap-1.5 text-xs text-[#7AE0C3] bg-[#7AE0C3]/10 border border-[#7AE0C3]/20 px-3 py-1.5 rounded-full"
                >
                  <span>{p.icon}</span>
                  {p.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ rotateY: 3, rotateX: -2 }}
            style={{ perspective: 1000, display: "flex", justifyContent: "center" }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
