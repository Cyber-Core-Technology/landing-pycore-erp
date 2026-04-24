import React from "react";
import Image from "next/image";

const productLinks = [
  { label: "Módulos",       href: "/modulos" },
  { label: "TEZCA IA",      href: "/tezca" },
  { label: "Tienda en Línea", href: "/tienda" },
  { label: "Planes",        href: "/#planes" },
];

const modulesLinks = [
  { label: "Inventario",        href: "/modulos#inventario" },
  { label: "Ventas / POS",      href: "/modulos#ventas" },
  { label: "Facturación CFDI",  href: "/modulos#cfdi" },
  { label: "Finanzas",          href: "/modulos#finanzas" },
  { label: "Compras",           href: "/modulos#compras" },
];

const companyLinks = [
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-flex items-center gap-2 mb-3">
              <Image
                src="/Logo-Completo.png"
                alt="Ícono PyCore"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="font-heading font-bold text-lg text-[var(--text)]">PyCore ERP</span>
            </a>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              ERP modular en la nube para PyMEs mexicanas. Ventas, inventario, finanzas y tienda en línea en un solo sistema.
            </p>
            <p className="text-[var(--text-muted)] text-xs mt-4">
              Construido con ❤️ en México 🇲🇽
            </p>
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
            © {new Date().getFullYear()} Cyber Core Technology · Todos los derechos reservados
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
