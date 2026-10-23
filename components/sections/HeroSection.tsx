"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroStepStage, STEPS, type Phase } from "@/components/ui/HeroStepStage";
import { TicketSatellite, InsightSatellite } from "@/components/ui/HeroSatellites";
import { Icon } from "@/components/ui/Icon";
import { useDemoModal } from "@/lib/demo-context";

// Cada paso se cuenta en dos tiempos: portada y proceso.
const TITLE_MS = 1500;
const SCENE_MS = 4300;
const STEP_MS = TITLE_MS + SCENE_MS;

// Cada satélite entra en el momento exacto de su escena: el insight cuando la
// importación termina de contar, el ticket cuando la venta queda registrada.
// En segundos, porque es el retardo de la animación de entrada.
const INSIGHT_IN = 2.4;
const TICKET_IN = 2.3;

// Hardware y cumplimiento que el sistema soporta de verdad: lector de códigos,
// impresora térmica, báscula, huella del checador y CFDI 4.0.
const CAPABILITIES = [
  { icon: "barcode",     text: "Pistola lectora" },
  { icon: "printer",     text: "Impresora térmica" },
  { icon: "scale",       text: "Báscula" },
  { icon: "fingerprint", text: "Checador con huella" },
  { icon: "receipt",     text: "CFDI 4.0" },
  { icon: "chat",        text: "Tickets por WhatsApp" },
];

export function HeroSection() {
  const { openModal } = useDemoModal();
  const reduced = useReducedMotion() ?? false;

  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("title");
  const [paused, setPaused] = useState(false);
  // Reinicia la cuenta al tocar un paso a mano, para que no se adelante encima.
  const [cycle, setCycle] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cada satélite pertenece a un paso y vive exactamente lo que vive su
  // proceso: el insight de stock al cargar el inventario, el ticket al cobrar.
  // Derivados del mismo estado que la escena, así no pueden desincronizarse.
  // Con menos movimiento se quedan fijos: ahí no hay ciclo que los traiga.
  const insightOut = reduced || (step === 1 && phase === "scene");
  const ticketOut = reduced || (step === 2 && phase === "scene");

  useEffect(() => {
    if (reduced || paused) return;

    timer.current = setTimeout(
      () => {
        if (phase === "title") {
          setPhase("scene");
        } else {
          setStep((s) => (s + 1) % STEPS.length);
          setPhase("title");
        }
      },
      phase === "title" ? TITLE_MS : SCENE_MS
    );

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [step, phase, cycle, paused, reduced]);

  const pick = useCallback((i: number) => {
    setStep(i);
    setPhase("title");
    setCycle((c) => c + 1);
  }, []);

  return (
    // Alto de la ventana menos la barra (4rem) para que el héroe entre
    // completo sin desplazarse. svh, no vh: en móvil vh miente por la barra
    // del navegador. Es min-h, así que si el contenido crece no se recorta.
    <section
      style={{ background: "var(--bg)" }}
      className="flex items-center lg:min-h-[calc(100svh-4rem)]"
      aria-label="PyCore SGC — el núcleo de tu negocio"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-8">
        {/* Las dos cajas van centradas en su columna. La izquierda pesa un
            poco más: el marco de la derecha necesita aire alrededor para que
            los satélites asomen sin chocar con el texto. */}
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-center">

          {/* ── Izquierda: estática ── */}
          <div className="w-full max-w-[540px] mx-auto">
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="block text-xs font-semibold tracking-[0.16em] mb-4"
              style={{ color: "var(--warm-ink)" }}
            >
              ERP MODULAR PARA PYMES MEXICANAS
            </motion.span>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.04] tracking-[-0.03em] mb-5"
              style={{ color: "var(--text)" }}
            >
              El <span style={{ color: "var(--accent)" }}>núcleo</span>
              <br className="hidden sm:block" /> de tu negocio
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg lg:text-xl mb-7 leading-relaxed"
              style={{ color: "var(--text-3)" }}
            >
              Ventas, inventario, reportes y más, desde un solo lugar. Empieza a
              operar en tres pasos — y si ya usas Eleventa, migras sin
              recapturar nada.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-btn transition-opacity hover:opacity-90 text-base cursor-pointer"
                style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
                aria-label="Solicitar demo de PyCore SGC"
              >
                Solicitar demo gratis
                <Icon name="arrowRight" size={18} strokeWidth={2} />
              </motion.button>
              <a
                href="#funciones"
                className="inline-flex items-center font-semibold px-7 py-4 rounded-btn transition-colors text-base"
                style={{
                  background: "var(--btn2)",
                  color: "var(--text)",
                  border: "1px solid var(--btn2-border)",
                }}
                aria-label="Ver funciones de PyCore SGC"
              >
                Ver funciones
              </a>
            </motion.div>

            {/* Lo que el sistema soporta, con nombre y apellido */}
            <motion.ul
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-1.5 mt-7 list-none"
            >
              {CAPABILITIES.map((c) => (
                <li
                  key={c.text}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1.5 rounded-full"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-2)",
                  }}
                >
                  <span style={{ color: "var(--accent-ink)" }}>
                    <Icon name={c.icon} size={13} />
                  </span>
                  {c.text}
                </li>
              ))}
            </motion.ul>

            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-[13px] mt-4"
              style={{ color: "var(--text-muted)" }}
            >
              Hecho en México · 10 módulos integrados · funciona sin internet
            </motion.p>
          </div>

          {/* ── Derecha: todo lo que se mueve ──
              El contenedor es relativo y sin recorte para que los satélites
              asomen por fuera del marco. Se detiene al pasar el cursor, para
              que nadie pierda la escena que está leyendo. */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative w-full max-w-[460px] mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <HeroStepStage
              step={step}
              phase={phase}
              reduced={reduced}
              onPick={pick}
              stepMs={STEP_MS}
              paused={paused}
              cycle={cycle}
            />

            <TicketSatellite visible={ticketOut} reduced={reduced} delay={TICKET_IN} />
            <InsightSatellite visible={insightOut} reduced={reduced} delay={INSIGHT_IN} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
