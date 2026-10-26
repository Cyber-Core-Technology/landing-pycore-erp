/*
  El alta de producto, aparte de la pantalla.

  Lo que de verdad decide si subir un inventario es llevadero o un castigo no
  es el formulario: es **qué hace el sistema cuando el dato está mal**. Aquí
  viven esas decisiones, que son las del ERP:

  - La identidad es la **clave** del código de barras, no su texto: se
    comparan sin espacios y sin los ceros a la izquierda que agregan unos
    lectores y unas básculas. Un UPC-A de 12 y su EAN-13 con cero delante son
    el mismo producto, y comparando en crudo el alta deja pasar el duplicado.
  - Un código repetido **no se rechaza y ya**: se dice cuál es el producto que
    ya lo tiene. El caso que produce duplicados no es el descuido — es que el
    producto existe y quien captura no lo encontró.
  - El código y el SKU se generan solos si no se capturan.
*/

import type { ProductoDemo } from "./demoMostrador";

export type Borrador = {
  nombre: string;
  precio: string;
  costo: string;
  codigo_barras: string;
  categoria: string;
  unidad: string;
  stock: string;
  granel: boolean;
  tasa_impuesto: number;
};

export const BORRADOR_VACIO: Borrador = {
  nombre: "",
  precio: "",
  costo: "",
  codigo_barras: "",
  categoria: "Miscelánea",
  unidad: "pza",
  stock: "",
  granel: false,
  tasa_impuesto: 0.16,
};

/*
  La clave con que se compara un código de barras.

  Lo no numérico se respeta tal cual: ahí los ceros pueden ser del código
  interno del negocio y quitarlos cambiaría de producto.
*/
export function claveCodigoBarras(codigo: string): string {
  const limpio = codigo.replace(/\s+/g, "");
  if (!limpio) return "";
  if (!/^\d+$/.test(limpio)) return limpio.toLowerCase();
  return limpio.replace(/^0+/, "") || "0";
}

export type Problema = { campo: keyof Borrador; mensaje: string };

export type Duplicado = { producto: ProductoDemo; mensaje: string };

export type Validacion = {
  problemas: Problema[];
  duplicado: Duplicado | null;
  /** `true` sólo si se puede dar de alta tal cual. */
  valido: boolean;
};

const numero = (v: string) => Number(String(v).replace(",", "."));

export function validar(b: Borrador, catalogo: ProductoDemo[]): Validacion {
  const problemas: Problema[] = [];

  if (!b.nombre.trim()) {
    problemas.push({ campo: "nombre", mensaje: "El producto necesita un nombre." });
  } else if (
    catalogo.some((p) => p.nombre.trim().toLowerCase() === b.nombre.trim().toLowerCase())
  ) {
    problemas.push({
      campo: "nombre",
      mensaje: "Ya tienes un producto con ese nombre. Compleméntalo con lo que los diferencia (sabor, tamaño, presentación).",
    });
  }

  const precio = numero(b.precio);
  if (!b.precio.trim()) {
    problemas.push({ campo: "precio", mensaje: "Falta el precio de venta." });
  } else if (!Number.isFinite(precio) || precio <= 0) {
    problemas.push({ campo: "precio", mensaje: "El precio tiene que ser mayor que cero." });
  }

  // El costo es opcional, pero **cero no es un costo: es «no se sabe»**, y es
  // justo el valor que pinta 100% de margen en todo y hace poner mal un
  // precio. Se avisa, no se bloquea.
  const costo = b.costo.trim() ? numero(b.costo) : null;
  if (costo !== null && (!Number.isFinite(costo) || costo < 0)) {
    problemas.push({ campo: "costo", mensaje: "El costo no puede ser negativo." });
  } else if (costo !== null && precio > 0 && costo > precio) {
    problemas.push({
      campo: "costo",
      mensaje: "El costo es mayor que el precio: así cada venta pierde dinero.",
    });
  }

  const stock = b.stock.trim() ? numero(b.stock) : 0;
  if (!Number.isFinite(stock) || stock < 0) {
    problemas.push({ campo: "stock", mensaje: "La existencia inicial no puede ser negativa." });
  }

  // El duplicado se busca por la clave, no por el texto.
  let duplicado: Duplicado | null = null;
  const clave = claveCodigoBarras(b.codigo_barras);
  if (clave) {
    const ya = catalogo.find((p) => claveCodigoBarras(p.codigo_barras) === clave);
    if (ya) {
      duplicado = {
        producto: ya,
        mensaje:
          ya.codigo_barras === b.codigo_barras.trim()
            ? `Ese código ya es de «${ya.nombre}».`
            : `Ese código es el mismo que el de «${ya.nombre}» (${ya.codigo_barras}): cambian los ceros de la izquierda, no el producto.`,
      };
    }
  }

  return { problemas, duplicado, valido: problemas.length === 0 && !duplicado };
}

/** Avisos que no impiden guardar, pero que conviene leer antes. */
export function advertencias(b: Borrador): string[] {
  const out: string[] = [];
  if (!b.costo.trim()) {
    out.push(
      "Sin costo capturado no se puede calcular tu margen. Cero no es un costo: es «no se sabe», y el sistema lo dirá con una raya en vez de inventar un 100%.",
    );
  }
  if (!b.codigo_barras.trim()) {
    out.push("Sin código de barras no se podrá escanear en el mostrador; se buscará por nombre.");
  }
  if (!b.stock.trim()) {
    out.push("Entra con existencia en cero. Se puede vender en cuanto registres su primera entrada.");
  }
  return out;
}

let secuencia = 0;

/*
  El alta.

  El código y el SKU se generan si no se capturaron —es lo que hace
  `ProductoService.crear` del ERP—, y la existencia inicial entra como un
  movimiento: un producto que nace con piezas y con el kardex vacío es un
  historial que no arranca en la primera pieza.
*/
export function crearProducto(b: Borrador): ProductoDemo {
  secuencia += 1;
  const n = String(secuencia).padStart(3, "0");
  return {
    id: `nuevo-${secuencia}`,
    nombre: b.nombre.trim(),
    codigo_barras: b.codigo_barras.trim(),
    sku: `SKU-${n}`,
    categoria: b.categoria,
    unidad: b.granel ? "kg" : b.unidad,
    granel: b.granel,
    precio: numero(b.precio),
    costo: b.costo.trim() ? numero(b.costo) : 0,
    tasa_impuesto: b.tasa_impuesto,
    stock: b.stock.trim() ? numero(b.stock) : 0,
  };
}

export const CATEGORIAS = [
  "Miscelánea",
  "Abarrotes",
  "Bebidas",
  "Botanas y dulces",
  "Lácteos y huevo",
  "Limpieza del hogar",
  "Higiene y cuidado personal",
] as const;

export const UNIDADES = [
  { valor: "pza", etiqueta: "Pieza" },
  { valor: "kg", etiqueta: "Kilogramo" },
  { valor: "lt", etiqueta: "Litro" },
  { valor: "paq", etiqueta: "Paquete" },
] as const;

export const IMPUESTOS = [
  { valor: 0.16, etiqueta: "IVA 16%" },
  { valor: 0, etiqueta: "Tasa 0% — despensa básica" },
] as const;
