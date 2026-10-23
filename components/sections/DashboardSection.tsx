"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

const features = [
  { icon: "💰", label: "Ventas del día",      detail: "Con comparativa vs ayer" },
  { icon: "📈", label: "Utilidad en tiempo real", detail: "Lo que ganaste, no solo lo que vendiste" },
  { icon: "🎯", label: "Ticket promedio",     detail: "Y su evolución por semana" },
  { icon: "👑", label: "Top productos y clientes", detail: "Del período seleccionado" },
  { icon: "💳", label: "Desglose por método de pago", detail: "Efectivo, tarjeta, crédito, transferencia" },
  { icon: "📊", label: "Gráfica mensual",     detail: "Mes en curso vs mes anterior" },
];

const paymentBars = [
  { label: "Efectivo",     pct: 45, color: "#27B07F" },
  { label: "Tarjeta",      pct: 30, color: "#1BAE91" },
  { label: "Transferencia",pct: 17, color: "#3498DB" },
  { label: "Crédito",      pct: 8,  color: "#E0A32E" },
];

const chartBars = [62, 48, 75, 55, 83, 69, 91, 77, 64, 88, 72, 95, 80, 67, 84];

export function DashboardSection() {
  return (
    <section className="py-20 bg-[var(--bg)]" aria-labelledby="dashboard-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual mockup */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                background: "#1E1B15",
                borderRadius: "20px",
                boxShadow: "0 18px 48px rgba(0,0,0,0.42)",
                padding: "24px",
                color: "#F2EEE6",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p style={{ fontSize: "11px", color: "#A8A094", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Panel de mando
                  </p>
                  <p style={{ fontFamily: "var(--font-outfit, sans-serif)", fontWeight: 700, fontSize: "15px" }}>
                    Resumen del día
                  </p>
                </div>
                <span style={{ fontSize: "11px", color: "#A8A094" }}>Hoy · Martes 22 Abr</span>
              </div>

              {/* Mini metrics row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { l: "Ventas", v: "$48,320", c: "+12%", up: true },
                  { l: "Utilidad", v: "$14,210", c: "+8%", up: true },
                  { l: "Ticket", v: "$960", c: "+3%", up: true },
                ].map((m) => (
                  <div key={m.l} style={{ background: "rgba(14,124,102,0.2)", borderRadius: "10px", padding: "10px" }}>
                    <p style={{ fontSize: "9px", color: "#A8A094", marginBottom: "4px" }}>{m.l}</p>
                    <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "clamp(11px, 2vw, 14px)", fontWeight: 700 }}>{m.v}</p>
                    <span style={{ fontSize: "9px", color: "#27B07F" }}>{m.c}</span>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "10px", color: "#A8A094", marginBottom: "8px" }}>Ventas — últimos 15 días</p>
                <div className="flex items-end gap-1" style={{ height: "60px" }}>
                  {chartBars.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        background: i === chartBars.length - 1
                          ? "#1BAE91"
                          : "rgba(27,174,145,0.35)",
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Payment breakdown */}
              <div>
                <p style={{ fontSize: "10px", color: "#A8A094", marginBottom: "8px" }}>Desglose por método de pago</p>
                <div className="flex flex-col gap-2">
                  {paymentBars.map((b) => (
                    <div key={b.label} className="flex items-center gap-2">
                      <span style={{ fontSize: "10px", color: "#A8A094", width: "60px", flexShrink: 0 }}>{b.label}</span>
                      <div style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: "4px", height: "6px" }}>
                        <div style={{ width: `${b.pct}%`, height: "100%", background: b.color, borderRadius: "4px" }} />
                      </div>
                      <span style={{ fontSize: "10px", color: "#A8A094", width: "26px", textAlign: "right" }}>{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <div>
            <SectionHeading
              id="dashboard-heading"
              eyebrow="PANEL DE MANDO EN TIEMPO REAL"
              title={<>Los números de tu negocio,<br />siempre visibles</>}
              subtitle="La primera pantalla que ves al entrar. Sin generar reportes, sin esperar. Todo actualizado al instante con cada venta, compra o pago."
              className="mb-8"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-3 rounded-card p-4"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                    style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                  >
                    <Icon name={f.icon} size={18} />
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-sm" style={{ color: "var(--text)" }}>{f.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{f.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
