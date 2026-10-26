/*
  La declaración de accesibilidad.

  La regla que la gobierna: **dice lo que todavía no cumple**. Una
  declaración que afirma conformidad total es la forma más rápida de perder a
  quien usa un lector de pantalla todos los días — lo comprueba en treinta
  segundos y a partir de ahí no vuelve a creer nada de lo que digas.

  Por eso aquí hay tres listas y no una: lo que está hecho, lo que está
  medido (con el número), y lo que falta con su motivo. Y se separa el
  producto del sitio, porque son dos cosas con dos niveles distintos de
  trabajo encima y mezclarlas sería colgarle al sitio el mérito del ERP.
*/

export type Logro = { titulo: string; detalle: string };

/** El objetivo declarado, sin adornos. */
export const OBJETIVO = "WCAG 2.2, nivel AA";

export const ALCANCE = {
  dentro:
    "Todo lo que toca una persona que administra su negocio: el punto de venta, el inventario, las compras, las finanzas, los reportes y el asistente.",
  fuera:
    "La tienda pública de cada negocio, el panel de superadministración y la aplicación de dispositivos. Están declarados fuera de alcance por ahora, no «pendientes de revisar».",
};

export const HECHO: Logro[] = [
  {
    titulo: "Los controles se construyen una vez, no en cada pantalla",
    detalle:
      "Botón, campo, modal, tabla y formulario salen de las mismas piezas. Antes cada una de las 251 pantallas escribía su propio `<input>` y su propio modal, y así es como 508 de 520 controles acabaron sin etiqueta.",
  },
  {
    titulo: "Un botón de sólo icono no compila sin su nombre",
    detalle:
      "Es obligatorio en el tipo, no por convención: es lo único que sobrevive a la prisa. Cuatro iconos en fila —ver, editar, imprimir, cancelar— se anunciaban los cuatro como «botón», y uno de los cuatro cancela la venta.",
  },
  {
    titulo: "Los diálogos atrapan el foco y cierran con Escape",
    detalle:
      "De los seis modales compartidos, cuatro sólo cerraban con un clic en el velo — un gesto de puntero. Con teclado se entraba y no se salía.",
  },
  {
    titulo: "Las pestañas son una sola parada de tabulador",
    detalle:
      "Se cambian con las flechas. Tres pestañas no deben costar tres tabulaciones en cada pantalla que las tenga.",
  },
  {
    titulo: "Las gráficas no se accesibilizan: se acompañan",
    detalle:
      "El SVG se esconde del árbol de accesibilidad y al lado va la misma información en una tabla, más un resumen en una frase: lo que un vidente saca de la forma de la curva y que de la tabla habría que deducir fila por fila.",
  },
  {
    titulo: "Lo que llega solo no interrumpe",
    detalle:
      "Las ventas y las alertas que entran de otro mostrador se cuentan y se consultan; no se anuncian. En hora pico, una región viva con eso dentro deja el sistema inoperable para quien escucha la pantalla.",
  },
];

export const MEDIDO: Logro[] = [
  {
    titulo: "El anillo de foco llega a 3:1",
    detalle:
      "El tono claro de la marca daba 2.6:1 sobre el lienzo y el criterio 1.4.11 pide 3:1. El verde del logo da 4.84:1, y una prueba impide que vuelvan a separarse.",
  },
  {
    titulo: "El borde de un campo es distinto del borde decorativo",
    detalle:
      "El decorativo da 1.27:1 sobre blanco: un campo prácticamente sin contorno. Separar dos zonas no es identificar un control, y sólo lo segundo pide 3:1.",
  },
  {
    titulo: "El rojo de error pasó de 3.76:1 a cumplir",
    detalle:
      "El tono anterior no alcanzaba para texto. El fondo y el borde de los avisos conservan el tono claro: ahí el color no es texto.",
  },
  {
    titulo: "Una opacidad sobre texto está prohibida",
    detalle:
      "Los rótulos del menú se pintaban con un token de 8.84:1 y `opacity: 0.5`. Medir el token daba bien; lo que llegaba a la pantalla era 3.27:1. Si un texto tiene que pesar menos, es otro token con su contraste medido.",
  },
  {
    titulo: "Los once temas se miden en cada corrida",
    detalle:
      "155 comprobaciones sobre el texto, el borde de control y el menú de cada tema. Un tema es un matiz que hereda el sistema, no una paleta propia que nadie vuelve a medir.",
  },
];

export const FALTA: Logro[] = [
  {
    titulo: "La tienda pública, el panel de superadmin y la app de dispositivos",
    detalle:
      "Fuera de alcance por ahora. Se dice en vez de callarlo: lo contrario es que alguien lo descubra solo.",
  },
  {
    titulo: "Las pruebas automáticas encuentran como un tercio de las barreras",
    detalle:
      "Las que son un atributo que falta. El resto sólo aparece escuchando la pantalla, y eso no lo cierra una herramienta.",
  },
  {
    titulo: "Falta la prueba que de verdad cuenta",
    detalle:
      "Lo que cierra esto es una persona invidente usando el sistema para trabajar un día entero, no una auditoría de una tarde. Hay un guion para lector de pantalla escrito y ese paso está pendiente.",
  },
  {
    titulo: "Los PDF no están etiquetados",
    detalle:
      "El entregable legible de una factura es su XML y la vista en pantalla, no el PDF. Decirlo es más útil que prometer un PDF accesible que no existe.",
  },
];

/*
  Lo de este sitio, aparte. Mezclarlo con lo de arriba sería colgarle a la
  web el trabajo del producto.
*/
export const ESTE_SITIO: Logro[] = [
  {
    titulo: "Se comprueba en dos tamaños, en un navegador de verdad",
    detalle:
      "Cada página se carga a 390 px y a 1440 px y se mide que nada desborde a lo ancho. El desbordamiento horizontal es lo que de verdad rompe una página en un teléfono, y no se ve desde el escritorio.",
  },
  {
    titulo: "El menú y los diálogos responden al teclado",
    detalle:
      "El cajón del móvil y el menú de producto declaran lo que son, atrapan el foco, cierran con Escape y devuelven el foco al botón que los abrió. Hay pruebas que lo verifican.",
  },
  {
    titulo: "El movimiento se apaga entero",
    detalle:
      "Con `prefers-reduced-motion` no hay transiciones de página, ni barra de avance, ni contadores que suban: las cifras aparecen en su valor final.",
  },
  {
    titulo: "Lo que falta aquí",
    detalle:
      "Este sitio no tiene todavía una auditoría con lector de pantalla ni una revisión de contraste tan completa como la del producto. Si encuentras una barrera, escríbenos y se arregla.",
  },
];
