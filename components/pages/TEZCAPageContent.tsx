"use client";
import { motion } from "framer-motion";
import { ChatConversation } from "@/components/ui/ChatConversation";
import { InsightBadge } from "@/components/ui/InsightBadge";
import { TEZCA_INSIGHTS, TEZCA_BADGES } from "@/lib/constants";
import { useDemoModal } from "@/lib/demo-context";

const TEZCA_EXAMPLES = [
  { q: "¿Cuáles son mis productos más vendidos este mes?", a: "Tus 3 productos más vendidos este mes son Producto A (142 uds), Producto B (98 uds) y Producto C (87 uds). Juntos representan el 38% de tus ventas totales." },
  { q: "¿Debería hacer una promoción esta semana?", a: "Sí. Tus ventas de martes a jueves están un 22% por debajo del promedio semanal. Una promoción de 10% en tu categoría más activa podría recuperar ese margen." },
  { q: "¿Qué proveedor me da mejor margen?", a: "Proveedor X te da el mejor margen neto: 34% en promedio vs 21% del siguiente. Sus productos también tienen menor índice de devolución." },
];

const PLAN_QUERIES = [
  { plan: "Básico",      queries: "No incluido",        color: "#94B8B0" },
  { plan: "Profesional", queries: "50 consultas/día",   color: "#1BAE91" },
  { plan: "Empresarial", queries: "100 consultas/día",  color: "#7AE0C3" },
  { plan: "Elite",       queries: "Ilimitado",          color: "#FFD700" },
];

const DIFF_ITEMS = [
  { icon: "🎯", title: "Datos reales, no genéricos", desc: "Cada respuesta de TEZCA usa los datos reales de tu negocio: tus productos, tus clientes, tu inventario. Sin ejemplos de muestra." },
  { icon: "⏱", title: "Trabaja en segundo plano", desc: "TEZCA analiza tu operación cada hora sin que tengas que pedírselo. Detecta patrones y genera alertas proactivas." },
  { icon: "⚡", title: "Cero configuración", desc: "Desde el primer día que usas PyCore, TEZCA empieza a generar insights. No hay nada que configurar ni entrenar." },
  { icon: "📊", title: "Acciones concretas", desc: "Cada insight incluye una acción sugerida. No solo te dice qué pasó — te dice exactamente qué hacer." },
];

const IMAGE_GEN_USES = [
  "Genera una imagen del producto a partir de su nombre o descripción",
  "Busca imágenes en bancos de imágenes externos",
  "Carga imágenes desde una URL directamente al catálogo",
  "Ideal para arrancar sin sesiones de fotografía",
];

