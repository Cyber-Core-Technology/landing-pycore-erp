"use client";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";

/*
  El cambio de página y el avance de la lectura.

  Ahora que el contenido vive repartido en seis pantallas, navegar es el gesto
  que más se repite — y en una SPA no recarga nada, así que sin una transición
  el contenido se sustituye de golpe y cuesta ver que algo cambió.

  La transición es **corta y sólo de entrada** (0.28 s, sin salida): una
  animación de salida obliga a esperar a que el bloque viejo se vaya antes de
  pintar el nuevo, y eso se siente como lentitud, no como pulcritud.

  El anuncio del cambio de pantalla a un lector de pantalla **no** se hace
  aquí: lo hace el `<h1>` de cada página, que es lo que de verdad la nombra.
*/

export function TransicionPagina({ children }: { children: ReactNode }) {
  const ruta = usePathname();
  const sinMovimiento = useReducedMotion();

  if (sinMovimiento) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={ruta}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/*
  La barra de avance, pegada arriba.

  Con la portada repartida, las páginas interiores siguen siendo largas y esto
  es lo que dice cuánto falta. Va con `useSpring` y no con el valor crudo del
  scroll: sin suavizado la barra tiembla con cada muesca de la rueda.

  Es decorativa —`aria-hidden`—: el progreso de lectura no es información que
  haya que anunciar, y la misma barra como `progressbar` interrumpiría al
  lector en cada píxel.
*/
export function BarraDeAvance() {
  const { scrollYProgress } = useScroll();
  const sinMovimiento = useReducedMotion();
  const suave = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  if (sinMovimiento) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX: suave,
        transformOrigin: "0% 50%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        // 2 px no se ven: a ese grosor la barra compite con el borde de la
        // cabecera y se lee como parte de ella. Con 5 px es un indicador.
        height: "5px",
        background: "var(--accent)",
        // Un canto más oscuro abajo la despega de la cabecera, que en tema
        // claro es casi del mismo tono que el lienzo.
        boxShadow: "0 1px 3px color-mix(in srgb, var(--accent) 45%, transparent)",
        zIndex: 9998,
      }}
    />
  );
}
