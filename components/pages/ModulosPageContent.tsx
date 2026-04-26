"use client";
import { motion } from "framer-motion";
import { useDemoModal } from "@/lib/demo-context";

const MODULES_DETAIL = [
  {
    id: "core",
    icon: "🏢",
    name: "Core y sucursales",
    subtitle: "Maneja todas tus ubicaciones desde un solo sistema",
    description:
      "Gestiona la información central de tu negocio y todas sus ubicaciones desde un panel unificado. Desde los datos fiscales hasta las configuraciones de cada sucursal, todo en un solo lugar.",
    features: [
      "Datos fiscales: RFC, razón social y régimen fiscal",
      "Múltiples sucursales con dirección y contacto propios",
      "Moneda, decimales y series de facturación configurables",
      "Umbrales de alerta de stock por sucursal",
      "Cambio entre sucursales en un solo clic",
    ],
    benefit: "Cada sucursal opera con independencia, pero toda la información queda centralizada.",
  },
  {
    id: "seguridad",
    icon: "🔐",
    name: "Seguridad y accesos",
    subtitle: "Tú decides quién ve qué y hasta dónde puede operar",
    description:
      "Define quién puede ver y hacer qué dentro del sistema. Control granular por módulo y por acción, con trazabilidad completa de cada operación.",
    features: [
      "Roles personalizados por módulo y por acción (ver/crear/editar/eliminar)",
      "Jerarquías de acceso: jefes y subordinados",
      "Bloqueo automático tras intentos fallidos de acceso",
      "Autenticación de dos factores (2FA) activable",
      "Cada acción queda ligada al usuario que la realizó",
    ],
    benefit: "Trazabilidad completa. Cada cambio, cada venta, cada movimiento tiene nombre.",
  },
  {
    id: "catalogos",
    icon: "🗂️",
    name: "Catálogos",
    subtitle: "Productos, impuestos y unidades configurados a tu medida",
    description:
      "Categorías, unidades de medida e impuestos configurados una sola vez, usados en toda la plataforma. Consistencia total sin trabajo duplicado.",
    features: [
      "Categorías jerárquicas de productos (ej. Electrónica → Celulares → Android)",
      "Unidades de medida: piezas, kilos, litros, docenas y más",
      "Tasas de impuesto: IVA, IEPS, ISR con soporte para retenciones",
      "Cambias un impuesto una vez → se actualiza en todos los módulos",
      "Catálogos compartidos entre todas las sucursales",
    ],
    benefit: "El mismo IVA, las mismas categorías, en ventas, compras y facturación. Siempre.",
  },
  {
    id: "clientes",
    icon: "👥",
    name: "Clientes y proveedores",
    subtitle: "Historial, créditos y contactos siempre a la mano",
    description:
      "El directorio de relaciones comerciales del negocio, con control de crédito y condiciones de pago incluidos.",
    features: [
      "Datos fiscales completos para facturación automática",
      "Clasificación: minorista, mayorista o distribuidor",
      "Límite de crédito, saldo disponible y días de pago",
      "Descuento predeterminado que se aplica solo en cada venta",
      "Múltiples contactos y domicilios por cliente o proveedor",
    ],
    benefit: "Las ventas a crédito generan cuentas por cobrar automáticamente. Sin trabajo extra.",
  },
  {
    id: "inventario",
    icon: "📦",
    name: "Inventario",
    subtitle: "Sabe exactamente cuánto tienes, dónde y cuánto vale en todo momento",
    description:
      "Control completo de existencias: entradas, salidas, traspasos, ajustes y levantamiento físico. El sistema distingue entre stock total, reservado y disponible real.",
    features: [
      "Variantes de producto (tallas, colores, sabores) con SKU propio",
      "Tres niveles de precio: menudeo, mayoreo y costo",
      "Stock total, reservado y disponible en tiempo real",
      "Alertas de mínimos y máximos de stock por sucursal",
      "Traspasos entre sucursales con trazabilidad",
      "Inventario físico con escáner desde el celular",
      "Escaneo remoto PC ↔ Móvil por código QR",
      "Ubicación física en almacén: pasillo y estante",
    ],
    benefit: "Sabes exactamente cuánto tienes, dónde está y cuánto te costó. Sin adivinar.",
  },
  {
    id: "compras",
    icon: "🛒",
    name: "Compras",
    subtitle: "Controla qué pediste, qué llegó y cuánto debes pagar",
    description:
      "Gestiona todo el ciclo de compra: desde la orden hasta la recepción en almacén, con cruce triple para eliminar errores con proveedores.",
    features: [
      "Órdenes de compra con folio automático",
      "Recepción parcial o total contra la orden",
      "Cruce triple: orden ↔ recepción ↔ factura del proveedor",
      "Seguimiento de estado: borrador → activa → recibida → completa",
      "Inventario se actualiza automáticamente al recibir",
      "Compras a crédito generan cuentas por pagar automáticamente",
    ],
    benefit: "El cruce de tres vías elimina errores y discrepancias con el proveedor. Siempre.",
  },
  {
    id: "ventas",
    icon: "💰",
    name: "Ventas y POS",
    subtitle: "Cobra rápido, aplica promociones y genera facturas al instante",
    description:
      "El motor de ingresos del negocio. Diseñado para capturar ventas rápido sin errores, con soporte para múltiples métodos de pago y operación offline.",
    features: [
      "Búsqueda por nombre, SKU o código de barras",
      "Múltiples métodos de pago en una sola venta (mixto)",
      "Descuentos por línea o por venta total",
      "Promociones con vigencia y condiciones de uso",
      "Modo offline: guarda y sincroniza al reconectar",
      "Devoluciones y reimpresión de tickets",
      "Ventas a crédito con cuenta por cobrar automática",
      "Detección y resolución de conflictos de sincronización",
    ],
    benefit: "No pierdes una venta por caída de internet. El negocio no para.",
  },
  {
    id: "finanzas",
    icon: "💳",
    name: "Finanzas",
    subtitle: "Ve tu flujo de dinero, cobros pendientes y gastos en tiempo real",
    description:
      "CxC, CxP, gastos operativos y cuentas bancarias en un solo módulo. Siempre sabes cuánto dinero tienes disponible y cuánto debes.",
    features: [
      "Cuentas por cobrar con antigüedad de saldos y vencidos",
      "Cuentas por pagar y programa de vencimientos",
      "Gastos por categoría: renta, nómina, marketing, servicios…",
      "Asignación de gastos por sucursal o centro de costos",
      "Cuentas bancarias en MXN, USD y EUR",
      "Conciliación de movimientos contra entradas y salidas",
    ],
    benefit: "No más sorpresas. Ves los vencimientos antes de que lleguen.",
  },
  {
    id: "rrhh",
    icon: "👨‍💼",
    name: "Recursos humanos",
    subtitle: "Empleados, asistencias y datos de nómina en un solo lugar",
    description:
      "Administración básica del equipo: expedientes completos y control de asistencia desde cualquier dispositivo móvil.",
    features: [
      "Expediente: datos personales, CURP, RFC, NSS",
      "Puesto, departamento y tipo de contrato",
      "Control de fecha de ingreso y baja",
      "Registro de entrada/salida con timestamp desde celular",
      "Justificación de ausencias con notas",
      "Reportes de asistencia por período",
    ],
    benefit: "Expediente siempre actualizado y accesible. El registro de asistencia desde móvil elimina el papel.",
  },
  {
    id: "auditoria",
    icon: "📋",
    name: "Auditoría",
    subtitle: "Registro completo de todo lo que pasa en tu negocio, siempre",
    description:
      "Trazabilidad total de cada operación en el sistema. Cada acción queda registrada con nombre de usuario, fecha y detalle del cambio, sin excepciones.",
    features: [
      "Cada acción registrada: quién, cuándo y exactamente qué cambió",
      "Historial de movimientos en ventas, compras e inventario",
      "Trazabilidad por usuario en todos los módulos",
      "Alertas automáticas ante cambios críticos o inusuales",
      "Exportación de logs para revisión externa o contabilidad",
    ],
    benefit: "Siempre sabes qué pasó, quién lo hizo y cuándo. Sin lagunas.",
  },
];

