"use client";
import type { Etiqueta } from "@/lib/demoMostrador";

/*
  La etiqueta que distingue, en el selector, en qué se complica un producto.

  Las cuatro son conceptos distintos y confundirlos es el error clásico del
  catálogo, así que **cada una tiene su color** y el color significa siempre
  lo mismo en toda la pantalla:

    granel        se pesa en la báscula; se captura en gramos
    presentación  la misma cosa medida distinto — comparte existencia
    variante      otra cosa — tiene existencia propia
    extra         opcional, se cobra en su renglón

  El color no es lo único que lo dice: cada etiqueta lleva su palabra. Un
  significado que sólo viaja en el color no existe para quien no lo
  distingue, y eso es el criterio 1.4.1.
*/

const TONOS: Record<Etiqueta["tono"], { fondo: string; tinta: string }> = {
  granel: { fondo: "var(--warm-tint)", tinta: "var(--warm-ink)" },
  presentacion: { fondo: "var(--tint)", tinta: "var(--accent-ink)" },
  variante: {
    fondo: "color-mix(in srgb, var(--color-info) 14%, transparent)",
    tinta: "var(--color-info)",
  },
  extra: { fondo: "var(--chip)", tinta: "var(--chip-ink)" },
};

export function EtiquetaVariacion({ etiqueta }: { etiqueta: Etiqueta }) {
  const t = TONOS[etiqueta.tono];
  return (
    <span
      className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded"
      style={{ background: t.fondo, color: t.tinta }}
    >
      {etiqueta.texto}
    </span>
  );
}
