import { describe, expect, it } from "vitest";
import {
  buscar,
  cantidadBase,
  claveStock,
  etiquetasProducto,
  nombreLinea,
  stockDe,
  stockInicial,
  construirTicket,
  consumoPorProducto,
  gramosDesdeImporte,
  importeLinea,
  porCodigoDeBarras,
  precioUnitario,
  problemasParaCobrar,
  type ExtraDemo,
  type Linea,
  type LineaExtra,
  type ProductoDemo,
} from "./demoMostrador";

/*
  Lo que se comprueba aquí es lo que un mostrador no puede equivocar: la
  suma, lo que sale del almacén y las tres razones por las que una venta
  **no** se cobra. Son las reglas del ERP, así que si alguna cambia allá y
  aquí no, esto tiene que ponerse rojo.
*/

const pieza = (over: Partial<ProductoDemo> = {}): ProductoDemo => ({
  id: "p1",
  nombre: "Refresco Coca-Cola 1.5 lt",
  codigo_barras: "7501055300013",
  sku: "REF-001",
  categoria: "Refrescos",
  unidad: "pza",
  granel: false,
  precio: 27.5,
  costo: 19,
  tasa_impuesto: 0.16,
  stock: 40,
  ...over,
});

const granel = (over: Partial<ProductoDemo> = {}): ProductoDemo => ({
  ...pieza(),
  id: "g1",
  nombre: "Frijol negro 1 kg a granel",
  codigo_barras: "2000000000017",
  sku: "GRA-001",
  categoria: "Granos y semillas",
  unidad: "kg",
  granel: true,
  precio: 46, // por kilo
  tasa_impuesto: 0,
  stock: 12,
  ...over,
});

const linea = (
  producto: ProductoDemo,
  cantidad: number,
  presentacion: number | null = null,
  variante: number | null = null,
): Linea => ({
  uid: `u-${producto.id}-${cantidad}-${presentacion}-${variante}`,
  producto,
  presentacion,
  variante,
  cantidad,
});

const BOLSA: ExtraDemo = { id: "extra-bolsa", nombre: "Bolsa reutilizable", precio: 5, tasa_impuesto: 0.16 };

// ── El granel ─────────────────────────────────────────────────────────────
describe("granel", () => {
  it("se captura en gramos y cobra la fracción del kilo", () => {
    // 500 g de frijol a $46 el kilo son $23.00, no $23,000.
    expect(importeLinea(linea(granel(), 500))).toBe(23);
  });

  it("descuenta del almacén en unidad base, no en gramos", () => {
    expect(cantidadBase(linea(granel(), 500))).toBe(0.5);
  });

  it("convierte un importe de vuelta a gramos", () => {
    // El cliente pide «$20 de frijol».
    expect(gramosDesdeImporte(46, 20)).toBe(435);
  });

  it("un precio por kilo en cero no divide entre cero", () => {
    expect(gramosDesdeImporte(0, 20)).toBe(0);
  });
});

// ── Las presentaciones ────────────────────────────────────────────────────
describe("presentaciones", () => {
  const conCarton = pieza({
    presentaciones: [
      { nombre: "Pieza", factor: 1, precio: 27.5 },
      { nombre: "Cartón de 12", factor: 12, precio: 290.5 },
    ],
  });

  it("el precio del empaque es absoluto, no precio_base × factor", () => {
    // 27.50 × 12 serían 330. El cartón cuesta 290.50 y esa diferencia es el
    // margen del menudeo: el sistema no lo recalcula jamás.
    expect(precioUnitario(linea(conCarton, 1, 1))).toBe(290.5);
    expect(importeLinea(linea(conCarton, 1, 1))).toBe(290.5);
    expect(importeLinea(linea(conCarton, 1, 1))).not.toBe(27.5 * 12);
  });

  it("un cartón consume doce piezas del almacén", () => {
    expect(cantidadBase(linea(conCarton, 1, 1))).toBe(12);
    expect(cantidadBase(linea(conCarton, 2, 1))).toBe(24);
  });

  it("la pieza suelta sigue valiendo lo suyo", () => {
    expect(importeLinea(linea(conCarton, 3, 0))).toBe(82.5);
    expect(cantidadBase(linea(conCarton, 3, 0))).toBe(3);
  });
});

