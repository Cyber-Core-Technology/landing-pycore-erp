/*
  Los documentos que el sistema entrega, con los mismos datos que llevan los
  PDF descargables de `public/ejemplos/`.

  La vista previa de la landing y el PDF salen de aquí a propósito: si se
  escribieran por separado, la hoja que se mira en pantalla y la que se baja
  dejarían de decir lo mismo — que es exactamente el defecto que el ERP
  resuelve teniendo un solo `ticket_formato` para los tres canales.

  Los datos son del negocio de demostración: inventados, pero con la forma y
  las proporciones de un abarrotes real. Ninguna cifra pretende ser un dato de
  mercado.
*/

export type Cifra = { label: string; value: string; sub?: string };

export type Alineacion = "left" | "right";

export type Tabla = {
  rotulo: string;
  head: string[];
  rows: string[][];
  aligns?: Alineacion[];
  /** Cuántos renglones se enseñan en la vista previa; el PDF lleva todos. */
  previa?: number;
};

export type Familia = "banda" | "ticket";

export type DocumentoEjemplo = {
  slug: string;
  nombre: string;
  /** De qué módulo sale. */
  modulo: string;
  icon: string;
  familia: Familia;
  formato: string;
  paginas: number;
  /** Lo que pesa el archivo: se dice antes de que alguien lo baje. */
  peso: string;
  archivo: string;
  /** Qué es el documento, en una línea. */
  resumen: string;
  /** Por qué la hoja es así. Es lo que distingue un ejemplo de un adorno. */
  porque: string;
  banda: {
    titulo: string;
    empresa: string;
    contexto?: string;
    derecha?: string[];
  };
  contexto?: string[];
  cifras?: Cifra[];
  tablas?: Tabla[];
};

const EMPRESA = "Abarrotes La Esperanza";

