/*
  La lógica de El Mostrador, aparte de la pantalla.

  Vive suelta de React a propósito: lo que hay que poder comprobar de un punto
  de venta no es que pinte, es que **sume bien, descuente bien y se niegue a
  cobrar lo que no debe**. Con la aritmética dentro de un componente eso sólo
  se puede probar montando el árbol entero.

  Las reglas de aquí son las del ERP, portadas una por una. Donde la
  simulación no puede ser el sistema, no finge que lo es — no guarda nada, y
  la pantalla lo dice.
*/

export type ProductoDemo = {
  id: string;
  nombre: string;
  codigo_barras: string;
  sku: string;
  categoria: string;
  unidad: string;
  granel: boolean;
  precio: number;
  costo: number;
  tasa_impuesto: number;
  stock: number;
  presentaciones?: { nombre: string; factor: number; precio: number }[];
  autoria_presentaciones?: string;
  /** Otra cosa, con **su propio stock** — no es una presentación. */
  variantes?: { nombre: string; stock: number }[];
  autoria_variantes?: string;
  /** Qué extras admite este producto. No todos admiten los mismos. */
  extras?: string[];
  autoria_extras?: string;
};

export type ExtraDemo = {
  id: string;
  nombre: string;
  precio: number;
  tasa_impuesto: number;
};

export type CatalogoDemo = {
  empresa: { nombre: string; sucursal: string };
  generado: string;
  productos: ProductoDemo[];
  extras: ExtraDemo[];
};

export type Linea = {
  /** Identidad de la línea, no del producto: el mismo producto puede ir dos
      veces con presentaciones distintas. */
  uid: string;
  producto: ProductoDemo;
  /** Índice en `producto.presentaciones`, o null si el producto no tiene. */
  presentacion: number | null;
  /** Índice en `producto.variantes`, o null. Cada variante tiene su stock. */
  variante: number | null;
  /**
   * Lo que el cliente se lleva, en la unidad que eligió: piezas, cartones o
   * **gramos** si es granel. La existencia se mide en unidad base — es la
   * regla del ERP: la presentación convierte en los bordes y nada más abajo
   * se entera.
   */
  cantidad: number;
};

export type LineaExtra = {
  uid: string;
  extra: ExtraDemo;
  /** Veces, de toda la línea. No por pieza. */
  veces: number;
  /** La línea a la que se le puso. */
  padre: string;
};

export type Ticket = {
  lineas: {
    nombre: string;
    detalle: string;
    cantidad: string;
    precioUnitario: number;
    importe: number;
    esExtra: boolean;
  }[];
  subtotal: number;
  impuesto: number;
  total: number;
  articulos: number;
};

/** Un kilo son mil gramos, y sólo el kilogramo se convierte. */
export const GRAMOS_POR_KILO = 1000;

const redondear = (n: number) => Math.round(n * 100) / 100;

export const mxn = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });

/*
  La llave con que se mide la existencia.

  Una variante **no comparte stock** con su producto: la playera roja y la
  azul son dos existencias. Una presentación sí lo comparte —es la misma cosa
  medida distinto—, así que no entra en la llave.
*/
export function claveStock(producto: ProductoDemo, variante: number | null): string {
  return variante === null ? producto.id : `${producto.id}::${variante}`;
}

/** El precio de la unidad que el cliente eligió. Absoluto, nunca derivado. */
export function precioUnitario(l: Linea): number {
  const p = l.presentacion;
  if (p !== null && l.producto.presentaciones?.[p]) {
    return l.producto.presentaciones[p].precio;
  }
  return l.producto.precio;
}

/** Cuántas unidades base consume una línea. Es lo que ve el almacén. */
export function cantidadBase(l: Linea): number {
  if (l.producto.granel) return l.cantidad / GRAMOS_POR_KILO;
  const p = l.presentacion;
  const factor = p !== null ? (l.producto.presentaciones?.[p]?.factor ?? 1) : 1;
  return l.cantidad * factor;
}

