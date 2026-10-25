"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import { useDemoModal } from "@/lib/demo-context";

const links = [
  { label: "Pruébalo",    href: "/demo" },
  { label: "Módulos",     href: "/modulos" },
  { label: "Capacidades", href: "/capacidades" },
  { label: "Documentos",  href: "/documentos" },
  { label: "TEZCA",       href: "/tezca" },
  { label: "Tienda",      href: "/tienda" },
  { label: "Planes",      href: "/#planes" },
  { label: "Blog",        href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useDemoModal();
  const botonMenu = useRef<HTMLButtonElement>(null);
  const cajon = useRef<HTMLDivElement>(null);

  /*
    El cajón del móvil es un diálogo, no un `div` encima de la pantalla.

    Sin esto se entraba tabulando al contenido de atrás —que sigue ahí—, y
    Escape no hacía nada: el menú sólo cerraba con un clic fuera, que es un
    gesto de puntero. Quien navega con teclado entraba y no salía.

    Al cerrarlo el foco **vuelve al botón que lo abrió**: dejarlo en el aire
    manda el siguiente Tab al principio de la página.
  */
  useEffect(() => {
    if (!menuOpen) return;

    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        botonMenu.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      // `offsetParent` es el truco de siempre para «¿está visible?» y
      // devuelve nulo para todo lo que viva en un contenedor `fixed` — que es
      // exactamente lo que es esta cabecera.
      const foco = [...(cajon.current?.querySelectorAll<HTMLElement>("a, button") ?? [])]
        .filter((el) => el.checkVisibility());
      if (!foco.length) return;

      const primero = foco[0]!;
      const ultimo = foco[foco.length - 1]!;
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener("keydown", alPulsar);
    // El foco entra al cajón, no se queda en el botón de abrir.
    cajon.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => document.removeEventListener("keydown", alPulsar);
  }, [menuOpen]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    // Sobre lienzo claro la barra translúcida se lee mal: superficie sólida
    // siempre, y al hacer scroll solo gana elevación.
    <header
      className="sticky top-0 z-50 transition-shadow duration-200"
      style={{
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        boxShadow: scrolled ? "0 4px 16px rgba(28, 26, 23, 0.07)" : "none",
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
        aria-label="Navegación principal"
      >
        <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image
            src="/Logo-Completo.png"
            alt="Ícono PyCore"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="font-heading font-bold text-lg" style={{ color: "var(--text)" }}>
            PyCore <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>SGC</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-6 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: "var(--text-2)" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://plataforma.pycore.app"
            className="flex-none whitespace-nowrap rounded-btn px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{
              background: "var(--btn2)",
              color: "var(--text)",
              border: "1px solid var(--btn2-border)",
            }}
            aria-label="Iniciar sesión en la plataforma PyCore SGC"
          >
            Iniciar sesión
          </a>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="flex-none whitespace-nowrap rounded-btn px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
            aria-label="Solicitar demo de PyCore SGC"
          >
            Solicitar demo
          </motion.button>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={botonMenu}
            className="p-2.5 rounded-lg leading-none"
            style={{ color: "var(--text)" }}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <motion.div
          ref={cajon}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden px-4 pb-4"
          style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}
        >
          <ul className="flex flex-col gap-3 list-none pt-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-1.5 font-medium transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-2)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 pt-3 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
            <a
              href="https://plataforma.pycore.app"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center rounded-btn px-5 py-3 text-sm font-semibold transition-colors"
              style={{
                background: "var(--btn2)",
                color: "var(--text)",
                border: "1px solid var(--btn2-border)",
              }}
            >
              Iniciar sesión
            </a>
            <button
              onClick={() => { setMenuOpen(false); openModal(); }}
              className="w-full text-center rounded-btn px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
            >
              Solicitar demo
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