// ── 1. Reporte de ventas ────────────────────────────────────────────────────
const reporteVentas: DocumentoEjemplo = {
  slug: "reporte-ventas",
  nombre: "Reporte de ventas",
  modulo: "Reportes",
  icon: "chart",
  familia: "banda",
  formato: "A4 vertical",
  paginas: 1,
  peso: "11 KB",
  archivo: "/ejemplos/pycore-reporte-ventas.pdf",
  resumen:
    "Todo lo vendido en el período, con el total, el ticket promedio y la utilidad calculada sobre el costo del día en que salió cada pieza.",
  porque:
    "Los totales del encabezado los calcula el servidor sobre el conjunto completo, no sumando la página que se está viendo: así es como un reporte acaba diciendo $4,200 de un mes que corrió $80,000.",
  banda: {
    titulo: "Reporte de ventas",
    empresa: EMPRESA,
    contexto: "Sucursal Centro",
    derecha: ["Período: 01/10/2026 – 24/10/2026"],
  },
  contexto: [
    "Generado: 24/10/2026 21:05",
    "Sucursal: Centro",
    "Estado: Completadas",
  ],
  cifras: [
    { label: "Ventas", value: "418", sub: "+12.4% vs. mes anterior" },
    { label: "Importe total", value: "$312,480.60", sub: "IVA incluido" },
    { label: "Ticket promedio", value: "$747.56", sub: "+3.1% vs. mes anterior" },
    { label: "Utilidad bruta", value: "$94,217.30", sub: "margen 30.2%" },
  ],
  tablas: [
    {
      rotulo: "VENTAS DEL PERÍODO",
      head: ["Folio", "Fecha y hora", "Cliente", "Forma de pago", "Artículos", "Total"],
      aligns: ["left", "left", "left", "left", "right", "right"],
      previa: 8,
      rows: [
        ["VEN-00418", "24/10/2026 20:41", "Público en general", "Efectivo", "6", "$184.50"],
        ["VEN-00417", "24/10/2026 20:12", "María Elena Cruz", "Tarjeta débito", "11", "$612.00"],
        ["VEN-00416", "24/10/2026 19:58", "Público en general", "Efectivo", "3", "$78.00"],
        ["VEN-00415", "24/10/2026 19:34", "Abarrotes Don Chuy", "Crédito 15 días", "42", "$3,890.40"],
        ["VEN-00414", "24/10/2026 19:02", "Público en general", "Efectivo", "2", "$46.50"],
        ["VEN-00413", "24/10/2026 18:47", "José Luis Ramírez", "Transferencia", "18", "$1,245.80"],
        ["VEN-00412", "24/10/2026 18:21", "Público en general", "Efectivo", "8", "$256.00"],
        ["VEN-00411", "24/10/2026 17:55", "Lonchería El Güero", "Crédito 30 días", "27", "$2,104.60"],
        ["VEN-00410", "24/10/2026 17:30", "Público en general", "Tarjeta crédito", "5", "$398.00"],
        ["VEN-00409", "24/10/2026 17:08", "Público en general", "Efectivo", "4", "$112.50"],
        ["VEN-00408", "24/10/2026 16:44", "Guadalupe Hernández", "Efectivo", "14", "$724.30"],
        ["VEN-00407", "24/10/2026 16:19", "Público en general", "Efectivo", "7", "$203.00"],
        ["VEN-00406", "24/10/2026 15:52", "Cremería Santa Fe", "Crédito 15 días", "31", "$2,678.90"],
        ["VEN-00405", "24/10/2026 15:28", "Público en general", "Tarjeta débito", "9", "$467.20"],
        ["VEN-00404", "24/10/2026 15:03", "Público en general", "Efectivo", "2", "$58.00"],
        ["VEN-00403", "24/10/2026 14:41", "Martha Patricia Ríos", "Efectivo", "16", "$891.40"],
        ["VEN-00402", "24/10/2026 14:15", "Público en general", "Efectivo", "5", "$147.50"],
        ["VEN-00401", "24/10/2026 13:50", "Taquería Los Primos", "Crédito 30 días", "38", "$3,215.70"],
        ["VEN-00400", "24/10/2026 13:22", "Público en general", "Transferencia", "12", "$684.00"],
        ["VEN-00399", "24/10/2026 12:58", "Público en general", "Efectivo", "3", "$92.00"],
        ["VEN-00398", "24/10/2026 12:31", "Rosa María Aguilar", "Tarjeta débito", "21", "$1,432.60"],
        ["VEN-00397", "24/10/2026 12:04", "Público en general", "Efectivo", "6", "$178.50"],
        ["VEN-00396", "24/10/2026 11:39", "Público en general", "Efectivo", "4", "$124.00"],
        ["VEN-00395", "24/10/2026 11:12", "Minisúper El Roble", "Crédito 15 días", "45", "$4,102.30"],
        ["VEN-00394", "24/10/2026 10:48", "Público en general", "Efectivo", "8", "$289.70"],
        ["VEN-00393", "24/10/2026 10:21", "Fernando Méndez", "Transferencia", "13", "$798.40"],
        ["VEN-00392", "24/10/2026 09:57", "Público en general", "Efectivo", "2", "$64.00"],
        ["VEN-00391", "24/10/2026 09:30", "Público en general", "Tarjeta débito", "10", "$534.80"],
        ["VEN-00390", "24/10/2026 09:04", "Carnicería La Bonita", "Crédito 30 días", "29", "$2,456.10"],
        ["VEN-00389", "24/10/2026 08:38", "Público en general", "Efectivo", "5", "$156.00"],
      ],
    },
  ],
};

