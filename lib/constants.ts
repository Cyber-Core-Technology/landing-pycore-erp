// ─── Empresa y redes sociales ─────────────────────────────────────────────────

export const COMPANY_NAME = "Global-IAnalytics S. A de C. V";
export const COMPANY_URL  = "https://global-ianalytics.com";

// Desarrollador del sistema (la empresa es la responsable/dueña)
export const DEVELOPER_NAME = "Raul Callejas";
export const DEVELOPER_URL  = "https://scorpion.cyco.tech";

// Repositorio público (el código original completo es privado)
export const REPO_URL = "https://github.com/Cyber-Core-Technology/pycore";

export const SOCIAL_LINKS = [
  { name: "Facebook",  href: "https://www.facebook.com/pycoresgc" },
  { name: "Instagram", href: "https://www.instagram.com/pycoresgc" },
  { name: "X",         href: "https://x.com/PycoreSGC" },
  { name: "YouTube",   href: "https://www.youtube.com/@PyCore-ERP" },
  { name: "GitHub",    href: REPO_URL },
] as const;

// ─── Módulos ──────────────────────────────────────────────────────────────────

export const MODULES = [
  {
    icon: "🏢",
    name: "Core y sucursales",
    desc: "Maneja todas tus ubicaciones desde un solo sistema",
    features: [
      "Datos fiscales: RFC, razón social, régimen",
      "Múltiples sucursales con dirección y contacto",
      "Cada sucursal maneja su propio catálogo disponible",
      "Umbrales de alerta de stock por sucursal",
      "Cambio de sucursal en un clic",
      "Cerrar una sucursal y abrir otra sin perder su historial",
      "Una sucursal cerrada se consulta, pero ya no se cobra ni se opera",
    ],
  },
  {
    icon: "🔐",
    name: "Seguridad y accesos",
    desc: "Tú decides quién ve qué y hasta dónde puede operar",
    features: [
      "Roles personalizados por módulo y acción",
      "Cada persona sólo ve y opera sus sucursales asignadas",
      "Bloqueo automático por intentos fallidos",
      "Autenticación de dos factores (2FA)",
      "Trazabilidad: cada acción ligada a un usuario",
      "Altas de personal por liga: cada quien llena sus datos",
      "El rol y las sucursales los decide el negocio, no la liga",
    ],
  },
  {
    icon: "🗂️",
    name: "Catálogos",
    desc: "Productos, impuestos y unidades configurados a tu medida",
    features: [
      "Categorías jerárquicas de productos",
      "Unidades de medida: piezas, kilos, litros y más",
      "Tasas de impuesto: IVA, IEPS con retenciones",
      "Cambias un impuesto una vez y se actualiza en todos lados",
      "Catálogo maestro: escanea el código y el producto ya existe",
      "Claves del SAT con buscador y sinónimos oficiales",
      "Carga masiva por CSV y desde otro punto de venta",
    ],
  },
  {
    icon: "👥",
    name: "Clientes y proveedores",
    desc: "Historial, créditos y contactos siempre a la mano",
    features: [
      "Datos fiscales completos para facturación",
      "Límite de crédito medido contra sus cuentas abiertas",
      "Sin límite capturado es distinto de «no le fío nada»",
      "Descuento predeterminado por cliente",
      "Sus tickets y sus facturas, juntos, en su ficha",
      "Facturarle a alguien le abre su ficha de cliente",
      "Consentimiento de marketing respetado en todo mensaje",
    ],
  },
  {
    icon: "📦",
    name: "Inventario",
    desc: "Sabe exactamente cuánto tienes, dónde y cuánto vale en todo momento",
    features: [
      "Variantes: tallas, colores, sabores con SKU propio",
      "Presentaciones: suelto, por paquete y por caja, un solo stock",
      "Recetas y combos: lo que de verdad sale al vender",
      "Extras que se cobran aparte y descuentan su insumo",
      "Kardex que dice de qué venta salió y quién lo movió",
      "Alertas de mínimos y máximos de stock",
      "Traspasos entre sucursales",
      "Detección y fusión de productos duplicados",
      "Inventario físico con escáner desde el celular",
    ],
  },
  {
    icon: "🛒",
    name: "Compras",
    desc: "Controla qué pediste, qué llegó y cuánto debes pagar",
    features: [
      "Órdenes de compra con folio automático",
      "La orden sale por PDF, correo y WhatsApp",
      "Listas de precios del proveedor leídas de un PDF o una foto",
      "La segunda carga actualiza precios, no duplica el catálogo",
      "Recepción parcial o total contra orden",
      "Comprar por caja y que el costo por pieza cuadre solo",
      "Cuentas por pagar generadas automáticamente",
    ],
  },
  {
    icon: "💰",
    name: "Ventas y POS",
    desc: "Cobra rápido, aplica promociones y genera facturas al instante",
    features: [
      "Búsqueda por nombre, SKU o código de barras",
      "Múltiples métodos de pago en una sola venta",
      "Venta por peso: se captura en gramos, como marca la báscula",
      "Promociones con vigencia, condiciones y clientes dirigidos",
      "Modo offline que no cobra dos veces al reconectar",
      "Corte de caja por turno, con su propio PDF",
      "Ticket por correo y por WhatsApp con el PDF",
      "Factura CFDI 4.0 timbrada, total o por renglones",
    ],
  },
  {
    icon: "🧾",
    name: "Facturación CFDI",
    desc: "Timbra, cancela y entrega tus comprobantes sin salir del sistema",
    features: [
      "CFDI 4.0 timbrado con PAC autorizado",
      "Tu sello (CSD) nunca sale del sistema, ni para cancelar",
      "Una venta se factura completa o por renglones",
      "El receptor se precarga del cliente, sin reteclear el RFC",
      "Claves del SAT con buscador y sinónimos oficiales",
      "Cancelación con acuse y seguimiento de estado",
      "Se entrega por correo y WhatsApp: XML y PDF",
      "Facturar a alguien le abre su ficha de cliente",
    ],
  },
  {
    icon: "💳",
    name: "Finanzas",
    desc: "Ve tu flujo de dinero, cobros pendientes y gastos en tiempo real",
    features: [
      "Cuentas por cobrar con antigüedad de saldos",
      "Abonos parciales con su historial de pagos",
      "Sin plazo pactado, la cuenta no estrena un vencimiento",
      "Cuentas por pagar y vencimientos programados",
      "Gastos por categoría y centro de costos",
      "Cuentas bancarias en MXN, USD y EUR",
      "Utilidad y margen por producto, con el costo del día",
    ],
  },
  {
    icon: "👨‍💼",
    name: "Recursos humanos",
    desc: "Empleados, asistencias y datos de nómina en un solo lugar",
    features: [
      "Expediente: CURP, RFC, NSS, puesto, contrato",
      "El expediente completo en PDF, listo para entregar",
      "Control de ingreso y baja",
      "Registro de asistencia desde celular o tableta",
      "Justificación de ausencias con notas",
      "Reportes de asistencia por período",
    ],
  },
  {
    icon: "📋",
    name: "Auditoría",
    desc: "Registro completo de todo lo que pasa en tu negocio, siempre",
    features: [
      "Cada acción registrada: quién, cuándo y qué cambió",
      "Historial de movimientos en ventas, compras e inventario",
      "Movimientos filtrables por persona y por turno exacto",
      "Trazabilidad por usuario en todos los módulos",
      "Los datos de cada empresa, aislados de los demás",
      "Exportación de logs para revisión externa",
    ],
  },
] as const;