// ── La existencia ─────────────────────────────────────────────────────────
describe("existencia", () => {
  it("se valida sumando todo el ticket, no renglón por renglón", () => {
    const p = pieza({ stock: 15 });
    const conCarton = pieza({
      id: "p1",
      stock: 15,
      presentaciones: [
        { nombre: "Pieza", factor: 1, precio: 27.5 },
        { nombre: "Cartón de 12", factor: 12, precio: 290.5 },
      ],
    });
    // Un cartón (12) más 5 piezas son 17 sobre una existencia de 15. Mirando
    // cada renglón por su lado, los dos dicen que alcanza.
    const lineas = [linea(conCarton, 1, 1), linea(conCarton, 5, 0)];
    expect(consumoPorProducto(lineas).get("p1")).toBe(17);

    const problemas = problemasParaCobrar(lineas, new Map([[p.id, 15]]));
    expect(problemas).toHaveLength(1);
    expect(problemas[0]!.tipo).toBe("sin_stock");
  });

  it("el error de existencia dice el nombre y las dos cifras", () => {
    const p = pieza({ stock: 2 });
    const [problema] = problemasParaCobrar([linea(p, 5)], new Map([[p.id, 2]]));
    expect(problema!.mensaje).toContain("Refresco Coca-Cola 1.5 lt");
    expect(problema!.mensaje).toContain("quedan 2");
    expect(problema!.mensaje).toContain("se necesitan 5");
  });

  it("vender justo lo que queda sí se puede", () => {
    const p = pieza({ stock: 5 });
    expect(problemasParaCobrar([linea(p, 5)], new Map([[p.id, 5]]))).toHaveLength(0);
  });
});

// ── Lo que impide cobrar ──────────────────────────────────────────────────
describe("no se puede cobrar", () => {
  it("un granel sin pesar: es «falta pesar», no una venta de $0", () => {
    const g = granel();
    const [problema] = problemasParaCobrar([linea(g, 0)], new Map([[g.id, 12]]));
    expect(problema!.tipo).toBe("sin_pesar");
    expect(problema!.mensaje).toContain("Falta pesar");
  });

  it("una pieza en cero tampoco", () => {
    const p = pieza();
    const [problema] = problemasParaCobrar([linea(p, 0)], new Map([[p.id, 40]]));
    expect(problema!.tipo).toBe("sin_cantidad");
  });

  it("un ticket completo no tiene nada que reclamar", () => {
    const p = pieza();
    const g = granel();
    const problemas = problemasParaCobrar(
      [linea(p, 2), linea(g, 750)],
      new Map([[p.id, 40], [g.id, 12]]),
    );
    expect(problemas).toEqual([]);
  });
});

// ── El ticket ─────────────────────────────────────────────────────────────
describe("ticket", () => {
  it("desglosa el impuesto por línea, con la tasa de cada producto", () => {
    // El refresco causa 16%; el frijol, 0%. Una tasa global mentiría.
    const t = construirTicket([linea(pieza(), 2), linea(granel(), 1000)], []);
    // 55.00 con IVA → 47.41 + 7.59 ; 46.00 sin impuesto → 46.00 + 0
    expect(t.total).toBe(101);
    expect(t.impuesto).toBe(7.59);
    expect(t.subtotal).toBe(93.41);
    expect(t.subtotal + t.impuesto).toBeCloseTo(t.total, 2);
  });

  it("el extra va debajo de su línea, no al final", () => {
    const p = pieza();
    const l1 = linea(p, 1);
    const l2 = linea(pieza({ id: "p2", nombre: "Pan Bimbo grande" }), 1);
    const extra: LineaExtra = { uid: "e1", extra: BOLSA, veces: 1, padre: l1.uid };

    const t = construirTicket([l1, l2], [extra]);
    expect(t.lineas.map((x) => x.nombre)).toEqual([
      "Refresco Coca-Cola 1.5 lt",
      "+ Bolsa reutilizable",
      "Pan Bimbo grande",
    ]);
    expect(t.lineas[1]!.esExtra).toBe(true);
  });

  it("el extra cuenta las veces de toda la línea, no por pieza", () => {
    // «2 refrescos, una bolsa» es una vez. Multiplicar por la cantidad de la
    // línea cobraría dos.
    const l = linea(pieza(), 2);
    const t = construirTicket([l], [{ uid: "e1", extra: BOLSA, veces: 1, padre: l.uid }]);
    expect(t.lineas[1]!.importe).toBe(5);
  });

  it("el granel se imprime en gramos, que es como se pidió", () => {
    const t = construirTicket([linea(granel(), 750)], []);
    expect(t.lineas[0]!.cantidad).toBe("750 g");
  });

  it("un ticket vacío suma cero y no truena", () => {
    const t = construirTicket([], []);
    expect(t).toMatchObject({ total: 0, subtotal: 0, impuesto: 0, articulos: 0 });
  });
});

