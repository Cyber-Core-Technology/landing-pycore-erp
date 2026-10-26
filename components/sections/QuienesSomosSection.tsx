"use client";
import { Icon } from "@/components/ui/Icon";
import { Revelar, TarjetaViva } from "@/components/ui/Revelar";
import { AUTORIA, EMPRESA, RESPALDO } from "@/lib/empresa";
import { COMPANY_NAME, COMPANY_URL, DEVELOPER_PERFIL, DEVELOPER_URL } from "@/lib/constants";

/*
  Quiénes somos, dentro de Contacto.

  Va aquí y no en una página aparte porque son la misma pregunta vista desde
  dos lados: «cómo te alcanzo» y «quién me va a contestar». Separadas, la de
  contacto se quedaba en tres tarjetas y un hueco.

  El peso es de **la empresa**. La autoría del sistema aparece una vez, con
  nombre y con su ficha verificable, y se acabó: quien lee vino a decidir si
  le compra a una empresa seria, no a conocer a nadie.
*/

/** Pone en negrita lo marcado con ** sin arrastrar un Markdown entero. */
function conEnfasis(texto: string) {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((trozo, i) =>
    trozo.startsWith("**") ? (
      <strong key={i} style={{ color: "var(--text)" }}>
        {trozo.slice(2, -2)}
      </strong>
    ) : (
      trozo
    ),
  );
}

export function QuienesSomosSection() {
  return (
    <>
      {/* ── La empresa ─────────────────────────────────────────────── */}
      <section
        id="quienes-somos"
        className="py-16 scroll-mt-24"
        style={{ background: "var(--card)" }}
        aria-labelledby="empresa-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] gap-10">
            <div>
              <Revelar>
                <p className="text-xs font-semibold tracking-[0.16em]" style={{ color: "var(--warm-ink)" }}>
                  QUIÉNES SOMOS
                </p>
                <h2
                  id="empresa-heading"
                  className="font-heading text-3xl lg:text-[38px] font-bold leading-[1.12] tracking-[-0.025em] mt-3"
                  style={{ color: "var(--text)" }}
                >
                  {COMPANY_NAME}
                </h2>
                <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "var(--text-3)" }}>
                  {EMPRESA.descripcion}
                </p>
              </Revelar>

              {EMPRESA.parrafos.map((t, i) => (
                <Revelar key={i} retardo={0.08 + i * 0.05}>
                  <p className="text-base leading-relaxed mt-4 max-w-2xl" style={{ color: "var(--text-3)" }}>
                    {conEnfasis(t)}
                  </p>
                </Revelar>
              ))}

              <Revelar retardo={0.26}>
                <ul className="flex flex-wrap gap-2 mt-6 list-none p-0">
                  {EMPRESA.valores.map((v) => (
                    <li
                      key={v}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: "var(--chip)", color: "var(--chip-ink)" }}
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </Revelar>
            </div>

            <Revelar desde="derecha" retardo={0.1}>
              <div
                className="rounded-card-lg p-6 h-full flex flex-col"
                style={{ background: "var(--band)", border: "1px solid var(--band-border)" }}
              >
                <p
                  className="text-xs font-semibold tracking-[0.1em] uppercase"
                  style={{ color: "var(--band-eyebrow)" }}
                >
                  Su lema
                </p>
                <p
                  className="font-heading text-xl font-bold mt-3 leading-snug"
                  style={{ color: "var(--band-ink)" }}
                >
                  «{EMPRESA.lema}»
                </p>

                {/* A qué se dedica: el lema solo dejaba media columna vacía. */}
                <p
                  className="text-xs font-semibold tracking-[0.1em] uppercase mt-7 mb-3"
                  style={{ color: "var(--band-eyebrow)" }}
                >
                  A qué se dedica
                </p>
                <ul className="flex flex-col gap-3.5 list-none p-0 flex-1">
                  {EMPRESA.especialidades.map((e) => (
                    <li key={e.nombre} className="flex items-start gap-3">
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                        style={{ background: "var(--band-tile)", color: "var(--band-eyebrow)" }}
                      >
                        <Icon name={e.icon} size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold" style={{ color: "var(--band-ink)" }}>
                          {e.nombre}
                        </span>
                        <span className="block text-xs mt-0.5 leading-snug" style={{ color: "var(--band-ink-2)" }}>
                          {e.desc}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={COMPANY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace-avanza inline-flex items-center gap-2 rounded-btn px-4 py-2.5 mt-6 font-semibold text-sm self-start"
                  style={{ background: "var(--band-btn)", color: "var(--band-btn-fg)" }}
                >
                  Ir al sitio de la empresa
                  <Icon name="arrowRight" size={15} />
                </a>
              </div>
            </Revelar>
          </div>

          {/* Lo que la empresa pone detrás, desde lo que le importa a quien compra */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 list-none p-0">
            {RESPALDO.map((r, i) => (
              <TarjetaViva key={r.titulo} as="li" retardo={i * 0.07}>
                <div
                  className="rounded-card p-5 h-full"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <span
                    className="icono-reacciona inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                    style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                  >
                    <Icon name={r.icon} size={19} />
                  </span>
                  <h3 className="font-heading font-semibold text-[15px]" style={{ color: "var(--text)" }}>
                    {r.titulo}
                  </h3>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-3)" }}>
                    {r.texto}
                  </p>
                </div>
              </TarjetaViva>
            ))}
          </ul>
        </div>
      </section>

      {/* ── El crédito, una vez ────────────────────────────────────── */}
      <section className="py-14" style={{ background: "var(--bg)" }} aria-labelledby="autoria-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Revelar>
            <div
              className="rounded-card-lg p-6 sm:p-7"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-semibold tracking-[0.14em]" style={{ color: "var(--accent-ink)" }}>
                QUIÉN LO ESCRIBIÓ
              </p>
              <h2
                id="autoria-heading"
                className="font-heading font-bold text-xl mt-2"
                style={{ color: "var(--text)" }}
              >
                {AUTORIA.nombre}
                <span className="block text-sm font-normal mt-1" style={{ color: "var(--text-muted)" }}>
                  {AUTORIA.titulo} · {COMPANY_NAME}
                </span>
              </h2>

              <p className="text-sm leading-relaxed mt-4 max-w-3xl" style={{ color: "var(--text-3)" }}>
                {AUTORIA.texto}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mt-5">
                <a
                  href={DEVELOPER_PERFIL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace-avanza inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--accent-ink)" }}
                >
                  Su ficha en la empresa
                  <Icon name="arrowRight" size={14} />
                </a>
                <a
                  href={DEVELOPER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace-avanza inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--accent-ink)" }}
                >
                  Su trabajo de infraestructura
                  <Icon name="arrowRight" size={14} />
                </a>
                {AUTORIA.reconocimientos.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-1.5 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Icon name="trophy" size={13} />
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