// ─── Diferenciadores ──────────────────────────────────────────────────────────

export const DIFFERENTIATORS = [
  {
    icon: "⚡",
    title: "Todo en tiempo real",
    desc: "Una venta actualiza el stock, el dashboard, las finanzas y la tienda en línea al instante. Sin recargar, sin esperar.",
  },
  {
    icon: "📶",
    title: "Funciona sin internet",
    desc: "El POS guarda ventas localmente y sincroniza al reconectar. Detecta conflictos automáticamente y te notifica.",
  },
  {
    icon: "🏗",
    title: "Modular y escalable",
    desc: "Empieza con lo básico. Activa módulos conforme crezcas, sin cambiar de sistema ni migrar datos.",
  },
  {
    icon: "🇲🇽",
    title: "Hecho para México",
    desc: "IVA, IEPS, IEPS retenciones y manejo fiscal mexicano. Todo resuelto desde adentro, sin complicaciones.",
  },
  {
    icon: "🔒",
    title: "Seguridad empresarial",
    desc: "2FA, bloqueo por intentos fallidos, tokens con expiración automática y auditoría completa de cada acción.",
  },
  {
    icon: "🤖",
    title: "IA integrada",
    desc: "TEZCA analiza tu negocio en segundo plano y te dice qué hacer, no solo qué pasó. Sin configuración extra.",
  },
  {
    icon: "🛍️",
    title: "Tienda en línea incluida",
    desc: "Tu catálogo público conectado al inventario en tiempo real. Sin doble captura, sin desincronía de stock.",
  },
  {
    icon: "📱",
    title: "Funciona en cualquier dispositivo",
    desc: "POS en tablet, inventario desde el celular, reportes en desktop. Un solo sistema, todos los dispositivos.",
  },
] as const;

