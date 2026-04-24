"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useDemoModal } from "@/lib/demo-context";

const links = [
  { label: "Módulos",  href: "/modulos" },
  { label: "TEZCA",    href: "/tezca" },
  { label: "Tienda",   href: "/tienda" },
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
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <a href="/" className="flex items-center gap-2.5">
          <Image
            src="/Logo-Completo.png"
            alt="Ícono PyCore"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="font-heading font-bold text-lg text-[var(--text)]">PyCore ERP</span>
        </a>

        <ul className="hidden md:flex items-center gap-6 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => openModal()}
            className="bg-[var(--color-primary)] text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-[var(--color-secondary)] transition-colors"
            aria-label="Solicitar demo de PyCore ERP"
          >
            Solicitar Demo
          </motion.button>
        </div>

        <button
          className="md:hidden p-2 text-[var(--text)] rounded"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--bg)] border-b border-[var(--border)] px-4 pb-4"
        >
          <ul className="flex flex-col gap-3 list-none pt-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-[var(--text-muted)] hover:text-[var(--color-primary)] py-1 font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 pt-3">
            <ThemeToggle />
            <button
              onClick={() => { setMenuOpen(false); openModal(); }}
              className="bg-[var(--color-primary)] text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-[var(--color-secondary)] transition-colors"
            >
              Solicitar Demo
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
