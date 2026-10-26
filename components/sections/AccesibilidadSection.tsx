"use client";
import { Icon } from "@/components/ui/Icon";
import { Revelar } from "@/components/ui/Revelar";
import { ALCANCE, ESTE_SITIO, FALTA, HECHO, MEDIDO, OBJETIVO, type Logro } from "@/lib/accesibilidad";

/*
  La declaración, en pantalla.

  El orden importa y no es el cómodo: primero el alcance —qué queda fuera—,
  y la lista de lo que falta va **antes** de la de este sitio, no escondida
  al final. Una declaración honesta se reconoce porque lo que no cumple no
  hay que buscarlo.
*/

function Bloque({
  id,
  cejilla,
  titulo,
  entradilla,
  items,
  tono,
}: {
  id: string;
  cejilla: string;
  titulo: string;
  entradilla?: string;
  items: Logro[];
  tono: "accent" | "warm";
}) {
  const tinta = tono === "warm" ? "var(--warm-ink)" : "var(--accent-ink)";
  return (
    <div>
      <Revelar>
        <p className="text-xs font-semibold tracking-[0.16em]" style={{ color: tinta }}>
          {cejilla}
        </p>
        <h2
          id={id}
          className="font-heading text-2xl lg:text-[30px] font-bold leading-[1.15] tracking-[-0.02em] mt-2.5"
          style={{ color: "var(--text)" }}
        >
          {titulo}
        </h2>
        {entradilla && (
          <p className="text-base leading-relaxed mt-3 max-w-3xl" style={{ color: "var(--text-3)" }}>
            {entradilla}
          </p>
        )}
      </Revelar>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 list-none p-0">
        {items.map((l, i) => (
          <Revelar key={l.titulo} as="li" retardo={i * 0.05}>
            <div
              className="rounded-card p-5 h-full"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-heading font-semibold text-[15px] leading-snug" style={{ color: "var(--text)" }}>
                {l.titulo}
              </h3>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-3)" }}>
                {l.detalle}
              </p>
            </div>
          </Revelar>
        ))}
      </ul>
    </div>
  );
}

export function AccesibilidadSection() {
  return (
    <>
      <section className="py-16" style={{ background: "var(--bg)" }} aria-labelledby="alcance-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Revelar>
            <div
              className="rounded-card-lg p-6 sm:p-8"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-semibold tracking-[0.16em]" style={{ color: "var(--accent-ink)" }}>
                OBJETIVO DECLARADO
              </p>
              <p
                id="alcance-heading"
                className="font-heading text-2xl lg:text-[30px] font-bold mt-2.5"
                style={{ color: "var(--text)" }}
              >
                {OBJETIVO}
              </p>

              <div className="grid md:grid-cols-2 gap-5 mt-6">
                <div
                  className="rounded-card p-4"
                  style={{ background: "var(--tint)", border: "1px solid var(--accent)" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--accent-ink)" }}>
                    Dentro del alcance
                  </p>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {ALCANCE.dentro}
                  </p>
                </div>
                <div
                  className="rounded-card p-4"
                  style={{ background: "var(--warm-tint)", border: "1px solid var(--warm-tint-border)" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--warm-ink)" }}>
                    Fuera del alcance, hoy
                  </p>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {ALCANCE.fuera}
                  </p>
                </div>
              </div>
            </div>
          </Revelar>
        </div>
      </section>

      <section className="py-14" style={{ background: "var(--card)" }} aria-labelledby="hecho-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
          <Bloque
            id="hecho-heading"
            tono="accent"
            cejilla="LO QUE ESTÁ HECHO"
            titulo="Decisiones, no parches"
            entradilla="Ninguna pantalla escribe un atributo de accesibilidad a mano. Si hiciera falta uno, falta una pieza compartida — porque una copia que se olvide de un campo falla en silencio y sólo por un camino."
            items={HECHO}
          />
          <Bloque
            id="medido-heading"
            tono="accent"
            cejilla="LO QUE ESTÁ MEDIDO"
            titulo="Con el número delante"
            entradilla="El contraste no se estima mirando: se mide, y las pruebas lo vuelven a medir en cada corrida. Estos son defectos reales que se encontraron midiendo, no una lista de buenas intenciones."
            items={MEDIDO}
          />
        </div>
      </section>

      <section className="py-14" style={{ background: "var(--bg)" }} aria-labelledby="falta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
          <Bloque
            id="falta-heading"
            tono="warm"
            cejilla="LO QUE TODAVÍA NO CUMPLE"
            titulo="Esto es lo que falta"
            entradilla="Va aquí y no al final escondido. Una declaración que afirma conformidad total es la forma más rápida de perder a quien usa un lector de pantalla todos los días: lo comprueba en treinta segundos."
            items={FALTA}
          />
          <Bloque
            id="sitio-heading"
            tono="accent"
            cejilla="Y ESTE SITIO, APARTE"
            titulo="La web que estás leyendo"
            entradilla="Separado del producto a propósito: son dos cosas con dos niveles distintos de trabajo encima, y mezclarlas sería colgarle a la web el mérito del sistema."
            items={ESTE_SITIO}
          />
        </div>
      </section>

      <section className="py-14" style={{ background: "var(--card)" }} aria-labelledby="reportar-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Revelar>
            <div
              className="rounded-card-lg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
                style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
              >
                <Icon name="chat" size={23} />
              </span>
              <div className="flex-1">
                <h2 id="reportar-heading" className="font-heading font-bold text-xl" style={{ color: "var(--text)" }}>
                  ¿Encontraste una barrera?
                </h2>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-3)" }}>
                  Dinos qué pantalla era y con qué la estabas usando. Un reporte concreto vale más
                  que cualquier auditoría: lo que falla de verdad sólo aparece cuando alguien
                  intenta trabajar.
                </p>
              </div>
              <a
                href="mailto:soporte@pycore.app?subject=Accesibilidad"
                className="inline-flex items-center gap-2 rounded-btn px-5 py-3 font-semibold text-sm flex-shrink-0"
                style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
              >
                Reportarlo
                <Icon name="arrowRight" size={15} />
              </a>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
