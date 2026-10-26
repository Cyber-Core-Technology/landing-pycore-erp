"use client";
import { motion, useReducedMotion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";
import { TRAZOS_REDES, etiquetaRed } from "@/lib/redes";

/*
  Las redes, fijas en el canto izquierdo.

  Tres decisiones que no son decoración:

  - **Sólo en pantallas anchas.** En un teléfono un riel fijo se come un
    pulgar de ancho útil y acaba tapando contenido; abajo, el pie ya las
    lleva. Se esconde con `@media` y no con `hidden` de Tailwind, porque las
    utilidades se expanden arriba del archivo y a igual especificidad gana la
    última regla — el mismo defecto que ya tuvo la portada de acceso.
  - **No es navegación del sitio**, así que va fuera del `<nav>` principal y
    con su propio nombre: un lector que recorra las regiones encuentra
    «Redes sociales» y no otro menú que no lo es.
  - **Dos filetes, arriba y abajo.** Sin ellos, cinco iconos flotando sobre
    el lienzo se leen como algo que se quedó a medio cargar; con uno solo,
    centrado, el grupo parece descolgado.

  Y el motivo de que sean **dos elementos y no uno**: el centrado vive en
  `transform: translateY(-50%)` de la hoja, y framer-motion escribe su propio
  `transform` en línea al animar. Con la animación sobre el mismo elemento,
  el valor en línea gana y el riel se queda colgando desde la mitad hacia
  abajo — que es justo donde está el avatar. El de fuera centra; el de
  dentro anima.
*/

export function RielRedes() {
  const sinMovimiento = useReducedMotion();

  return (
    <aside aria-label="Redes sociales" className="riel-redes">
      <motion.div
        className="riel-redes__grupo"
        initial={sinMovimiento ? false : { opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
      <span aria-hidden="true" className="riel-redes__filete" />
      <ul className="flex flex-col items-center gap-3 list-none p-0 m-0">
        {SOCIAL_LINKS.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={etiquetaRed(s.name)}
              className="riel-redes__enlace"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d={TRAZOS_REDES[s.name]} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
        <span aria-hidden="true" className="riel-redes__filete" />
      </motion.div>
    </aside>
  );
}
