"use client";
import { motion } from "framer-motion";
import { useDemoModal } from "@/lib/demo-context";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Activa tu tienda",
    desc: "Desde el panel de configuración, activa tu tienda en línea, elige un slug y personaliza nombre, colores y banners. Tu URL queda lista al instante.",
    icon: "⚙️",
  },
  {
    step: "02",
    title: "Tus productos aparecen solos",
    desc: "Los productos marcados como públicos en tu inventario se sincronizan automáticamente con la tienda. Stock, precios y variantes siempre actualizados.",
    icon: "📦",
  },
  {
    step: "03",
    title: "Recibe pedidos y cobra",
    desc: "Cuando un cliente hace checkout con Mercado Pago o en tienda, el pedido aparece en tu ERP en tiempo real. Al entregarlo, el stock se actualiza solo.",
    icon: "💳",
  },
];

const BUSINESS_FEATURES = [
  "URL pública única: plataforma.pycore.app/p/tu-negocio",
  "Personalización: nombre, descripción, colores y banners",
  "Activar/desactivar la tienda con un switch",
  "Control de visibilidad: mostrar u ocultar precios y stock",
  "Modalidades de entrega: recoger en tienda o envío a domicilio",
  "Pedidos programados con fecha de entrega",
  "Gestión de todos los pedidos desde el ERP",
  "Actualización de estado visible para el cliente en tiempo real",
  "Al marcar como entregado → stock descontado + venta generada automáticamente",
];

const CUSTOMER_FEATURES = [
  "Catálogo navegable con filtros por categoría",
  "Detalle de producto con stock en tiempo real",
  "Agregar al carrito y checkout en línea",
  "Pago con Mercado Pago o en tienda",
  "Seguimiento del pedido: pendiente → preparando → listo → entregado",
  "Cuenta de cliente con historial de pedidos",
  "Domicilios de entrega guardados",
];

const USE_CASES = [
  { icon: "🥖", title: "Panadería y repostería", desc: "Pedidos programados para el día siguiente. El cliente hace su pedido antes de las 8pm y lo recoge fresco en la mañana." },
  { icon: "🛒", title: "Tienda de abarrotes", desc: "Catálogo online con todos los productos. Los clientes hacen pedidos para recoger o entrega a domicilio en la colonia." },
  { icon: "🔧", title: "Ferretería", desc: "Catálogo de refacciones y materiales con stock real. El cliente busca la pieza que necesita sin llamar por teléfono." },
  { icon: "💄", title: "Tienda de cosméticos", desc: "Variantes por color y presentación. Checkout con Mercado Pago y envío a domicilio integrado en el flujo." },
  { icon: "🌿", title: "Despensa de productos naturales", desc: "Canastas semanales con pedidos programados. El cliente elige su canasta el lunes y la recibe el jueves." },
  { icon: "📱", title: "Tienda de electrónica", desc: "Ficha técnica completa, stock por variante y precios de mayoreo para distribuidores registrados." },
];

const SYNC_POINTS = [
  { icon: "⚡", text: "Una venta en tienda en línea descuenta el stock al instante" },
  { icon: "🔄", text: "Una venta en POS actualiza la disponibilidad pública al momento" },
  { icon: "📊", text: "Cada pedido online genera la venta en el ERP automáticamente" },
  { icon: "🚫", text: "Nunca vendas algo que ya no tienes — stock reservado vs disponible" },
];

