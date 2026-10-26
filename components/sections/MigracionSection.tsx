"use client";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Revelar, TarjetaViva } from "@/components/ui/Revelar";

/*
  La migración desde otro punto de venta.

  Es el mayor quitamiedos del producto y estaba enterrado en `/capacidades`.
  Quien ya tiene un sistema no pregunta qué hace el nuestro: pregunta **si
  puede salir del suyo sin perder diez años de historia**.

  La portada generaliza a propósito —no es sitio para nombres de
  competidores—; aquí sí se nombra lo que hoy está soportado, porque quien
  llega a esta página viene justamente a saber si el suyo está en la lista.
  Decir «cualquier sistema» sería la mentira cómoda.
*/

const FASES = [
  {
    icon: "cloud",
    titulo: "Se lee tu archivo",
    texto:
      "Tu respaldo no viaja por internet ni se manda a ningún lado: se lee donde está. Lo que cruza entre piezas del sistema es el nombre del archivo, no el archivo.",
  },
  {
    icon: "search",
    titulo: "Se descubre qué trae",
    texto:
      "Las tablas y las columnas no se suponen: se descubren. Los nombres cambian de una versión a otra del mismo programa, y un sistema que los dé por sentados falla con el primer cliente que tenga otra.",
  },
  {
    icon: "link",
    titulo: "Se decide qué es cada cosa",
    texto:
      "Tus códigos, tus unidades y tus impuestos se corresponden con los de acá. Esa correspondencia queda guardada, que es lo que hace que una segunda pasada actualice en vez de duplicarte el catálogo.",
  },
  {
    icon: "eye",
    titulo: "Se simula — y aquí está el truco",
    texto:
      "La migración corre **de verdad**, dentro de una transacción que se deshace al terminar. Así el informe conoce los choques de clave y lo que no cabe antes de tocar nada. No es una previsualización: es el ensayo completo.",
  },
  {
    icon: "check",
    titulo: "Se carga, y se puede deshacer",
    texto:
      "Cada registro recuerda de dónde vino. Volver a correrla no duplica nada, y deshacerla no borra lo que ya existía y sólo se enlazó.",
  },
];

const QUE_SE_TRAE = [
  { icon: "box", texto: "Tu catálogo completo, con precios y códigos de barras" },
  { icon: "users", texto: "Tus clientes y proveedores, con sus datos y su crédito" },
  { icon: "chart", texto: "Tus existencias al día del corte" },
  { icon: "receipt", texto: "Tu historial de ventas — años de tickets, como historia de sólo lectura" },
];

export function MigracionSection() {
  return (
    <>
      <section className="py-16" style={{ background: "var(--bg)" }} aria-labelledby="que-se-trae">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Revelar>
            <p className="text-xs font-semibold tracking-[0.16em]" style={{ color: "var(--warm-ink)" }}>
              QUÉ SE TRAE
            </p>
            <h2
              id="que-se-trae"
              className="font-heading text-3xl lg:text-[38px] font-bold leading-[1.12] tracking-[-0.025em] mt-3"
              style={{ color: "var(--text)" }}
            >
              Todo, no sólo la lista
              <br />
              de productos
            </h2>
          </Revelar>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-9 list-none p-0">
            {QUE_SE_TRAE.map((q, i) => (
              <Revelar key={q.texto} as="li" retardo={i * 0.06}>
                <div
                  className="flex items-start gap-3 rounded-card p-5 h-full"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                    style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                  >
                    <Icon name={q.icon} size={19} />
                  </span>
                  <p className="text-sm leading-relaxed pt-2" style={{ color: "var(--text-2)" }}>
                    {q.texto}
                  </p>
                </div>
              </Revelar>
            ))}
          </ul>

          <Revelar retardo={0.1}>
            <p
              className="text-sm rounded-card px-4 py-3.5 mt-5 leading-relaxed"
              style={{
                background: "var(--warm-tint)",
                border: "1px solid var(--warm-tint-border)",
                color: "var(--text-3)",
              }}
            >
              <strong style={{ color: "var(--warm-ink)" }}>Las ventas migradas son historia, no operación.</strong>{" "}
              Entran marcadas como tales: no mueven inventario ni caja, porque tu existencia inicial
              ya refleja lo que vendiste. Sin esa regla, migrar tu historial te descuadraría el
              almacén el primer día.
            </p>
          </Revelar>
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--card)" }} aria-labelledby="como-se-hace">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Revelar>
            <p className="text-xs font-semibold tracking-[0.16em]" style={{ color: "var(--accent-ink)" }}>
              CÓMO SE HACE
            </p>
            <h2
              id="como-se-hace"
              className="font-heading text-3xl lg:text-[38px] font-bold leading-[1.12] tracking-[-0.025em] mt-3"
              style={{ color: "var(--text)" }}
            >
              Cinco pasos, y el cuarto
              <br />
              es el que importa
            </h2>
          </Revelar>

          <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-9 list-none p-0">
            {FASES.map((f, i) => (
              <TarjetaViva key={f.titulo} as="li" retardo={i * 0.06}>
                <div
                  className="rounded-card p-5 h-full"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold flex-shrink-0"
                      style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-heading font-semibold text-[15px]" style={{ color: "var(--text)" }}>
                      {f.titulo}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-3)" }}
                    dangerouslySetInnerHTML={{
                      __html: f.texto.replace(
                        /\*\*(.+?)\*\*/g,
                        '<strong style="color:var(--text)">$1</strong>',
                      ),
                    }}
                  />
                </div>
              </TarjetaViva>
            ))}
          </ol>

          <Revelar retardo={0.12}>
            <div
              className="rounded-card-lg p-6 sm:p-7 mt-6"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-heading font-bold text-lg" style={{ color: "var(--text)" }}>
                ¿De qué sistema vienes?
              </h3>
              <p className="text-sm mt-2.5 leading-relaxed max-w-3xl" style={{ color: "var(--text-3)" }}>
                Hoy el camino probado de punta a punta es <strong style={{ color: "var(--text)" }}>Eleventa</strong>,
                con un archivo real de 2024 y 79 tablas por delante — incluida la parte difícil, que es
                el historial de ventas que ese programa guarda fuera de sus propias tablas. El lector
                está hecho para que un sistema nuevo sea un perfil de configuración, no código nuevo:
                si vienes de otro, mándanos un respaldo y te decimos qué se puede traer antes de que
                contrates nada.
              </p>
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 rounded-btn px-4 py-2.5 mt-5 font-semibold text-sm"
                style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
              >
                Mándanos tu respaldo
                <Icon name="arrowRight" size={15} />
              </Link>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
