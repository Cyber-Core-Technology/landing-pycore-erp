import { describe, expect, it } from "vitest";
import {
  advertencias,
  BORRADOR_VACIO,
  claveCodigoBarras,
  crearProducto,
  validar,
  type Borrador,
} from "./demoAlta";
import type { ProductoDemo } from "./demoMostrador";

/*
  Lo que se comprueba aquí no es el formulario: es qué hace el sistema cuando
  el dato está mal. Eso es lo que decide si subir un inventario de quinientos
  productos es llevadero o un castigo.
*/

const existente: ProductoDemo = {
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
};

const bueno = (over: Partial<Borrador> = {}): Borrador => ({
  ...BORRADOR_VACIO,
  nombre: "Galletas Marías 170 g",
  precio: "18.50",
  costo: "12",
  stock: "24",
  ...over,
});

describe("la clave del código de barras", () => {
  it("ignora los ceros de la izquierda: un UPC-A y su EAN-13 son el mismo", () => {
    expect(claveCodigoBarras("07501055300013")).toBe(claveCodigoBarras("7501055300013"));
  });

  it("ignora los espacios que mete un lector", () => {
    expect(claveCodigoBarras(" 750 105 5300013 ")).toBe("7501055300013");
  });

  it("respeta los ceros de un código interno no numérico", () => {
    // Ahí los ceros pueden ser del código del negocio: quitarlos cambia de
    // producto.
    expect(claveCodigoBarras("ABC-007")).toBe("abc-007");
  });

  it("un código vacío no tiene clave, y por tanto no choca con nada", () => {
    expect(claveCodigoBarras("   ")).toBe("");
  });
});

describe("el duplicado de código", () => {
  it("se detecta aunque el código venga con ceros delante", () => {
    const v = validar(bueno({ codigo_barras: "07501055300013" }), [existente]);
    expect(v.duplicado?.producto.id).toBe("p1");
    expect(v.valido).toBe(false);
  });

  it("el aviso dice CUÁL producto ya lo tiene, no sólo «ya existe»", () => {
    // El caso que produce duplicados no es el descuido: es que el producto
    // existe y quien captura no lo encontró. Un error que sólo diga «ya
    // existe» deja a esa persona sin salida.
    const v = validar(bueno({ codigo_barras: "7501055300013" }), [existente]);
    expect(v.duplicado?.mensaje).toContain("Refresco Coca-Cola 1.5 lt");
  });

  it("explica el caso de los ceros, que es el que confunde", () => {
    const v = validar(bueno({ codigo_barras: "0007501055300013" }), [existente]);
    expect(v.duplicado?.mensaje).toContain("ceros de la izquierda");
  });

  it("sin código de barras no hay duplicado que valga", () => {
    expect(validar(bueno(), [existente]).duplicado).toBeNull();
  });
});

describe("lo que impide dar de alta", () => {
  it("un producto sin nombre", () => {
    const v = validar(bueno({ nombre: "  " }), []);
    expect(v.problemas.map((p) => p.campo)).toContain("nombre");
    expect(v.valido).toBe(false);
  });

  it("un nombre repetido, con la salida escrita", () => {
    const v = validar(bueno({ nombre: "refresco coca-cola 1.5 LT" }), [existente]);
    const p = v.problemas.find((x) => x.campo === "nombre");
    // Decir sólo «repetido» hace borrar renglones; hay que decir qué hacer.
    expect(p!.mensaje).toContain("lo que los diferencia");
  });

  it("un precio en cero o ausente", () => {
    expect(validar(bueno({ precio: "" }), []).valido).toBe(false);
    expect(validar(bueno({ precio: "0" }), []).valido).toBe(false);
  });

  it("un costo mayor que el precio: cada venta perdería dinero", () => {
    const v = validar(bueno({ precio: "18.50", costo: "25" }), []);
    expect(v.problemas.find((p) => p.campo === "costo")!.mensaje).toContain("pierde dinero");
  });

  it("una existencia negativa", () => {
    expect(validar(bueno({ stock: "-3" }), []).valido).toBe(false);
  });

  it("acepta la coma como tecla decimal del teclado numérico", () => {
    expect(validar(bueno({ precio: "18,50" }), []).valido).toBe(true);
  });

  it("un producto bien capturado pasa", () => {
    expect(validar(bueno(), [existente]).valido).toBe(true);
  });
});

describe("las advertencias", () => {
  it("sin costo avisa que el margen no se puede calcular, y por qué", () => {
    const a = advertencias(bueno({ costo: "" }));
    // Cero no es un costo: es «no se sabe». Es el número que hace poner mal
    // un precio.
    expect(a.join(" ")).toContain("no se sabe");
  });

  it("sin código de barras avisa que no se podrá escanear", () => {
    expect(advertencias(bueno({ codigo_barras: "" })).join(" ")).toContain("escanear");
  });

  it("un producto completo no tiene nada que advertir", () => {
    expect(advertencias(bueno({ codigo_barras: "7501000000016" }))).toEqual([]);
  });

  it("las advertencias no bloquean", () => {
    expect(validar(bueno({ costo: "", codigo_barras: "" }), []).valido).toBe(true);
  });
});

describe("el alta", () => {
  it("genera el SKU si no se capturó", () => {
    expect(crearProducto(bueno()).sku).toMatch(/^SKU-\d{3}$/);
  });

  it("un producto a granel se cuenta en kilos, diga lo que diga la unidad", () => {
    const p = crearProducto(bueno({ granel: true, unidad: "pza" }));
    expect(p.granel).toBe(true);
    expect(p.unidad).toBe("kg");
  });

  it("sin existencia capturada nace en cero, no en nulo", () => {
    expect(crearProducto(bueno({ stock: "" })).stock).toBe(0);
  });

  it("sin costo nace en cero y el mostrador sabrá que es «no se sabe»", () => {
    expect(crearProducto(bueno({ costo: "" })).costo).toBe(0);
  });

  it("cada alta tiene su propio id", () => {
    expect(crearProducto(bueno()).id).not.toBe(crearProducto(bueno()).id);
  });
});
