"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import { useDemoModal } from "@/lib/demo-context";

/*
  Ocho enlaces sueltos en la barra la dejaban saturada: a partir de cierto
  número, una lista deja de ser un menú y pasa a ser una pared de palabras
  que nadie lee entera.

  Los cinco que describen el producto cuelgan de «Producto»; arriba quedan
  los cuatro que son una decisión: probarlo, cuánto cuesta, y el blog.
  «Pruébalo» va primero porque es la acción, no un tema más.
*/
const PRODUCTO = [
  { label: "Módulos",     href: "/modulos",     desc: "Los once módulos del sistema" },
  { label: "Capacidades", href: "/capacidades", desc: "Lo que sólo se ve operando" },
  { label: "Documentos",  href: "/documentos",  desc: "Los PDF que genera, para bajar" },
  { label: "TEZCA",       href: "/tezca",       desc: "El asistente con tus datos" },
  { label: "Tienda",      href: "/tienda",      desc: "Tu catálogo público en línea" },
  { label: "Migración",   href: "/migracion",   desc: "Traer tu sistema actual completo" },
  { label: "La plataforma", href: "/plataforma", desc: "Panel de mando, seguridad y datos" },
];

const links = [
  { label: "Para tu giro", href: "/giros" },
  { label: "Pruébalo",     href: "/demo" },
  { label: "Planes",       href: "/#planes" },
  { label: "Contacto",     href: "/contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useDemoModal();
  const botonMenu = useRef<HTMLButtonElement>(null);
  const cajon = useRef<HTMLDivElement>(null);
  const [abierto, setAbierto] = useState(false);
  const botonProducto = useRef<HTMLButtonElement>(null);
  const menuProducto = useRef<HTMLDivElement>(null);

  /*
    El desplegable de «Producto» cierra con Escape devolviendo el foco al
    botón, y con un clic fuera. Sólo con el clic fuera no se puede cerrar con
    el teclado, que es como se queda uno atrapado dentro de un menú.
  */
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAbierto(false);
      botonProducto.current?.focus();
    };
    const alTocar = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuProducto.current?.contains(t) || botonProducto.current?.contains(t)) return;
      setAbierto(false);
    };
    document.addEventListener("keydown", alPulsar);
    document.addEventListener("mousedown", alTocar);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.removeEventListener("mousedown", alTocar);
    };
  }, [abierto]);

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
          <li className="relative">
            <button
              ref={botonProducto}
              type="button"
              aria-expanded={abierto}
              aria-haspopup="true"
              onClick={() => setAbierto((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "var(--text-2)" }}
            >
              Producto
              <span
                className="transition-transform"
                style={{ transform: abierto ? "rotate(180deg)" : "none" }}
              >
                <Icon name="chevronDown" size={14} />
              </span>
            </button>

            {abierto && (
              <motion.div
                ref={menuProducto}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16 }}
                className="absolute left-0 top-full mt-3 rounded-card p-2 z-50"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 12px 32px rgba(28, 26, 23, 0.14)",
                  width: 280,
                }}
              >
                {PRODUCTO.map((x) => (
                  <a
                    key={x.href}
                    href={x.href}
                    onClick={() => setAbierto(false)}
                    className="block rounded-btn px-3 py-2.5 transition-colors hover:opacity-80"
                  >
                    <span className="block text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {x.label}
                    </span>
                    <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {x.desc}
                    </span>
                  </a>
                ))}
              </motion.div>
            )}
          </li>

          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-enlace text-sm font-medium"
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

          {/* En el cajón no hay desplegable: cabe todo, y un menú dentro de
              otro menú en un teléfono es un clic de más por nada. */}
          <p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase pt-4 pb-1"
            style={{ color: "var(--text-muted)" }}
          >
            Producto
          </p>
          <ul className="flex flex-col gap-3 list-none">
            {PRODUCTO.map((l) => (
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
