"use client";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Revelar } from "@/components/ui/Revelar";

/*
  La portada de una página interior.

  Es la **banda de marca** del sitio: el único bloque donde el cromo oscuro
  ocupa toda la superficie, igual que en los PDF. Se puede permitir aquí
  —arriba del todo, 200 px— y no en una franja vertical de pantalla completa,
  que es la corrección que ya se hizo en el menú del ERP: a esa escala el
  color de marca deja de identificar y se come la pantalla.

  Lleva migaja de pan porque estas páginas se llega desde el índice de la
  portada y desde un buscador, y en el segundo caso no hay «atrás» que valga.
*/

export function EncabezadoPagina({
  cejilla,
  titulo,
  bajada,
  icon,
}: {
  cejilla: string;
  titulo: string;
  bajada: string;
  icon: string;
}) {
  return (
    <section
      style={{ background: "var(--band)" }}
      className="pt-28 pb-14 relative overflow-hidden"
    >
      {/*
        Dos resplandores que derivan, cruzándose a distinta velocidad. La
        maqueta y el bucle viven en `globals.css` (`.resplandor`): escritos
        con framer-motion no llegaban a aplicarse —`transform` se quedaba en
        `none`— y un bucle de fondo no necesita el motor de animación de
        React. Se apagan solos con `prefers-reduced-motion`.
      */}
      <span aria-hidden="true" className="resplandor resplandor--uno" />
      <span aria-hidden="true" className="resplandor resplandor--dos" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Revelar desde="arriba" duracion={0.4}>
          <nav aria-label="Migaja de pan" className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80"
              style={{ color: "var(--band-ink-2)" }}
            >
              <span className="rotate-180 inline-flex">
                <Icon name="arrowRight" size={14} />
              </span>
              Inicio
            </Link>
          </nav>
        </Revelar>

        <div className="flex items-start gap-5">
          <Revelar desde="escala" duracion={0.5}>
            <span
              className="icono-flota hidden sm:inline-flex items-center justify-center w-14 h-14 rounded-2xl flex-shrink-0"
              style={{ background: "var(--band-tile)", color: "var(--band-eyebrow)" }}
            >
              <Icon name={icon} size={26} />
            </span>
          </Revelar>

          <div className="min-w-0">
            <Revelar retardo={0.05} duracion={0.4}>
              <p
                className="text-xs font-semibold tracking-[0.16em]"
                style={{ color: "var(--band-eyebrow)" }}
              >
                {cejilla}
              </p>
            </Revelar>
            <Revelar retardo={0.1}>
              <h1
                className="font-heading text-3xl lg:text-[42px] font-bold leading-[1.1] tracking-[-0.025em] mt-2"
                style={{ color: "var(--band-ink)" }}
              >
                {titulo}
              </h1>
            </Revelar>
            <Revelar retardo={0.16}>
              <p
                className="text-lg leading-relaxed max-w-2xl mt-4"
                style={{ color: "var(--band-ink-2)" }}
              >
                {bajada}
              </p>
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  );
}
