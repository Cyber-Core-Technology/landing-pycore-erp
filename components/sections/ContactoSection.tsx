"use client";
import { Icon } from "@/components/ui/Icon";
import { Revelar, TarjetaViva } from "@/components/ui/Revelar";
import { useDemoModal } from "@/lib/demo-context";
import {
  COMPANY_NAME, COMPANY_URL, CONTACTO, DEVELOPER_NAME, DEVELOPER_PERFIL,
  DEVELOPER_URL, SOCIAL_LINKS, WHATSAPP_URL,
} from "@/lib/constants";
import { TRAZOS_REDES, etiquetaRed } from "@/lib/redes";

/*
  Contacto.

  Un comprador que vende con el sistema todo el día no quiere un formulario
  de quince campos: quiere saber **por dónde le van a contestar y en cuánto
  tiempo**. Por eso lo primero son las vías, con su para-qué al lado, y el
  formulario largo se queda donde ya estaba — detrás del botón de demo.

  Lo que no se hace aquí es prometer un tiempo de respuesta que nadie se haya
  comprometido a cumplir. Si no sabemos el plazo, no se inventa.
*/

/*
  Las vías salen de `CONTACTO`, no escritas aquí: un canal de contacto roto
  no da error — simplemente nadie contesta, y eso no se nota hasta que ya
  costó un cliente.
*/
const VIAS = [
  {
    icon: "chat",
    titulo: "WhatsApp",
    para: "Lo más rápido para una duda concreta. Es también el número por el que el sistema manda tickets y facturas.",
    accion: CONTACTO.whatsappVisible,
    href: WHATSAPP_URL,
    externo: true,
  },
  {
    icon: "globe",
    titulo: "Correo",
    para: "Para lo que lleva un archivo: tu respaldo, tu lista de precios, tu catálogo en Excel.",
    accion: CONTACTO.email,
    href: `mailto:${CONTACTO.email}`,
    externo: true,
  },
  {
    icon: "cursor",
    titulo: "Demo guiada",
    para: "Media hora sobre tu operación y no sobre un ejemplo, con tu giro por delante.",
    accion: "Agendar una demo",
    href: null,
    externo: false,
  },
  {
    icon: "refresh",
    titulo: "¿Vienes de otro sistema?",
    para: "Mándanos un respaldo y te decimos qué se puede traer antes de que contrates nada.",
    accion: "Ver cómo se migra",
    href: "/migracion",
    externo: false,
  },
];

export function ContactoSection() {
  const { openModal } = useDemoModal();

  return (
    <>
      <section id="contacto" className="py-16" style={{ background: "var(--bg)" }} aria-labelledby="vias-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Revelar>
            <h2 id="vias-heading" className="sr-only">
              Vías de contacto
            </h2>
          </Revelar>

          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 list-none p-0">
            {VIAS.map((v, i) => (
              <TarjetaViva key={v.titulo} as="li" retardo={i * 0.07}>
                <div
                  className="rounded-card p-6 h-full flex flex-col"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <span
                    className="icono-reacciona inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                    style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                  >
                    <Icon name={v.icon} size={21} />
                  </span>
                  <h3 className="font-heading font-semibold text-lg" style={{ color: "var(--text)" }}>
                    {v.titulo}
                  </h3>
                  <p className="text-sm mt-2 leading-relaxed flex-1" style={{ color: "var(--text-3)" }}>
                    {v.para}
                  </p>

                  {v.href ? (
                    <a
                      href={v.href}
                      {...(v.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="enlace-avanza inline-flex items-center gap-1.5 text-sm font-semibold mt-4"
                      style={{ color: "var(--accent-ink)" }}
                    >
                      {v.accion}
                      <Icon name="arrowRight" size={15} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openModal()}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4 self-start"
                      style={{ color: "var(--accent-ink)" }}
                    >
                      {v.accion}
                      <Icon name="arrowRight" size={15} />
                    </button>
                  )}
                </div>
              </TarjetaViva>
            ))}
          </ul>
        </div>
      </section>

      {/* Quién está detrás vive en `/nosotros`: es otra pregunta, y daba
          para mucho más de lo que cabe aquí. */}
    </>
  );
}