export function TEZCAPageContent() {
  const { openModal } = useDemoModal();

  return (
    <>
      {/* Hero */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A1714 0%, #0F1E1A 50%, #1A3A33 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-8xl mb-6"
          >
            🤖
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#1BAE91]/20 border border-[#1BAE91]/40 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-5"
          >
            Inteligencia Artificial integrada en PyCore ERP
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold mb-5"
            style={{ color: "#E6F2EE" }}
          >
            TEZCA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#7AE0C3] text-xl font-medium mb-4"
          >
            Tu consejero de negocios con IA
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-[#94B8B0] text-lg max-w-2xl mx-auto mb-10"
          >
            La mayoría de los ERPs te dan datos. TEZCA te dice qué hacer con ellos.
            Analiza tu operación 24/7, genera alertas automáticas y responde tus preguntas con los datos reales de tu negocio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <button
              onClick={() => openModal()}
              className="bg-[#1BAE91] text-white rounded-full px-7 py-3 font-semibold hover:bg-[#159A7E] transition-colors"
            >
              Quiero ver TEZCA en acción
            </button>
            <a
              href="/#planes"
              className="border border-[#1BAE91]/40 text-[#7AE0C3] rounded-full px-7 py-3 font-semibold hover:border-[#1BAE91] transition-colors"
            >
              Ver Planes
            </a>
          </motion.div>
        </div>
      </section>

      {/* Por qué es diferente */}
      <section className="py-16 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-3">
              ¿Por qué TEZCA es diferente?
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
              No es un chatbot genérico. Es un asesor que conoce tu negocio al detalle.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DIFF_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading font-semibold text-[var(--text)] mb-2">{item.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modo Consejero */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0F1E1A 0%, #1A3A33 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#1BAE91]/20 border border-[#1BAE91]/40 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-5">
                💬 Modo Consejero
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#E6F2EE] mb-4">
                Pregúntale lo que quieras
              </h2>
              <p className="text-[#94B8B0] text-base leading-relaxed mb-8">
                TEZCA tiene acceso en tiempo real a todos los datos de tu negocio: ventas, inventario, clientes, proveedores, finanzas. Hazle cualquier pregunta y responde con contexto específico de tu operación.
              </p>
              <div className="flex flex-col gap-4">
                {TEZCA_EXAMPLES.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl p-4"
                    style={{ background: "rgba(27,174,145,0.08)", border: "1px solid rgba(27,174,145,0.2)" }}
                  >
                    <p className="text-[#7AE0C3] text-sm font-medium mb-2">Tú: {ex.q}</p>
                    <p className="text-[#94B8B0] text-sm">TEZCA: {ex.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ChatConversation />
              <p className="text-[#94B8B0] text-xs mt-3">
                El historial completo de conversaciones se guarda. Las respuestas frecuentes se cachean para no consumir tu cupo diario.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modo Observador */}
      <section className="py-20 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <span className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full px-4 py-1.5 text-[var(--color-secondary)] text-sm font-medium mb-5">
                👁 Modo Observador
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-4">
                Analiza tu negocio cada hora, solo
              </h2>
              <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6">
                Sin que tengas que preguntar. TEZCA trabaja en segundo plano y genera alertas automáticas cuando detecta algo que requiere tu atención: stock bajo, cuentas vencidas, oportunidades de venta.
              </p>
              <ul className="flex flex-col gap-3 mb-6">
                {[
                  { icon: "🔴", type: "Urgente", example: "El cliente ABC lleva 12 días sin pagar su factura de $8,400." },
                  { icon: "🟡", type: "Alerta",  example: "El stock de Producto X bajó al 15%. Considera reabastecer." },
                  { icon: "🟢", type: "Positivo",example: "Llevas 5 ventas hoy. ¡Buen ritmo! El ticket promedio subió un 8%." },
                  { icon: "🔵", type: "Info",    example: "Tu categoría Electrónica creció un 12% vs el mes pasado." },
                ].map((row) => (
                  <li key={row.type} className="flex items-start gap-3 text-sm">
                    <span className="text-xl flex-shrink-0">{row.icon}</span>
                    <div>
                      <span className="font-medium text-[var(--text)]">{row.type}: </span>
                      <span className="text-[var(--text-muted)]">{row.example}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-[var(--text-muted)] text-sm">
                Los insights se guardan por <strong className="text-[var(--text)]">30 días</strong> y puedes filtrarlos por tipo, urgencia o estado de lectura.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {TEZCA_INSIGHTS.map((ins, i) => (
                <InsightBadge key={i} level={ins.level} text={ins.text} delay={i * 0.1} />
              ))}
              <p className="text-[var(--text-muted)] text-xs mt-2">
                Cada insight incluye una acción concreta sugerida para que sepas exactamente qué hacer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Imágenes con IA */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0F1E1A 0%, #1A3A33 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#1BAE91]/20 border border-[#1BAE91]/40 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-5">
                🎨 Imágenes con IA
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#E6F2EE] mb-4">
                Catálogo visual sin sesiones de foto
              </h2>
              <p className="text-[#94B8B0] text-base leading-relaxed mb-6">
                TEZCA puede generar imágenes para los productos de tu catálogo automáticamente. Ideal para negocios que arrancan sin fotos profesionales o quieren lanzar productos rápido.
              </p>
              <ul className="flex flex-col gap-3">
                {IMAGE_GEN_USES.map((use) => (
                  <li key={use} className="flex items-start gap-2 text-sm text-[#94B8B0]">
                    <span className="text-[#1BAE91] font-bold mt-0.5 flex-shrink-0">✓</span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-8 text-center"
              style={{ background: "rgba(27,174,145,0.08)", border: "1px solid rgba(27,174,145,0.25)" }}
            >
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-[#7AE0C3] font-medium mb-2">Genera imágenes de productos</p>
              <div className="bg-[rgba(27,174,145,0.15)] rounded-xl p-3 text-left mb-3 text-sm text-[#94B8B0]">
                Describe tu producto: "Silla de oficina ergonómica negra con apoyabrazos"
              </div>
              <div className="text-[#94B8B0] text-xs">→ TEZCA genera o busca la imagen ideal para tu tienda en línea</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insignias */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-3">
              🏆 Insignias y logros automáticos
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
              TEZCA reconoce los hitos de tu negocio y los celebra contigo. Las insignias se otorgan automáticamente al alcanzar cada logro.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TEZCA_BADGES.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="text-3xl mb-3">{b.icon}</div>
                <p className="font-heading font-semibold text-[var(--text)] text-xs mb-1">{b.name}</p>
                <p className="text-[var(--text-muted)] text-xs leading-tight">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultas por plan */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--text)] mb-3">
            Consultas incluidas por plan
          </h2>
          <p className="text-[var(--text-muted)] mb-10">
            El sistema muestra en todo momento cuántas consultas has usado y cuántas te quedan en el día.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLAN_QUERIES.map((p) => (
              <div
                key={p.plan}
                className="rounded-2xl p-6"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
              >
                <p className="font-heading font-bold text-[var(--text)] mb-1">{p.plan}</p>
                <p className="font-heading font-bold text-xl" style={{ color: p.color }}>{p.queries}</p>
              </div>
            ))}
          </div>
          <p className="text-[var(--text-muted)] text-sm mt-6">
            Las respuestas frecuentes se cachean y no consumen tu cupo diario.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, #0A1714 0%, #1A3A33 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🤖</div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#E6F2EE] mb-4">
            Comienza a usar TEZCA hoy
          </h2>
          <p className="text-[#94B8B0] text-lg mb-8">
            TEZCA empieza a generar insights desde el primer día. Sin configuración, sin entrenamiento previo.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => openModal()}
              className="bg-[#1BAE91] text-white rounded-full px-8 py-3 font-semibold hover:bg-[#159A7E] transition-colors"
            >
              Solicitar Demo con TEZCA
            </button>
            <a
              href="/modulos"
              className="border border-[#1BAE91]/40 text-[#7AE0C3] rounded-full px-8 py-3 font-semibold hover:border-[#1BAE91] transition-colors"
            >
              Ver todos los módulos
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