// ── 2. Corte por día ────────────────────────────────────────────────────────
const cortePorDia: DocumentoEjemplo = {
  slug: "corte-por-dia",
  nombre: "Corte por día",
  modulo: "Ventas · Caja",
  icon: "money",
  familia: "banda",
  formato: "A4 vertical",
  paginas: 1,
  peso: "10 KB",
  archivo: "/ejemplos/pycore-corte-por-dia.pdf",
  resumen:
    "El cierre de un turno: fondo inicial, lo vendido por forma de pago, los movimientos de caja y el efectivo contado contra el esperado.",
  porque:
    "El faltante se dice, no se esconde: $8.10 de diferencia sobre $9,318 es la cifra por la que se abre una conversación con el cajero. Un corte no se puede cerrar con ventas sin sincronizar, porque el esperado saldría corto y acusaría un faltante que no existe.",
  banda: {
    titulo: "Corte por día",
    empresa: EMPRESA,
    contexto: "Sucursal Centro  ·  Turno vespertino",
    derecha: ["Folio: COR-CEN-00231", "Sábado 24/10/2026"],
  },
  contexto: ["Abrió: 14:00  ·  Cerró: 21:30", "Cajero: Guadalupe Hernández Soto"],
  cifras: [
    { label: "Fondo inicial", value: "$1,500.00" },
    { label: "Ventas del turno", value: "$18,742.30", sub: "24 ventas" },
    { label: "Efectivo esperado", value: "$9,318.10" },
    { label: "Efectivo contado", value: "$9,310.00", sub: "faltante $8.10" },
  ],
  tablas: [
    {
      rotulo: "DESGLOSE POR FORMA DE PAGO",
      head: ["Forma de pago", "Ventas", "Importe", "% del turno"],
      aligns: ["left", "right", "right", "right"],
      rows: [
        ["Efectivo", "13", "$7,818.10", "41.7%"],
        ["Tarjeta de débito", "4", "$3,214.00", "17.1%"],
        ["Tarjeta de crédito", "2", "$1,186.40", "6.3%"],
        ["Transferencia", "2", "$1,482.40", "7.9%"],
        ["Crédito a clientes", "3", "$5,041.40", "26.9%"],
      ],
    },
    {
      rotulo: "MOVIMIENTOS DE CAJA",
      head: ["Hora", "Concepto", "Registró", "Entrada", "Salida"],
      aligns: ["left", "left", "left", "right", "right"],
      previa: 6,
      rows: [
        ["14:00", "Fondo inicial del turno", "G. Hernández", "$1,500.00", "—"],
        ["16:10", "Cobro CxC — Lonchería El Güero", "G. Hernández", "$2,104.60", "—"],
        ["17:45", "Gasto — garrafón de agua y hielo", "G. Hernández", "—", "$185.00"],
        ["18:30", "Retiro parcial a bóveda", "R. Callejas", "—", "$6,000.00"],
        ["19:20", "Cobro CxC — Taquería Los Primos", "G. Hernández", "$1,500.00", "—"],
        ["21:30", "Cierre de turno", "G. Hernández", "—", "—"],
      ],
    },
    {
      rotulo: "LO MÁS VENDIDO DEL TURNO",
      head: ["Producto", "Cantidad", "Importe", "Utilidad"],
      aligns: ["left", "right", "right", "right"],
      previa: 5,
      rows: [
        ["Coca-Cola 600 ml", "48 pza", "$1,056.00", "$268.80"],
        ["Tortilla de maíz", "32.50 kg", "$747.50", "$227.50"],
        ["Huevo blanco a granel", "28.20 kg", "$1,297.20", "$310.20"],
        ["Leche Lala entera 1 L", "24 pza", "$648.00", "$134.40"],
        ["Sabritas original 45 g", "37 pza", "$703.00", "$203.50"],
        ["Pan Bimbo grande", "14 pza", "$854.00", "$196.00"],
        ["Jamón de pavo a granel", "6.40 kg", "$832.00", "$256.00"],
      ],
    },
  ],
};

