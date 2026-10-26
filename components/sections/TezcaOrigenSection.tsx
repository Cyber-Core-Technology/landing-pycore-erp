"use client";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Revelar, TarjetaViva } from "@/components/ui/Revelar";

/*
  De dónde viene el nombre.

  Un asistente llamado por un dios mexica necesita explicarse, y la
  explicación resulta ser el mejor resumen de lo que hace: Tezcatlipoca mira
  por un espejo de obsidiana que humea y ve lo que los demás no alcanzan a
  ver. Eso es exactamente el trabajo del asistente — enseñar lo que está en
  los datos del negocio antes de que su dueño lo note.

  El jaguar es su nahual, y es el mismo SVG que lleva la plataforma
  (`frontend/src/assets/tezca-logo.svg`): copiado, no redibujado, para que la
  web y el sistema no acaben enseñando dos jaguares distintos.

  **Sobre el lienzo claro, no sobre la banda.** Con fondo oscuro quedaba
  pegada a la cabecera de la página —que también lo es— y las dos se leían
  como un solo bloque verde de dos pantallas de alto, sin principio ni fin.
  Lo único oscuro que queda es el recuadro del jaguar, que es donde el verde
  del logo necesita contraste para verse.
*/

const LECTURAS = [
  {
    icon: "eye",
    titulo: "El espejo que humea",
    texto:
      "«Tezcatlipoca» es, literalmente, espejo humeante. El dios mira por un disco de obsidiana pulida y ve lo que está ahí pero nadie alcanza a distinguir — que es lo que pasa con un negocio: el dato ya existe, sólo que repartido entre mil tickets.",
  },
  {
    icon: "flame",
    titulo: "El jaguar es su nahual",
    texto:
      "Su forma animal, el que se mueve de noche y ve en lo oscuro. Por eso el logo es un jaguar con ojos de obsidiana y no un robot ni una bombilla: no se trata de parecer futurista, se trata de ver.",
  },
  {
    icon: "bulb",
    titulo: "Adelantarse, no reportar",
    texto:
      "La diferencia entre un reporte y TEZCA es el tiempo verbal. Un reporte dice qué pasó; esto dice qué va a pasar si nadie hace nada — que a doña Mary le toca venir hoy y no ha venido, que ese producto se acaba el jueves.",
  },
];

export function TezcaOrigenSection() {
  return (
    <section className="py-16 lg:py-20" style={{ background: "var(--bg)" }} aria-labelledby="origen-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
          <Revelar desde="escala">
            <div className="flex flex-col items-center text-center">
              {/*
                El jaguar, en grande. Es el mismo archivo que lleva la
                plataforma: si se redibujara aquí, un día habría dos.
              */}
              <span
                className="icono-flota inline-flex items-center justify-center rounded-card-lg"
                style={{ background: "var(--band)", padding: 32 }}
              >
                <Image
                  src="/tezca-logo.svg"
                  alt="Jaguar de TEZCA, el nahual de Tezcatlipoca"
                  width={120}
                  height={120}
                  priority={false}
                />
              </span>
              <p
                className="font-heading font-bold text-2xl mt-5 tracking-[0.12em]"
                style={{ color: "var(--text)" }}
              >
                TEZCA
              </p>
              <p className="text-sm mt-1.5" style={{ color: "var(--text-muted)" }}>
                de <em>Tezcatlipoca</em> — «espejo humeante»
              </p>
            </div>
          </Revelar>

          <div>
            <Revelar>
              <p className="text-xs font-semibold tracking-[0.16em]" style={{ color: "var(--warm-ink)" }}>
                DE DÓNDE VIENE EL NOMBRE
              </p>
              <h2
                id="origen-heading"
                className="font-heading text-3xl lg:text-[38px] font-bold leading-[1.12] tracking-[-0.025em] mt-3"
                style={{ color: "var(--text)" }}
              >
                Ver lo que otros
                <br />
                no alcanzan a ver
              </h2>
              <p className="text-lg leading-relaxed mt-5 max-w-2xl" style={{ color: "var(--text-3)" }}>
                Tezcatlipoca es el dios mexica que mira a través de un espejo de obsidiana humeante.
                No adivina: mira mejor. Ese es el encargo del asistente — enseñarte las
                oportunidades de tu negocio <strong style={{ color: "var(--text)" }}>antes de
                que tú las veas</strong>, porque la información ya está en tu operación, sólo que
                repartida entre miles de tickets que nadie va a leer uno por uno.
              </p>
            </Revelar>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 list-none p-0">
              {LECTURAS.map((l, i) => (
                <TarjetaViva key={l.titulo} as="li" retardo={i * 0.07}>
                  <div
                    className="rounded-card p-5 h-full"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                  >
                    {/* La tarjeta ya es `--band-tile`: el icono necesita su
                        propio tono o se funde con ella y no se ve. */}
                    <span
                      className="icono-reacciona inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3"
                      style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                    >
                      <Icon name={l.icon} size={18} />
                    </span>
                    <h3
                      className="font-heading font-semibold text-[15px] leading-snug"
                      style={{ color: "var(--text)" }}
                    >
                      {l.titulo}
                    </h3>
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {l.texto}
                    </p>
                  </div>
                </TarjetaViva>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
