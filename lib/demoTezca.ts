/*
  TEZCA en el demo: **guionizado, y dicho**.

  La decisión es deliberada y la pantalla no la esconde. Un asistente de
  verdad en una página pública es un gasto por visitante sin techo y un
  vector de abuso —los tokens son dinero—, y lo que se gana a cambio es que
  conteste a preguntas que nadie va a hacer desde una landing. Lo que sí
  tiene que ser verdad es **la forma**: que responda sobre los datos que se
  están viendo, que cada respuesta traiga su acción y que nunca invente una
  cifra que la pantalla contradiga.

  Por eso las respuestas se calculan sobre el ticket y el catálogo reales del
  demo en vez de ser texto fijo: si llevas dos refrescos, el asistente dice
  dos refrescos.
*/

import type { Linea, ProductoDemo, Ticket } from "./demoMostrador";
import { mxn } from "./demoMostrador";

export type Contexto = {
  ticket: Ticket;
  lineas: Linea[];
  catalogo: ProductoDemo[];
  stock: Map<string, number>;
  ventasCobradas: number;
  importeCobrado: number;
};

export type Respuesta = {
  texto: string;
  accion?: string;
};

export type Pregunta = {
  id: string;
  texto: string;
  responder: (c: Contexto) => Respuesta;
};

const bajoMinimo = (c: Contexto) =>
  c.catalogo
    .filter((p) => !p.granel && (c.stock.get(p.id) ?? 0) <= 10)
    .sort((a, b) => (c.stock.get(a.id) ?? 0) - (c.stock.get(b.id) ?? 0));

export const PREGUNTAS: Pregunta[] = [
  {
    id: "stock",
    texto: "¿Qué me está por faltar?",
    responder: (c) => {
      const bajos = bajoMinimo(c);
      if (!bajos.length) {
        return {
          texto: "Nada bajo mínimo ahora mismo en Matriz Centro. El más justo va en doble dígito.",
          accion: "Ver inventario →",
        };
      }
      const p = bajos[0]!;
      const n = bajos.length;
      return {
        texto:
          `${p.nombre} está en ${c.stock.get(p.id)} ${p.unidad}, por debajo de su mínimo.` +
          (n > 1 ? ` Hay ${n} productos así; te armo la orden de compra con los ${n}.` : " Te armo la orden de compra."),
        accion: "Crear orden de compra →",
      };
    },
  },
  {
    id: "ticket",
    texto: "¿Cómo va este ticket?",
    responder: (c) => {
      if (!c.ticket.lineas.length) {
        return { texto: "Todavía no hay nada capturado. Escanea o busca un producto para empezar." };
      }
      const conImpuesto = c.lineas.filter((l) => l.producto.tasa_impuesto > 0).length;
      const sin = c.lineas.length - conImpuesto;
      return {
        texto:
          `Van ${c.ticket.articulos} artículos por ${mxn(c.ticket.total)}, de los cuales ` +
          `${mxn(c.ticket.impuesto)} son impuesto.` +
          (sin > 0
            ? ` ${sin} ${sin === 1 ? "renglón no causa" : "renglones no causan"} impuesto: es despensa básica a tasa 0%, no un error.`
            : ""),
        accion: "Ver desglose →",
      };
    },
  },
  {
    id: "margen",
    texto: "¿Cuánto estoy ganando aquí?",
    responder: (c) => {
      if (!c.lineas.length) {
        return { texto: "Captura algo primero y te digo la utilidad del ticket, con el costo del día." };
      }
      const conCosto = c.lineas.filter((l) => l.producto.costo > 0);
      const sinCosto = c.lineas.length - conCosto.length;
      if (!conCosto.length) {
        return {
          texto:
            "Ninguno de estos productos tiene costo capturado, así que no puedo decirte el margen. " +
            "Cero no es un costo: es «no se sabe», y poner 100% de margen ahí es justo el número que hace poner mal un precio.",
          accion: "Capturar costos →",
        };
      }
      const ingreso = conCosto.reduce(
        (s, l) => s + (l.producto.granel ? (l.cantidad / 1000) * l.producto.precio : l.cantidad * l.producto.precio) / (1 + l.producto.tasa_impuesto),
        0,
      );
      const costo = conCosto.reduce(
        (s, l) => s + (l.producto.granel ? (l.cantidad / 1000) : l.cantidad) * l.producto.costo,
        0,
      );
      const util = ingreso - costo;
      const pct = ingreso > 0 ? (util / ingreso) * 100 : 0;
      return {
        texto:
          `Utilidad de ${mxn(util)} sobre ${mxn(ingreso)} sin impuesto: ${pct.toFixed(1)}% de margen.` +
          (sinCosto > 0 ? ` Dejé fuera ${sinCosto} ${sinCosto === 1 ? "renglón" : "renglones"} sin costo capturado.` : ""),
        accion: "Ver rentabilidad →",
      };
    },
  },
  {
    id: "dia",
    texto: "¿Cómo va el día?",
    responder: (c) => {
      if (!c.ventasCobradas) {
        return {
          texto: "Todavía no has cobrado nada en esta sesión. Cobra una venta y te la comparo contra el mismo día de la semana pasada.",
        };
      }
      const prom = c.importeCobrado / c.ventasCobradas;
      return {
        texto:
          `${c.ventasCobradas} ${c.ventasCobradas === 1 ? "venta" : "ventas"} por ${mxn(c.importeCobrado)}, ` +
          `ticket promedio de ${mxn(prom)}. La comparación de verdad va contra el mismo día de la semana pasada, ` +
          "no contra ayer: un lunes contra un sábado no compara nada.",
        accion: "Ver resumen del día →",
      };
    },
  },
  {
    id: "promo",
    texto: "¿Debería hacer una promoción?",
    responder: (c) => {
      const bajos = bajoMinimo(c);
      if (bajos.length) {
        const p = bajos[0]!;
        return {
          texto:
            `Ahora no con ${p.nombre}: está por acabarse y una promoción sobre lo que ya no tienes ` +
            "es la forma más rápida de quedar mal. Primero resurte, luego promociona.",
          accion: "Ver stock crítico →",
        };
      }
      const caro = [...c.catalogo].sort((a, b) => (c.stock.get(b.id) ?? 0) - (c.stock.get(a.id) ?? 0))[0];
      return {
        texto: caro
          ? `${caro.nombre} es lo que más detenido tienes (${c.stock.get(caro.id)} ${caro.unidad}). Ahí sí tiene sentido moverlo.`
          : "Con este catálogo no veo nada detenido que valga una promoción.",
        accion: "Crear promoción →",
      };
    },
  },
];

/** El saludo: dice qué es y qué no, antes de que nadie pregunte. */
export const SALUDO =
  "Soy TEZCA. En el sistema leo tu operación completa; aquí respondo sobre lo que tienes en pantalla.";