// ── 3. Expediente de RRHH ───────────────────────────────────────────────────
const expediente: DocumentoEjemplo = {
  slug: "expediente",
  nombre: "Expediente de empleado",
  modulo: "Recursos humanos",
  icon: "briefcase",
  familia: "banda",
  formato: "A4 vertical",
  paginas: 1,
  peso: "10 KB",
  archivo: "/ejemplos/pycore-expediente-rrhh.pdf",
  resumen:
    "La ficha completa de una persona: identificación, relación laboral y su asistencia del mes, con entradas, salidas, retardos y las ausencias justificadas.",
  porque:
    "Es el papel que se entrega cuando alguien lo pide —el banco, el IMSS, un trámite—, así que lleva CURP, RFC y NSS en el mismo renglón en que los pide el formato, y la asistencia con la nota de por qué faltó.",
  banda: {
    titulo: "Expediente",
    empresa: EMPRESA,
    contexto: "Sucursal Centro",
    derecha: ["Empleado: EMP-00014", "Generado: 24/10/2026"],
  },
  cifras: [
    { label: "Antigüedad", value: "3 a 7 m" },
    { label: "Asistencias (mes)", value: "22 / 24", sub: "1 falta · 1 justificada" },
    { label: "Puntualidad", value: "95.5%", sub: "1 retardo" },
    { label: "Sueldo diario", value: "$428.00", sub: "integrado $452.84" },
  ],
  tablas: [
    {
      rotulo: "DATOS DE IDENTIFICACIÓN",
      head: ["Campo", "Valor", "Campo", "Valor"],
      rows: [
        ["Nombre", "Guadalupe Hernández Soto", "CURP", "HESG900412MDFRLD03"],
        ["RFC", "HESG900412H42", "NSS", "12-09-90-4125-6"],
        ["Nacimiento", "12/04/1990", "Estado civil", "Casada"],
        ["Domicilio", "Av. Hidalgo 412, Col. Centro", "C.P.", "06000"],
        ["Teléfono", "55 1234 5678", "Correo", "guadalupe.hs@correo.mx"],
      ],
    },
    {
      rotulo: "RELACIÓN LABORAL",
      head: ["Campo", "Valor", "Campo", "Valor"],
      previa: 5,
      rows: [
        ["Puesto", "Cajera principal", "Departamento", "Punto de venta"],
        ["Ingreso", "15/03/2023", "Tipo de contrato", "Indeterminado"],
        ["Jornada", "Diurna — 48 h semanales", "Sucursal", "Centro"],
        ["Jefe directo", "Raúl Callejas Mora", "Régimen", "Sueldos y salarios"],
        ["Periodicidad", "Quincenal", "Forma de pago", "Transferencia"],
      ],
    },
    {
      rotulo: "ASISTENCIA — OCTUBRE 2026",
      head: ["Fecha", "Entrada", "Salida", "Horas", "Estado", "Nota"],
      aligns: ["left", "right", "right", "right", "left", "left"],
      previa: 6,
      rows: [
        ["24/10/2026", "13:52", "21:34", "7:42", "Asistencia", "—"],
        ["23/10/2026", "13:58", "21:12", "7:14", "Asistencia", "—"],
        ["22/10/2026", "14:21", "21:30", "7:09", "Retardo", "Tráfico en Eje Central"],
        ["21/10/2026", "—", "—", "—", "Justificada", "Cita médica IMSS"],
        ["20/10/2026", "13:49", "21:18", "7:29", "Asistencia", "—"],
        ["19/10/2026", "—", "—", "—", "Descanso", "—"],
        ["18/10/2026", "13:55", "21:40", "7:45", "Asistencia", "—"],
        ["17/10/2026", "13:51", "21:22", "7:31", "Asistencia", "—"],
        ["16/10/2026", "—", "—", "—", "Falta", "Sin aviso"],
        ["15/10/2026", "13:47", "21:15", "7:28", "Asistencia", "—"],
      ],
    },
  ],
};