/** El importe de la línea, con impuesto incluido — el precio de mostrador. */
export function importeLinea(l: Linea): number {
  if (l.producto.granel) {
    // Al granel el precio es por kilo y lo que se teclea son gramos.
    return redondear((l.cantidad / GRAMOS_POR_KILO) * l.producto.precio);
  }
  return redondear(l.cantidad * precioUnitario(l));
}

export function importeExtra(e: LineaExtra): number {
  return redondear(e.veces * e.extra.precio);
}

/** Gramos que corresponden a un importe. Es la conversión al revés. */
export function gramosDesdeImporte(precioKilo: number, importe: number): number {
  if (precioKilo <= 0) return 0;
  return Math.round((importe / precioKilo) * GRAMOS_POR_KILO);
}

/*
  Lo que sale del almacén, sumando TODO el ticket.

  Mirando cada renglón por su lado, dos líneas del mismo producto dicen las
  dos que alcanza. Es el mismo defecto que el ERP arregla validando la
  existencia sobre el ticket completo.
*/
export function consumoPorProducto(lineas: Linea[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const l of lineas) {
    const k = claveStock(l.producto, l.variante);
    m.set(k, redondear((m.get(k) ?? 0) + cantidadBase(l)));
  }
  return m;
}

/** El nombre que se enseña: el producto, y su variante si la eligió. */
export function nombreLinea(l: Linea): string {
  const v = l.variante !== null ? l.producto.variantes?.[l.variante]?.nombre : null;
  return v ? `${l.producto.nombre} · ${v}` : l.producto.nombre;
}

export type Problema = { tipo: "sin_pesar" | "sin_cantidad" | "sin_stock"; mensaje: string };

/*
  Por qué no se puede cobrar.

  Una línea en 0 **no es una venta de $0**: es un producto que nadie pesó. Y
  el error de existencia se explica en las dos unidades, porque «disponible
  12, requerido 20» no le dice a nadie qué hacer.
*/
export function problemasParaCobrar(lineas: Linea[], stock: Map<string, number>): Problema[] {
  const out: Problema[] = [];

  for (const l of lineas) {
    if (l.cantidad > 0) continue;
    out.push(
      l.producto.granel
        ? { tipo: "sin_pesar", mensaje: `Falta pesar ${nombreLinea(l)}.` }
        : { tipo: "sin_cantidad", mensaje: `${nombreLinea(l)} va en cero.` },
    );
  }

  for (const [clave, necesita] of consumoPorProducto(lineas)) {
    const hay = stock.get(clave) ?? 0;
    if (necesita <= hay + 1e-9) continue;
    const l = lineas.find((x) => claveStock(x.producto, x.variante) === clave)!;
    const u = l.producto.unidad;
    out.push({
      tipo: "sin_stock",
      mensaje: `No alcanza para ${nombreLinea(l)}: quedan ${redondear(hay)} ${u} y se necesitan ${redondear(necesita)} ${u}.`,
    });
  }

  return out;
}

