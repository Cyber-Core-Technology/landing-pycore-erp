"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import { useDemoModal } from "@/lib/demo-context";

const links = [
  { label: "Módulos",  href: "/modulos" },
  { label: "TEZCA",    href: "/tezca" },
  { label: "Tienda",   href: "/tienda" },
  { label: "Blog",     href: "/blog" },
  { label: "Planes",   href: "/#planes" },
  { label: "Contacto", href: "/#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useDemoModal();

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