// ── 4. Resumen programado de TEZCA ──────────────────────────────────────────
const resumenTezca: DocumentoEjemplo = {
  slug: "resumen-tezca",
  nombre: "Resumen diario de TEZCA",
  modulo: "TEZCA · Alertas",
  icon: "robot",
  familia: "banda",
  formato: "A4 vertical",
  paginas: 2,
  peso: "13 KB",
  archivo: "/ejemplos/pycore-resumen-tezca.pdf",
  resumen:
    "Todo lo que pasó ayer en el negocio, en una hoja: ventas por sucursal y forma de pago, cada ajuste de inventario con quién lo hizo, el stock crítico y las cuentas vencidas.",
  porque:
    "Llega solo a las 8 de la mañana por correo y WhatsApp, sin que nadie abra la aplicación: lo arma el worker, no el navegador. Y la comparación es contra el mismo día de la semana pasada, porque un viernes contra un lunes no compara nada.",
  banda: {
    titulo: "Resumen diario",
    empresa: EMPRESA,
    contexto: "Todas las sucursales",
    derecha: ["Período: viernes 23/10/2026", "Generado: 24/10/2026 08:00"],
  },
  cifras: [
    { label: "Importe", value: "$41,286.50", sub: "+6.8% vs. viernes pasado" },
    { label: "Ventas", value: "56", sub: "+4 vs. viernes pasado" },
    { label: "Ticket promedio", value: "$737.26", sub: "-0.4% vs. viernes pasado" },
    { label: "Utilidad bruta", value: "$12,604.20", sub: "margen 30.5%" },
  ],
  tablas: [
    {
      rotulo: "VENTAS POR SUCURSAL",
      head: ["Sucursal", "Ventas", "Importe", "Utilidad", "Margen"],
      aligns: ["left", "right", "right", "right", "right"],
      rows: [
        ["Centro", "34", "$26,418.40", "$8,142.10", "30.8%"],
        ["Norte", "15", "$10,204.60", "$3,021.40", "29.6%"],
        ["Sur", "7", "$4,663.50", "$1,440.70", "30.9%"],
      ],
    },
    {
      rotulo: "AJUSTES DE INVENTARIO — Y QUIÉN LOS HIZO",
      head: ["Hora", "Producto", "Sucursal", "Antes", "Después", "Registró", "Motivo"],
      aligns: ["left", "left", "left", "right", "right", "left", "left"],
      previa: 4,
      rows: [
        ["09:14", "Huevo blanco a granel", "Centro", "42.00 kg", "38.60 kg", "R. Callejas", "Merma — cartón roto"],
        ["12:40", "Leche Lala entera 1 L", "Norte", "36 pza", "34 pza", "A. Jiménez", "Caducidad"],
        ["17:02", "Tortilla de maíz", "Centro", "18.00 kg", "21.50 kg", "G. Hernández", "Conteo físico"],
        ["19:55", "Sabritas original 45 g", "Sur", "52 pza", "49 pza", "M. Pérez", "Merma — bolsa ponchada"],
      ],
    },
    {
      rotulo: "CUENTAS VENCIDAS",
      head: ["Cliente", "Folio", "Vencimiento", "Días", "Saldo"],
      aligns: ["left", "left", "left", "right", "right"],
      previa: 4,
      rows: [
        ["Lonchería El Güero", "CXC-00184", "09/10/2026", "15", "$3,104.60"],
        ["Taquería Los Primos", "CXC-00176", "14/10/2026", "10", "$2,815.70"],
        ["Carnicería La Bonita", "CXC-00169", "19/10/2026", "5", "$2,456.10"],
        ["Abarrotes Don Chuy", "CXC-00191", "21/10/2026", "3", "$827.70"],
      ],
    },
  ],
};

// ── 5. El ticket de 80 mm ───────────────────────────────────────────────────
export type Ticket = {
  empresa: string;
  sucursal: string;
  direccion: string;
  fiscal: string;
  folio: string;
  fecha: string;
  cajero: string;
  lineas: { nombre: string; cantidad: string; precio: string; importe: string; extra?: boolean }[];
  totales: { label: string; value: string; fuerte?: boolean }[];
  pago: { label: string; value: string }[];
};

