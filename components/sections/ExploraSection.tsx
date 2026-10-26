"use client";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Revelar, TarjetaViva } from "@/components/ui/Revelar";

/*
  El índice de la plataforma.

  La portada llevaba doce secciones y había que deslizar un buen rato para
  llegar a los planes — el contenido estaba, pero enterrado, que para quien
  llega es lo mismo que no estar. Ahora la portada dice qué hay y cada tema
  vive en su propia pantalla, con su URL, su título y su sitio en el mapa del
  sitio. De paso cada página carga lo suyo y no lo de las otras once.

  Cada tarjeta lleva **una cifra o un hecho comprobable**, no un adjetivo:
  «11 módulos», «5 PDF descargables». Es lo que distingue un índice de una
  rejilla de iconos.
*/

const DESTINOS = [
  {
    href: "/demo",
    icon: "cursor",
    nombre: "Pruébalo tú",
    dato: "Sin registro",
    desc: "Cobra una venta aquí mismo: pesa a granel, vende por cartón, agrega un extra y mira bajar el inventario.",
  },
  {
    href: "/giros",
    icon: "store",
    nombre: "Para tu giro",
    dato: "12 giros",
    desc: "Una carnicería pesa, una panadería hornea y un billar cobra por reloj. Busca el tuyo.",
  },
  {
    href: "/migracion",
    icon: "refresh",
    nombre: "Vienes de otro sistema",
    dato: "Sin recapturar",
    desc: "Catálogo, clientes, existencias e historial. Se ensaya completa antes de tocar nada.",
  },
  {
    href: "/modulos",
    icon: "layers",
    nombre: "Los módulos",
    dato: "11 módulos",
    desc: "Inventario, ventas, compras, facturación CFDI, finanzas, RRHH y auditoría. Activas los que necesitas.",
  },
  {
    href: "/capacidades",
    icon: "bolt",
    nombre: "Lo que sólo se ve operando",
    dato: "34 detalles",
    desc: "El cigarro suelto y por cartón. El granel en gramos. Cobrar sin internet y que no se duplique la venta.",
  },
  {
    href: "/documentos",
    icon: "receipt",
    nombre: "Los documentos",
    dato: "5 PDF para bajar",
    desc: "Reporte, corte de caja, resumen diario, expediente y ticket. Los archivos de verdad, con datos.",
  },
  {
    href: "/tezca",
    icon: "robot",
    nombre: "TEZCA",
    dato: "Analiza cada hora",
    desc: "Te dice qué hacer, no sólo qué pasó. Resumen diario, alertas y a qué cliente escribirle hoy.",
  },
  {
    href: "/tienda",
    icon: "store",
    nombre: "Tu tienda en línea",
    dato: "Stock en vivo",
    desc: "Catálogo público conectado al mismo inventario, con cobro por Mercado Pago. Sin doble captura.",
  },
  {
    href: "/plataforma",
    icon: "shield",
    nombre: "La plataforma",
    dato: "2FA y auditoría",
    desc: "El panel de mando, la seguridad, el aislamiento entre empresas y por qué funciona sin internet.",
  },
];

export function ExploraSection() {
  return (
    <section
      id="explora"
      className="py-20"
      style={{ background: "var(--card)" }}
      aria-labelledby="explora-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="explora-heading"
          eyebrow="RECORRE EL SISTEMA"
          title={<>Empieza por donde<br />te duela más hoy</>}
          subtitle="Cada tema tiene su propia pantalla, con el detalle completo. Esto es el índice."
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
          {DESTINOS.map((d, i) => (
            <TarjetaViva key={d.href} as="li" retardo={i * 0.06}>
              <Link
                href={d.href}
                className="group flex flex-col h-full rounded-card p-5 transition-colors"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="icono-reacciona inline-flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
                    style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                  >
                    <Icon name={d.icon} size={21} />
                  </span>
                  <span
                    className="text-[11px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                    style={{ background: "var(--chip)", color: "var(--chip-ink)" }}
                  >
                    {d.dato}
                  </span>
                </div>

                <h3
                  className="font-heading font-semibold text-[17px] mt-4 leading-tight"
                  style={{ color: "var(--text)" }}
                >
                  {d.nombre}
                </h3>
                <p
                  className="text-sm mt-2 leading-relaxed flex-1"
                  style={{ color: "var(--text-3)" }}
                >
                  {d.desc}
                </p>

                <span
                  className="enlace-avanza inline-flex items-center gap-1.5 text-sm font-semibold mt-4"
                  style={{ color: "var(--accent-ink)" }}
                >
                  Ver
                  <Icon name="arrowRight" size={15} />
                </span>
              </Link>
            </TarjetaViva>
          ))}
        </ul>

        <Revelar retardo={0.1}>
          <p className="text-sm mt-8" style={{ color: "var(--text-muted)" }}>
            ¿Prefieres verlo funcionando? La demo trae un negocio completo con
            18 meses de operación cargada.
          </p>
        </Revelar>
      </div>
    </section>
  );
}