const CATEGORIES = [
  { label: "Todos",      value: "todos" },
  { label: "Operación",  value: "operacion" },
  { label: "Ventas",     value: "ventas" },
  { label: "Finanzas",   value: "finanzas" },
];

const CATEGORY_MAP: Record<string, string[]> = {
  operacion: ["core", "seguridad", "catalogos", "clientes", "rrhh", "auditoria"],
  ventas:    ["ventas", "inventario", "compras"],
  finanzas:  ["finanzas"],
};

import { useState } from "react";

export function ModulosPageContent() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const { openModal } = useDemoModal();

  const filtered =
    activeCategory === "todos"
      ? MODULES_DETAIL
      : MODULES_DETAIL.filter((m) => CATEGORY_MAP[activeCategory]?.includes(m.id));

  return (
    <>
      {/* Hero */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, #0F1E1A 0%, #0E2A23 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#1BAE91]/20 border border-[#1BAE91]/40 rounded-full px-4 py-1.5 text-[#7AE0C3] text-sm font-medium mb-5"
          >
            🧩 10 módulos integrados
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold text-[#E6F2EE] mb-5"
          >
            Todo lo que tu negocio necesita,
            <br />
            <span style={{ color: "#1BAE91" }}>en un solo lugar</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#94B8B0] text-lg max-w-2xl mx-auto mb-8"
          >
            Activa solo los módulos que necesitas. PyCore crece contigo: empieza con lo básico y expande conforme tu negocio lo exija, sin cambiar de sistema ni migrar datos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <button
              onClick={() => openModal()}
              className="bg-[#1BAE91] text-white rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-[#159A7E] transition-colors"
            >
              Solicitar Demo
            </button>
            <a
              href="/#planes"
              className="border border-[#1BAE91]/50 text-[#7AE0C3] rounded-full px-6 py-2.5 font-semibold text-sm hover:border-[#1BAE91] transition-colors"
            >
              Ver Planes →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[var(--card)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: "10", label: "Módulos integrados" },
            { value: "1", label: "Única plataforma" },
            { value: "∞", label: "Escalabilidad" },
            { value: "100%", label: "Hecho en México" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-heading text-2xl font-bold text-[var(--color-primary)]">{s.value}</p>
              <p className="text-[var(--text-muted)] text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <section className="py-14 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 flex-wrap mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--card)] text-[var(--text-muted)] hover:text-[var(--color-primary)] border border-[var(--border)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((mod, i) => (
              <motion.div
                key={mod.id}
                id={mod.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.07 }}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{mod.icon}</span>
                  <div>
                    <h2 className="font-heading font-bold text-[var(--text)] text-lg leading-tight">
                      {mod.name}
                    </h2>
                    <p className="text-[var(--color-primary)] text-xs font-medium mt-0.5">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {mod.description}
                </p>

                <ul className="flex flex-col gap-2">
                  {mod.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <span className="text-[var(--color-success)] font-bold mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{
                    background: "var(--color-primary)10",
                    border: "1px solid var(--color-primary)30",
                  }}
                >
                  <span className="text-[var(--color-primary)] font-medium">💡 </span>
                  <span className="text-[var(--text-muted)]">{mod.benefit}</span>
                </div>

                {mod.link && (
                  <a
                    href={mod.link}
                    className="text-[var(--color-primary)] text-sm font-medium hover:underline self-start"
                  >
                    Ver página completa de TEZCA →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, #0F1E1A 0%, #0E2A23 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#E6F2EE] mb-4">
            ¿Listo para ver todo esto funcionando?
          </h2>
          <p className="text-[#94B8B0] text-lg mb-8">
            Solicita un demo personalizado y te mostramos los módulos que más se ajustan a tu negocio.
          </p>
          <button
            onClick={() => openModal()}
            className="bg-[#1BAE91] text-white rounded-full px-8 py-3 font-semibold text-base hover:bg-[#159A7E] transition-colors"
          >
            Solicitar Demo Gratis
          </button>
        </div>
      </section>
    </>
  );
}