export const TICKET: Ticket = {
  empresa: EMPRESA,
  sucursal: "Sucursal Centro",
  direccion: "Av. Hidalgo 412, Col. Centro, CDMX",
  fiscal: "RFC: AES900412H42  ·  Tel. 55 1234 5678",
  folio: "VEN-00418",
  fecha: "24/10/2026 20:41  ·  Caja 1",
  cajero: "Le atendió: Guadalupe H.",
  lineas: [
    { nombre: "Coca-Cola 600 ml", cantidad: "2 pza", precio: "$22.00", importe: "$44.00" },
    { nombre: "Sabritas original 45 g", cantidad: "1 pza", precio: "$19.00", importe: "$19.00" },
    { nombre: "Tortilla de maíz", cantidad: "1.250 kg", precio: "$23.00", importe: "$28.75" },
    { nombre: "Huevo blanco a granel", cantidad: "0.980 kg", precio: "$46.00", importe: "$45.08" },
    { nombre: "Leche Lala entera 1 L", cantidad: "2 pza", precio: "$27.00", importe: "$54.00" },
    { nombre: "Pan Bimbo grande", cantidad: "1 pza", precio: "$61.00", importe: "$61.00" },
    { nombre: "Jamón de pavo a granel", cantidad: "0.300 kg", precio: "$130.00", importe: "$39.00" },
    { nombre: "+ 1 bolsa reutilizable", cantidad: "1 pza", precio: "$5.00", importe: "$5.00", extra: true },
  ],
  totales: [
    { label: "Subtotal", value: "$254.16" },
    { label: "IVA 16%", value: "$40.67" },
    { label: "TOTAL", value: "$294.83", fuerte: true },
  ],
  pago: [
    { label: "Efectivo", value: "$300.00" },
    { label: "Cambio", value: "$5.17" },
  ],
};

const ticket: DocumentoEjemplo = {
  slug: "ticket",
  nombre: "Ticket de venta",
  modulo: "Punto de venta",
  icon: "receipt",
  familia: "ticket",
  formato: "Rollo de 80 mm",
  paginas: 1,
  peso: "2.8 KB",
  archivo: "/ejemplos/pycore-ticket-venta.pdf",
  resumen:
    "El comprobante del mostrador, tal como sale de la impresora térmica — y el mismo archivo que se manda por correo y por WhatsApp.",
  porque:
    "Éste no sigue la hoja de los demás a propósito: son 80 mm de papel y ahí el ancho manda sobre cualquier idea de diseño. El granel va en gramos porque es lo que marca la báscula, y el extra se cobra en su propio renglón debajo del producto al que se le puso.",
  banda: { titulo: "Ticket de venta", empresa: EMPRESA },
};

// ── El conjunto ─────────────────────────────────────────────────────────────
/** El que se enseña al llegar. Va con nombre propio porque `DOCUMENTOS[0]`
    no le garantiza a nadie que la lista no esté vacía. */
export const DOCUMENTO_INICIAL: DocumentoEjemplo = reporteVentas;

export const DOCUMENTOS: DocumentoEjemplo[] = [
  reporteVentas,
  cortePorDia,
  resumenTezca,
  expediente,
  ticket,
];

/*
  Las dos familias que NO se tocan, y por qué. Se nombran en la landing porque
  no decirlo haría pensar que el sistema no las emite — y porque la razón por
  la que su forma no se elige es, en sí, la respuesta a «¿esto sirve para
  facturar?».
*/
export const DOCUMENTOS_INTOCABLES = [
  {
    icon: "receipt",
    nombre: "Representación impresa del CFDI",
    nota:
      "Su forma la dicta el SAT y se arma desde el XML timbrado, no desde la base de datos: el XML es el comprobante válido y la hoja no puede contradecirlo.",
  },
  {
    icon: "clipboard",
    nombre: "Orden de compra",
    nota:
      "Es el otro documento formal que el negocio entrega a un tercero, así que sigue a propósito la maqueta del CFDI. Habla en la clave del proveedor, no en la tuya.",
  },
];
