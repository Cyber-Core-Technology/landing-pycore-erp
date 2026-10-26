"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/*
  El revelado al entrar en pantalla, una sola vez.

  Estaba escrito a mano en cada sección —`initial`, `whileInView`, `viewport`,
  `transition` repetidos cuarenta veces, con duraciones y retardos distintos
  para el mismo gesto—. El mismo defecto que el ERP resolvió con sus
  primitivas: una sola fuente, porque el duplicado diverge en silencio.

  Dos cosas que no son adorno:

  - **`once: true` y margen negativo.** Sin `once`, el bloque vuelve a
    desvanecerse al subir y la página parpadea cuando alguien busca algo que
    ya leyó. El margen hace que arranque un poco antes de asomar, para que no
    se vea «aparecer» bajo el dedo.
  - **Con `prefers-reduced-motion` no hay nada que revelar.** Se renderiza en
    su sitio y visible desde el primer pintado: lo que se pidió fue que no se
    moviera, no que tardara en llegar.
*/

type Direccion = "arriba" | "izquierda" | "derecha" | "escala";

const DESPLAZAMIENTO: Record<Direccion, { x?: number; y?: number; scale?: number }> = {
  arriba:    { y: 18 },
  izquierda: { x: -28 },
  derecha:   { x: 28 },
  escala:    { scale: 0.96 },
};

type Props = {
  children: ReactNode;
  /** De dónde entra. Por omisión, desde abajo. */
  desde?: Direccion;
  /** Segundos de espera. Para escalonar una rejilla: `i * 0.05`. */
  retardo?: number;
  duracion?: number;
  className?: string;
  /** El elemento que se pinta. `li` dentro de una lista, `section`… */
  as?: "div" | "li" | "section" | "article";
};

export function Revelar({
  children,
  desde = "arriba",
  retardo = 0,
  duracion = 0.45,
  className,
  as = "div",
}: Props) {
  const sinMovimiento = useReducedMotion();
  const Etiqueta = motion[as];

  if (sinMovimiento) {
    const Simple = as;
    return <Simple className={className}>{children}</Simple>;
  }

  return (
    <Etiqueta
      className={className}
      initial={{ opacity: 0, ...DESPLAZAMIENTO[desde] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: duracion, delay: retardo, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Etiqueta>
  );
}

/*
  La tarjeta que responde al puntero. El gesto es el mismo en toda la web —se
  levanta 3 px y el borde toma el acento—, así que vive aquí y no en el
  `style` de cada pantalla: un `style` en el JSX le gana a la hoja de estilos,
  y es como una tarjeta se queda sin el gesto que tienen las de al lado.

  No sustituye al anillo de foco: `:focus-visible` lo pone el navegador y esto
  sólo añade el realce del puntero.
*/
export function TarjetaViva({
  children,
  className = "",
  retardo = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  retardo?: number;
  as?: "div" | "li" | "article";
}) {
  const sinMovimiento = useReducedMotion();
  const Etiqueta = motion[as];

  /*
    El realce del puntero va por CSS (`.tarjeta-viva-hover`) y no por
    `whileHover`: framer-motion escribe `transform` en línea y entra en
    conflicto con el de la hoja — el mismo choque que descentró el riel de
    redes. Aquí sólo se anima la entrada.
  */
  return (
    <Etiqueta
      className={`tarjeta-viva-hover ${className}`}
      initial={sinMovimiento ? undefined : { opacity: 0, y: 18 }}
      whileInView={sinMovimiento ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: retardo, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Etiqueta>
  );
}