// ─── Planes ───────────────────────────────────────────────────────────────────

export type PlanTier = "Básico" | "Profesional" | "Empresarial" | "Elite";

export const PLANS: {
  name: PlanTier;
  subtitle: string;
  price: string;
  oldPrice?: string;
  priceNote: string;
  promoLabel?: string;
  features: string[];
  highlight?: boolean;
  cta: string;
}[] = [
  {
    name: "Básico",
    subtitle: "Se cobra por cada sucursal activa",
    price: "$1,500",
    priceNote: "MXN / sucursal / mes",
    features: [
      "Inventario en tiempo real",
      "Ventas / POS offline",
      "Catálogo de clientes y productos",
      "3 usuarios",
      "Soporte por correo",
    ],
    cta: "Comenzar gratis",
  },
  {
    name: "Profesional",
    subtitle: "Se cobra por cada sucursal activa",
    price: "$2,000",
    priceNote: "MXN / sucursal / mes",
    features: [
      "Todo lo del plan Básico",
      "Compras y abastecimiento",
      "Finanzas: CxC, CxP, gastos",
      "Recursos Humanos",
      "TEZCA (50 consultas/día)",
      "10 usuarios",
    ],
    highlight: true,
    cta: "Empezar ahora",
  },
  {
    name: "Empresarial",
    subtitle: "Se cobra por cada sucursal activa",
    price: "$2,500",
    priceNote: "MXN / sucursal / mes",
    features: [
      "Todo lo del plan Profesional",
      "Tienda en Línea con Mercado Pago",
      "TEZCA avanzado (100 consultas/día)",
      "Generación de imágenes con IA",
      "Reportes extendidos y exportación",
      "30 usuarios",
      "Soporte prioritario",
    ],
    cta: "Solicitar demo",
  },
  {
    name: "Elite",
    subtitle: "Cotización a medida",
    price: "Personalizado",
    priceNote: "",
    features: [
      "Todo lo del plan Empresarial",
      "Usuarios y sucursales ilimitados",
      "TEZCA ilimitado + personalizado",
      "Integraciones a medida",
      "SLA garantizado por contrato",
      "Gerente de cuenta dedicado",
      "Onboarding y capacitación incluidos",
    ],
    cta: "Contactar ventas",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS = [
  { value: "10",   label: "Módulos integrados" },
  { value: "100%", label: "Mexicano y en la nube" },
  { value: "∞",    label: "Escalabilidad de módulos" },
  { value: "2FA",  label: "Seguridad empresarial" },
] as const;

// ─── TEZCA ────────────────────────────────────────────────────────────────────

export const TEZCA_QUESTIONS = [
  "¿Cuáles son mis productos más vendidos este mes?",
  "¿Qué cliente tiene la cuenta más antigua sin pagar?",
  "¿Debería hacer una promoción esta semana?",
  "¿Cuánto dinero en stock tengo detenido?",
  "¿Qué proveedor me da mejor margen?",
] as const;

export const TEZCA_INSIGHTS: { level: "urgent" | "warning" | "success" | "info"; text: string; action: string }[] = [
  { level: "urgent",  text: "El cliente ABC lleva 12 días sin pagar su factura.", action: "Ver cuenta →" },
  { level: "warning", text: "Stock de Producto X al 15%. Considera reabastecer.",  action: "Crear OC →" },
  { level: "success", text: "Llevas 5 ventas hoy. ¡Buen ritmo para la tarde!",     action: "Ver ventas →" },
  { level: "info",    text: "Tu ticket promedio subió un 8% esta semana.",          action: "Ver reporte →" },
];

export const TEZCA_BADGES = [
  { icon: "🏆", name: "Primera Venta",     desc: "Registraste tu primera transacción en el sistema" },
  { icon: "🔥", name: "Racha de Ventas",   desc: "Vendes varios días consecutivos sin parar" },
  { icon: "🎯", name: "Meta Mensual",      desc: "Alcanzaste tu objetivo de ventas del mes" },
  { icon: "💯", name: "100 Ventas",        desc: "Acumulaste 100 transacciones registradas" },
  { icon: "📦", name: "Inventario Limpio", desc: "Ningún producto sin movimiento en tu stock" },
  { icon: "⭐", name: "Super Vendedor",    desc: "Superaste un umbral de ventas destacado" },
] as const;

export const TEZCA_FEATURES = [
  { icon: "🎨", label: "Genera imágenes de productos con IA" },
  { icon: "🏆", label: "Insignias y logros automáticos" },
  { icon: "🔗", label: "Conectado con tus datos en tiempo real" },
  { icon: "⏱",  label: "Analiza tu negocio cada hora en segundo plano" },
  { icon: "💬", label: "Historial completo de conversaciones" },
  { icon: "📊", label: "Acciones sugeridas con cada insight" },
] as const;

// ─── Dashboard metrics ────────────────────────────────────────────────────────

export const DASHBOARD_METRICS = [
  { label: "Ventas del día",   value: "$48,320", change: "+12%", changeType: "up",      progress: 78 },
  { label: "Utilidad bruta",   value: "$14,210", change: "+8%",  changeType: "up",      progress: 60 },
  { label: "Ticket promedio",  value: "$960",    change: "+3%",  changeType: "neutral", progress: 45 },
] as const;

// ─── Security ─────────────────────────────────────────────────────────────────

export const SECURITY_FEATURES = [
  { icon: "🔐", title: "2FA activable",          desc: "Código de un solo uso (OTP) en cada inicio de sesión, además de la contraseña." },
  { icon: "🏢", title: "Multitenancy aislado",   desc: "Los datos de cada empresa están completamente separados de los demás. Nadie ve tu información." },
  { icon: "📋", title: "Auditoría completa",     desc: "Cada acción queda registrada: quién la hizo, cuándo y exactamente qué cambió." },
  { icon: "🔑", title: "Tokens con expiración",  desc: "Los accesos expiran automáticamente. Sin sesiones abiertas de por vida." },
  { icon: "🚫", title: "Bloqueo automático",     desc: "Intentos fallidos de acceso bloquean la cuenta y generan una alerta al administrador." },
  { icon: "☁️", title: "Infraestructura robusta", desc: "Contenedores Docker en la nube (AWS/Azure/DigitalOcean) con CI/CD automatizado." },
] as const;