// ── La búsqueda ───────────────────────────────────────────────────────────
describe("búsqueda", () => {
  const catalogo = [
    pieza(),
    granel(),
    pieza({ id: "p3", nombre: "Café soluble Nescafé", codigo_barras: "7501059280014", sku: "CAF-003", categoria: "Café y té" }),
  ];

  it("encuentra por nombre sin importar mayúsculas", () => {
    expect(buscar(catalogo, "coca").map((p) => p.id)).toEqual(["p1"]);
  });

  it("encuentra por categoría", () => {
    expect(buscar(catalogo, "café").map((p) => p.id)).toEqual(["p3"]);
  });

  it("encuentra por SKU y por código de barras", () => {
    expect(buscar(catalogo, "GRA-001").map((p) => p.id)).toEqual(["g1"]);
    expect(buscar(catalogo, "7501059280014").map((p) => p.id)).toEqual(["p3"]);
  });

  it("sin texto devuelve el catálogo entero, no vacío", () => {
    expect(buscar(catalogo, "   ")).toHaveLength(3);
  });

  it("escanear un código exacto resuelve el producto", () => {
    expect(porCodigoDeBarras(catalogo, "7501055300013")?.id).toBe("p1");
    expect(porCodigoDeBarras(catalogo, "0000")).toBeNull();
  });
});

// ── Las variantes ─────────────────────────────────────────────────────────
describe("variantes", () => {
  const conSabores = pieza({
    id: "v1",
    nombre: "Botana Barcel bolsa familiar",
    stock: 0,
    variantes: [
      { nombre: "Original", stock: 16 },
      { nombre: "Enchilada", stock: 12 },
      { nombre: "Limón", stock: 7 },
    ],
  });

  it("cada variante lleva SU existencia, no la comparte", () => {
    // Al revés que una presentación, que es la misma cosa medida distinto.
    const s = stockInicial([conSabores]);
    expect(s.get(claveStock(conSabores, 0))).toBe(16);
    expect(s.get(claveStock(conSabores, 2))).toBe(7);
    // Y el producto no tiene existencia propia: contarla además sería
    // inventariar la mercancía dos veces.
    expect(s.has(conSabores.id)).toBe(false);
  });

  it("lo que queda del producto es la suma de sus variantes", () => {
    expect(stockDe(conSabores, stockInicial([conSabores]))).toBe(35);
  });

  it("vender una variante no toca la existencia de las otras", () => {
    const s = stockInicial([conSabores]);
    // Siete de Limón es justo lo que hay; de Enchilada no se tocó nada.
    expect(problemasParaCobrar([linea(conSabores, 7, null, 2)], s)).toEqual([]);
    expect(problemasParaCobrar([linea(conSabores, 8, null, 2)], s)).toHaveLength(1);
    expect(problemasParaCobrar([linea(conSabores, 12, null, 1)], s)).toEqual([]);
  });

  it("el ticket dice qué variante se llevó", () => {
    const t = construirTicket([linea(conSabores, 1, null, 1)], []);
    expect(t.lineas[0]!.nombre).toBe("Botana Barcel bolsa familiar · Enchilada");
  });

  it("el error de existencia nombra la variante, no sólo el producto", () => {
    const [p] = problemasParaCobrar([linea(conSabores, 99, null, 2)], stockInicial([conSabores]));
    expect(p!.mensaje).toContain("· Limón");
  });

  it("un producto sin variantes sigue llevando su propia existencia", () => {
    const s = stockInicial([pieza()]);
    expect(s.get("p1")).toBe(40);
    expect(nombreLinea(linea(pieza(), 1))).toBe("Refresco Coca-Cola 1.5 lt");
  });
});

// ── Las etiquetas del selector ────────────────────────────────────────────
describe("etiquetas del selector", () => {
  it("un producto simple no lleva ninguna: la etiqueta distingue, no decora", () => {
    expect(etiquetasProducto(pieza())).toEqual([]);
  });

  it("cada complicación tiene su etiqueta y su tono", () => {
    const todo = pieza({
      granel: true,
      presentaciones: [
        { nombre: "Pieza", factor: 1, precio: 10 },
        { nombre: "Caja", factor: 12, precio: 110 },
      ],
      variantes: [{ nombre: "A", stock: 1 }, { nombre: "B", stock: 2 }],
      extras: ["extra-bolsa"],
    });
    expect(etiquetasProducto(todo).map((e) => e.tono)).toEqual([
      "granel",
      "presentacion",
      "variante",
      "extra",
    ]);
    // Cada una lleva su palabra: un significado que sólo viaja en el color
    // no existe para quien no lo distingue.
    expect(etiquetasProducto(todo).every((e) => e.texto.trim().length > 0)).toBe(true);
  });

  it("cuenta cuántas presentaciones y cuántas variantes hay", () => {
    const p = pieza({
      presentaciones: [
        { nombre: "Pieza", factor: 1, precio: 10 },
        { nombre: "Caja", factor: 12, precio: 110 },
      ],
    });
    expect(etiquetasProducto(p)[0]!.texto).toBe("2 empaques");
  });
});