/*
  El ticket.

  El impuesto se desglosa **por línea** con la tasa de su producto, no con una
  tasa global: un ticket con despensa al 0% y refresco al 16% no tiene una
  sola tasa, y «IVA 16%» fijo mentiría. Los precios del catálogo ya traen el
  impuesto dentro, así que se extrae hacia atrás.

  Los extras se insertan **debajo de su línea**, no al final: es el orden de
  `ticket_formato.en_orden_de_ticket` del ERP.
*/
export function construirTicket(lineas: Linea[], extras: LineaExtra[]): Ticket {
  const filas: Ticket["lineas"] = [];
  let subtotal = 0;
  let impuesto = 0;
  let articulos = 0;

  const sumar = (importe: number, tasa: number) => {
    const base = redondear(importe / (1 + tasa));
    subtotal = redondear(subtotal + base);
    impuesto = redondear(impuesto + (importe - base));
  };

  for (const l of lineas) {
    const importe = importeLinea(l);
    const pu = l.producto.granel ? l.producto.precio : precioUnitario(l);
    const nombrePres =
      l.presentacion !== null ? l.producto.presentaciones?.[l.presentacion]?.nombre : null;

    filas.push({
      nombre: nombreLinea(l),
      detalle: nombrePres && l.presentacion !== 0 ? nombrePres : "",
      cantidad: l.producto.granel
        ? `${l.cantidad} g`
        : `${l.cantidad} ${nombrePres ?? l.producto.unidad}`,
      precioUnitario: pu,
      importe,
      esExtra: false,
    });
    sumar(importe, l.producto.tasa_impuesto);
    articulos += l.producto.granel ? 1 : l.cantidad;

    for (const e of extras.filter((x) => x.padre === l.uid)) {
      const imp = importeExtra(e);
      filas.push({
        nombre: `+ ${e.extra.nombre}`,
        detalle: "",
        cantidad: `${e.veces} ${e.veces === 1 ? "vez" : "veces"}`,
        precioUnitario: e.extra.precio,
        importe: imp,
        esExtra: true,
      });
      sumar(imp, e.extra.tasa_impuesto);
      articulos += e.veces;
    }
  }

  return {
    lineas: filas,
    subtotal: redondear(subtotal),
    impuesto: redondear(impuesto),
    total: redondear(subtotal + impuesto),
    articulos,
  };
}

/** La búsqueda del mostrador: por nombre, por SKU y por código de barras. */
export function buscar(productos: ProductoDemo[], q: string): ProductoDemo[] {
  const t = q.trim().toLowerCase();
  if (!t) return productos;
  return productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(t) ||
      p.sku.toLowerCase().includes(t) ||
      p.codigo_barras.includes(t) ||
      p.categoria.toLowerCase().includes(t),
  );
}

/*
  Escanear un código devuelve la presentación **ya elegida**: el código del
  cartón es suyo, y leerlo mete doce piezas sin que el cajero decida nada. El
  del producto sigue ganando.
*/
export function porCodigoDeBarras(productos: ProductoDemo[], codigo: string): ProductoDemo | null {
  const c = codigo.trim();
  if (!c) return null;
  return productos.find((p) => p.codigo_barras === c) ?? null;
}

/*
  Las cuatro formas en que un producto deja de ser «una cosa con un precio»,
  y que el selector tiene que distinguir de un vistazo.

  Son conceptos distintos y confundirlos es el error clásico:
  la **variante** es otra cosa con su propio stock; la **presentación** es la
  misma cosa medida distinto y comparte stock; el **granel** se pesa; el
  **extra** es opcional y se cobra aparte.
*/
export type Etiqueta = { texto: string; tono: "granel" | "presentacion" | "variante" | "extra" };

export function etiquetasProducto(p: ProductoDemo): Etiqueta[] {
  const out: Etiqueta[] = [];
  if (p.granel) out.push({ texto: "Granel", tono: "granel" });
  if (p.presentaciones?.length) {
    out.push({ texto: `${p.presentaciones.length} empaques`, tono: "presentacion" });
  }
  if (p.variantes?.length) {
    out.push({ texto: `${p.variantes.length} variantes`, tono: "variante" });
  }
  if (p.extras?.length) out.push({ texto: "Con extras", tono: "extra" });
  return out;
}

/*
  La existencia de salida.

  Un producto con variantes **no tiene existencia propia**: la tiene cada
  variante. Dejarle además la suya sería contar la mercancía dos veces, que
  es justo lo que parte un inventario en dos verdades.
*/
export function stockInicial(productos: ProductoDemo[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const p of productos) {
    if (p.variantes?.length) {
      p.variantes.forEach((v, i) => m.set(claveStock(p, i), v.stock));
    } else {
      m.set(p.id, p.stock);
    }
  }
  return m;
}

/** Lo que queda de un producto, sumando sus variantes si las tiene. */
export function stockDe(p: ProductoDemo, stock: Map<string, number>): number {
  if (!p.variantes?.length) return stock.get(p.id) ?? 0;
  return p.variantes.reduce((s, _, i) => s + (stock.get(claveStock(p, i)) ?? 0), 0);
}
