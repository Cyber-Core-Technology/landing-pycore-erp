import React from "react";
import Image from "next/image";
import { COMPANY_NAME, COMPANY_URL, SOCIAL_LINKS } from "@/lib/constants";

const socialIcons: Record<(typeof SOCIAL_LINKS)[number]["name"], string> = {
  Facebook:
    "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z",
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  X:
    "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z",
};

const productLinks = [
  { label: "Módulos",       href: "/modulos" },
  { label: "TEZCA IA",      href: "/tezca" },
  { label: "Tienda en Línea", href: "/tienda" },
  { label: "Planes",        href: "/#planes" },
];

const modulesLinks = [
  { label: "Inventario",        href: "/modulos#inventario" },
  { label: "Ventas / POS",      href: "/modulos#ventas" },
  { label: "Finanzas",          href: "/modulos#finanzas" },
  { label: "Compras",           href: "/modulos#compras" },
];

const companyLinks = [
  { label: "Blog",        href: "/blog" },
  { label: "Contacto",    href: "/#contacto" },
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
              <span className="font-heading font-bold text-lg text-[var(--text)]">PyCore SGC</span>
            </a>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              ERP modular en la nube para PyMEs mexicanas. Ventas, inventario, finanzas y tienda en línea en un solo sistema.
            </p>
            <p className="text-[var(--text-muted)] text-xs mt-4">
              Construido con ❤️ en México 🇲🇽
            </p>
            <ul className="flex items-center gap-2 mt-4 list-none">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`PyCore SGC en ${s.name}`}
                    title={s.name}
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d={socialIcons[s.name]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Producto */}
          <div>
            <h4 className="font-heading font-semibold text-[var(--text)] text-sm mb-4">Producto</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Módulos */}
          <div>
            <h4 className="font-heading font-semibold text-[var(--text)] text-sm mb-4">Módulos</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {modulesLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-heading font-semibold text-[var(--text)] text-sm mb-4">Empresa</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: "var(--color-primary)", opacity: 1 }}>
              <p className="text-white font-medium text-xs mb-1">¿Listo para empezar?</p>
              <a
                href="/#contacto"
                className="text-white/80 hover:text-white text-xs underline transition-colors"
              >
                Solicitar demo gratis →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[var(--text-muted)] text-xs">
            © {new Date().getFullYear()}{" "}
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              {COMPANY_NAME}
            </a>{" "}
            · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://plataforma.pycore.app/privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-xs"
            >
              Aviso de Privacidad
            </a>
            <span className="text-[var(--border)] text-xs">·</span>
            <a
              href="https://plataforma.pycore.app/terminos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-xs"
            >
              Términos de Uso
            </a>
            <span className="text-[var(--border)] text-xs hidden sm:inline">·</span>
            <div className="flex items-center gap-1 text-[var(--text-muted)] text-xs">
              <span>Diseñado en México</span>
              <span>🇲🇽</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
