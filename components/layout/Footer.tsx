import React from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import {
  COMPANY_NAME, COMPANY_URL, CONTACTO, DEVELOPER_NAME, DEVELOPER_URL, REPO_URL,
  SOCIAL_LINKS, WHATSAPP_URL,
} from "@/lib/constants";
import { TRAZOS_REDES, etiquetaRed } from "@/lib/redes";



const productLinks = [
  { label: "Módulos",         href: "/modulos" },
  { label: "Capacidades",     href: "/capacidades" },
  { label: "TEZCA IA",        href: "/tezca" },
  { label: "Tienda en Línea", href: "/tienda" },
  { label: "Documentos",      href: "/documentos" },
  { label: "Planes",          href: "/#planes" },
];

const modulesLinks = [
  { label: "Para tu giro",  href: "/giros" },
  { label: "Pruébalo tú",   href: "/demo" },
  { label: "Migración",     href: "/migracion" },
  { label: "La plataforma", href: "/plataforma" },
];

const companyLinks = [
  { label: "Quiénes somos", href: "/contacto#quienes-somos" },
  { label: "Blog",          href: "/blog" },
  { label: "Contacto",      href: "/contacto" },
  { label: "Accesibilidad", href: "/accesibilidad" },
  { label: "Solicitar Demo", href: "#" },
];

export function Footer() {
  return (
    <footer
      id="contacto"
      className="border-t border-[var(--border)]"
      style={{ background: "var(--card)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <a href="/" className="inline-flex items-center gap-2 mb-3">
              <Image
                src="/Logo-Completo.png"
                alt="Ícono PyCore"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="font-heading font-bold text-lg" style={{ color: "var(--text)" }}>PyCore <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>SGC</span></span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-3)" }}>
              ERP modular en la nube para PyMEs mexicanas. Ventas, inventario, finanzas y tienda en línea en un solo sistema.
            </p>
            <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
              Construido en México, para México.
            </p>

            {/* Las dos vías reales, donde se buscan: en el pie. */}
            <ul className="flex flex-col gap-1.5 mt-4 list-none p-0">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-2)" }}
                >
                  <Icon name="chat" size={15} />
                  {CONTACTO.whatsappVisible}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACTO.email}`}
                  className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-2)" }}
                >
                  <Icon name="globe" size={15} />
                  {CONTACTO.email}
                </a>
              </li>
            </ul>
            <ul className="flex items-center gap-2 mt-4 list-none">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={etiquetaRed(s.name)}
                    title={s.name === "GitHub" ? "Código fuente en GitHub" : s.name}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      border: "1px solid var(--btn2-border)",
                      background: "var(--btn2)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d={TRAZOS_REDES[s.name]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Producto */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>Producto</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Módulos */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>Empezar</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {modulesLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>Empresa</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-4 rounded-card" style={{ background: "var(--band)" }}>
              <p className="font-heading font-semibold text-sm mb-1" style={{ color: "var(--band-ink)" }}>
                ¿Listo para empezar?
              </p>
              <a
                href="/#contacto"
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
                style={{ color: "var(--band-eyebrow)" }}
              >
                Solicitar demo gratis
                <Icon name="arrowRight" size={14} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()}{" "}
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              {COMPANY_NAME}
            </a>{" "}
            · Todos los derechos reservados
            <span className="block mt-1 text-center sm:text-left">
              Desarrollado por{" "}
              <a
                href={DEVELOPER_URL}
                target="_blank"
                rel="author noopener"
                title={`Portafolio de ${DEVELOPER_NAME}`}
                className="font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--accent-ink)" }}
              >
                {DEVELOPER_NAME}
              </a>
            </span>
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://plataforma.pycore.app/privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}
            >
              Aviso de Privacidad
            </a>
            <span className="text-xs" style={{ color: "var(--border)" }}>·</span>
            <a
              href="https://plataforma.pycore.app/terminos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}
            >
              Términos de Uso
            </a>
            <span className="text-xs hidden sm:inline" style={{ color: "var(--border)" }}>·</span>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Código fuente público de PyCore SGC en GitHub"
              className="text-xs transition-opacity hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
            >
              Código fuente en GitHub
            </a>
            <span className="text-xs hidden sm:inline" style={{ color: "var(--border)" }}>·</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Diseñado en México
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