export function TiendaPageContent() {
  const { openModal } = useDemoModal();

  return (
    <>
      {/* Hero */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A1714 0%, #0F2D26 60%, #0E3D30 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#1BAE91]/20 border border-[#1BAE91]/40 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-5"
          >
            🌐 Módulo de Tienda en Línea — PyCore ERP
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl lg:text-6xl font-bold text-[#E6F2EE] mb-5"
          >
            Tu tienda en línea,
            <br />
            <span style={{ color: "#1BAE91" }}>conectada al inventario</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#94B8B0] text-lg max-w-2xl mx-auto mb-8"
          >
            Sin doble captura. Sin desincronía de stock. Sin sistemas separados.
            Un solo inventario que alimenta tanto tu punto de venta como tu tienda pública.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 flex-wrap mb-10"
          >
            <button
              onClick={() => openModal()}
              className="bg-[#1BAE91] text-white rounded-full px-7 py-3 font-semibold hover:bg-[#159A7E] transition-colors"
            >
              Ver demo de la tienda
            </button>
            <a
              href="/#planes"
              className="border border-[#1BAE91]/40 text-[#7AE0C3] rounded-full px-7 py-3 font-semibold hover:border-[#1BAE91] transition-colors"
            >
              Ver Planes
            </a>
          </motion.div>

          {/* URL preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-[rgba(27,174,145,0.12)] border border-[#1BAE91]/30 rounded-xl px-5 py-3"
          >
            <span className="text-[#1BAE91] text-sm">🔗</span>
            <span className="font-mono text-[#7AE0C3] text-sm">plataforma.pycore.app/p/<span className="text-white">tu-negocio</span></span>
          </motion.div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-3">
              Cómo funciona
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
              Desde cero hasta tu tienda en línea funcionando, en tres pasos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-7 relative"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div
                  className="absolute -top-4 left-6 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: "var(--color-primary)" }}
                >
                  {step.step}
                </div>
                <div className="text-4xl mb-4 mt-2">{step.icon}</div>
                <h3 className="font-heading font-semibold text-[var(--text)] mb-2">{step.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sincronización en tiempo real */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0F1E1A 0%, #1A3A33 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#1BAE91]/20 border border-[#1BAE91]/40 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-5">
                ⚡ Sincronización en tiempo real
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#E6F2EE] mb-4">
                Un solo inventario para todo
              </h2>
              <p className="text-[#94B8B0] text-base leading-relaxed mb-8">
                El ERP es la única fuente de verdad. Todo parte de ahí. No hay dos bases de datos que mantener sincronizadas manualmente.
              </p>
              <ul className="flex flex-col gap-4">
                {SYNC_POINTS.map((p) => (
                  <li key={p.text} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{p.icon}</span>
                    <span className="text-[#94B8B0] text-sm leading-relaxed">{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-8"
              style={{ background: "rgba(27,174,145,0.06)", border: "1px solid rgba(27,174,145,0.2)" }}
            >
              <div className="flex flex-col gap-4">
                {[
                  { label: "ERP (inventario)", value: "Stock: 42 unidades", icon: "🏭", color: "#1BAE91" },
                  { label: "Tienda en línea", value: "Disponible: 42 unidades", icon: "🌐", color: "#7AE0C3" },
                  { label: "POS (vendedor)",  value: "Stock visible: 42 unidades", icon: "💻", color: "#94B8B0" },
                ].map((node) => (
                  <div
                    key={node.label}
                    className="rounded-xl p-4 flex items-center gap-4"
                    style={{ background: "rgba(27,174,145,0.1)", border: `1px solid ${node.color}30` }}
                  >
                    <span className="text-2xl">{node.icon}</span>
                    <div>
                      <p className="text-xs font-medium" style={{ color: node.color }}>{node.label}</p>
                      <p className="text-[#E6F2EE] text-sm font-semibold">{node.value}</p>
                    </div>
                  </div>
                ))}
                <div className="text-center text-[#94B8B0] text-xs mt-2">
                  ↕ Se actualizan al mismo tiempo, siempre
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features negocio + cliente */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-3">
              Todo incluido
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Para el negocio */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-8"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="text-3xl mb-4">🏪</div>
              <h3 className="font-heading font-bold text-[var(--text)] text-xl mb-2">Para el negocio</h3>
              <p className="text-[var(--text-muted)] text-sm mb-5">Lo que puedes configurar y gestionar desde el ERP:</p>
              <ul className="flex flex-col gap-2.5">
                {BUSINESS_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <span className="text-[var(--color-success)] font-bold mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Para el cliente */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-8"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="text-3xl mb-4">👤</div>
              <h3 className="font-heading font-bold text-[var(--text)] text-xl mb-2">Para el cliente final</h3>
              <p className="text-[var(--text-muted)] text-sm mb-5">Lo que ve y puede hacer tu cliente desde la tienda pública:</p>
              <ul className="flex flex-col gap-2.5">
                {CUSTOMER_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <span className="text-[var(--color-success)] font-bold mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pedidos programados */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-5">📅</div>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--text)] mb-3">
            Pedidos programados
          </h2>
          <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6 max-w-2xl mx-auto">
            Para negocios de entrega anticipada como panaderías, despensas, servicios de canastas o suscripciones, la tienda soporta pedidos con fecha de entrega programada. El cliente elige cuándo quiere recibir su pedido.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { icon: "🥖", example: "Panadería: pide hoy, recoge mañana antes de abrir" },
              { icon: "🥗", example: "Despensa: elige tu canasta el lunes, entrega el jueves" },
              { icon: "🎂", example: "Pastelería: pedidos con 48h de anticipación" },
            ].map((c) => (
              <div
                key={c.example}
                className="rounded-xl p-4"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
              >
                <div className="text-3xl mb-2">{c.icon}</div>
                <p className="text-[var(--text-muted)] text-xs">{c.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-3">
              Para todo tipo de negocio
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
              Desde una tienda de barrio hasta una cadena multi-sucursal.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl p-6"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="text-4xl mb-4">{uc.icon}</div>
                <h3 className="font-heading font-semibold text-[var(--text)] mb-2">{uc.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mercado Pago */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #0F1E1A 0%, #1A3A33 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-5">💳</div>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#E6F2EE] mb-3">
            Cobros en línea con Mercado Pago
          </h2>
          <p className="text-[#94B8B0] text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            La integración con Mercado Pago está incluida en el módulo de Tienda en Línea. Tus clientes pagan con tarjeta, transferencia o en efectivo en OXXO, directamente desde el checkout de tu tienda.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {["Tarjeta de crédito", "Tarjeta de débito", "Transferencia SPEI", "Efectivo OXXO"].map((m) => (
              <div
                key={m}
                className="rounded-xl py-3 px-4 font-medium"
                style={{ background: "rgba(27,174,145,0.12)", border: "1px solid rgba(27,174,145,0.3)", color: "#7AE0C3" }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-[var(--bg)]">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text)] mb-4">
            Lanza tu tienda en línea hoy
          </h2>
          <p className="text-[var(--text-muted)] text-lg mb-8">
            Cualquier negocio puede tener presencia digital en minutos. Tu inventario ya está listo — solo falta activarlo.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => openModal()}
              className="bg-[var(--color-primary)] text-white rounded-full px-8 py-3 font-semibold hover:bg-[var(--color-secondary)] transition-colors"
            >
              Solicitar Demo
            </button>
            <a
              href="/modulos"
              className="border border-[var(--border)] text-[var(--text-muted)] rounded-full px-8 py-3 font-semibold hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
            >
              Ver todos los módulos
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
