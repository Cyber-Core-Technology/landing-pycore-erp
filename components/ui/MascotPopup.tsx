"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useDemoModal } from "@/lib/demo-context";

// Mensajes tipo "click bait" — se elige uno distinto cada vez que aparece.
const MESSAGES = [
  "¿Sigues usando Excel? Estás en la prehistoria 🦖",
  "Tu competencia ya controla su inventario en tiempo real 👀",
  "Cada venta sin registrar es dinero que se te escapa 💸",
  "Imagina cerrar tu caja en segundos, no en horas ⏱️",
  "¿Cuánto stock tienes detenido ahorita? PyCore lo sabe 📦",
  "Tus colegas ya lo probaron. ¿Y tú? 🤔",
  "Deja de adivinar tus números. Empieza a verlos 📊",
  "Vender sin internet sí se puede. ¿Ya lo sabías? 📶",
];

// Tiempos (ms)
const FIRST_DELAY = 8_000;   // primera aparición tras cargar
const VISIBLE_MS  = 13_000;  // cuánto permanece visible
const HIDDEN_MS   = 50_000;  // descanso entre apariciones

export function MascotPopup() {
  const { openModal } = useDemoModal();
  const [visible, setVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(() => Math.floor(Math.random() * MESSAGES.length));
  // nonce cambia al cerrar manualmente para reiniciar el ciclo
  const [nonce, setNonce] = useState(0);
  const firstRun = useRef(true);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    const show = () => {
      if (!alive) return;
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
      setVisible(true);
      timer = setTimeout(hide, VISIBLE_MS);
    };
    const hide = () => {
      if (!alive) return;
      setVisible(false);
      timer = setTimeout(show, HIDDEN_MS);
    };

    timer = setTimeout(show, firstRun.current ? FIRST_DELAY : HIDDEN_MS);
    firstRun.current = false;

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [nonce]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    setNonce((n) => n + 1); // reagenda la próxima aparición
  };

  return (
    <div className="fixed bottom-0 left-0 z-40 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 140 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 140 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="pointer-events-auto flex flex-col items-start gap-1.5 p-2 sm:p-3 max-w-[70vw]"
          >
            {/* Globo de diálogo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, originX: 0, originY: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 320, damping: 18 }}
              className="relative ml-1 max-w-[210px] rounded-2xl rounded-bl-sm bg-[var(--card)] border border-[var(--border)] shadow-xl px-3 py-2.5"
            >
              <button
                onClick={handleDismiss}
                aria-label="Cerrar mensaje"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--text-muted)] text-xs flex items-center justify-center hover:text-[var(--text)] transition-colors shadow"
              >
                ✕
              </button>
              <p className="text-xs font-medium text-[var(--text)] leading-snug pr-1">
                {MESSAGES[msgIndex]}
              </p>
              <button
                onClick={() => openModal()}
                className="mt-2 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
              >
                Quiero verlo →
              </button>
              {/* Colita del globo */}
              <span className="absolute -bottom-1.5 left-5 w-3 h-3 rotate-45 bg-[var(--card)] border-b border-r border-[var(--border)]" />
            </motion.div>

            {/* Personaje */}
            <motion.button
              onClick={() => openModal()}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              aria-label="Solicitar demo de PyCore SGC"
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-full"
            >
              <Image
                src="/avatar.png"
                alt="Asistente PyCore SGC"
                width={437}
                height={571}
                priority={false}
                className="w-12 sm:w-14 lg:w-16 h-auto drop-shadow-2xl select-none"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
