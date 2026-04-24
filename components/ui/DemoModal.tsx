"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoModal } from "@/lib/demo-context";
import type { DemoFormData } from "@/app/api/demo/route";

const PLANES = ["No lo sé aún", "Básico — $499/mes", "Profesional — $799/mes", "Empresarial — $1,099/mes", "Elite"];
const USUARIOS = ["1–3 usuarios", "4–10 usuarios", "11–30 usuarios", "Más de 30 usuarios"];

const EMPTY: DemoFormData = {
  nombre: "", empresa: "", email: "", telefono: "",
  plan: PLANES[0]!, usuarios: USUARIOS[0]!, mensaje: "",
};

type Status = "idle" | "loading" | "success" | "error";

export function DemoModal() {
  const { isOpen, defaultPlan, closeModal } = useDemoModal();
  const [form,   setForm]   = useState<DemoFormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const firstRef = useRef<HTMLInputElement>(null);

  // Focus primer campo al abrir
  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY, plan: defaultPlan ? `${defaultPlan.split("—")[0]!.trim()} — ` + (PLANES.find(p => p.startsWith(defaultPlan.split("—")[0]!.trim()))?.split("— ")[1] ?? "") : EMPTY.plan });
      setStatus("idle");
      setTimeout(() => firstRef.current?.focus(), 80);
    }
  }, [isOpen, defaultPlan]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closeModal]);

  // Bloquear scroll de fondo
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const set = (k: keyof DemoFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls = `
    w-full rounded-[10px] border border-[var(--border)] bg-[var(--bg)]
    text-[var(--text)] text-sm px-3.5 py-2.5
    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]
    transition placeholder:text-[var(--text-muted)]
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[20px] bg-[var(--card)] border border-[var(--border)] shadow-2xl"
              style={{ boxShadow: "0 0 60px rgba(14,124,102,0.25), 0 20px 60px rgba(0,0,0,0.4)" }}
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center p-10 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-heading font-bold text-xl text-[var(--text)] mb-2">
                    ¡Solicitud recibida!
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm mb-6">
                    Nos comunicaremos contigo en menos de 24 horas para coordinar tu demo personalizada.
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-[var(--color-primary)] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[var(--color-secondary)] transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between p-8 pb-5">
                    <div>
                      <h2 id="modal-title" className="font-heading font-bold text-xl text-[var(--text)]">
                        Solicitar Demo Gratis
                      </h2>
                      <p className="text-[var(--text-muted)] text-sm mt-0.5">
                        Te contactamos en menos de 24 horas · Sin compromiso
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      aria-label="Cerrar modal"
                      className="text-[var(--text-muted)] hover:text-[var(--text)] text-xl leading-none ml-4 flex-shrink-0 mt-0.5"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="h-px bg-[var(--border)] mx-8" />

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-8 pt-6 flex flex-col gap-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
                          Nombre completo *
                        </label>
                        <input
                          ref={firstRef}
                          type="text"
                          required
                          placeholder="Juan García"
                          value={form.nombre}
                          onChange={set("nombre")}
                          className={inputCls}
                          aria-label="Nombre completo"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
                          Empresa *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Abarrotes García"
                          value={form.empresa}
                          onChange={set("empresa")}
                          className={inputCls}
                          aria-label="Nombre de la empresa"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="juan@empresa.com"
                          value={form.email}
                          onChange={set("email")}
                          className={inputCls}
                          aria-label="Correo electrónico"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+52 55 1234 5678"
                          value={form.telefono}
                          onChange={set("telefono")}
                          className={inputCls}
                          aria-label="Número de teléfono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
                          Plan de interés
                        </label>
                        <select
                          value={form.plan}
                          onChange={set("plan")}
                          className={inputCls}
                          aria-label="Plan de interés"
                        >
                          {PLANES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
                          ¿Cuántos usuarios?
                        </label>
                        <select
                          value={form.usuarios}
                          onChange={set("usuarios")}
                          className={inputCls}
                          aria-label="Número de usuarios"
                        >
                          {USUARIOS.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
                        Mensaje (opcional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Cuéntanos sobre tu negocio o dudas específicas..."
                        value={form.mensaje}
                        onChange={set("mensaje")}
                        className={inputCls + " resize-none"}
                        aria-label="Mensaje opcional"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-[var(--color-error)] text-center">
                        Ocurrió un error. Intenta de nuevo o escríbenos a{" "}
                        <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@pycore.app"}`} className="underline">
                          {process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@pycore.app"}
                        </a>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-1"
                      aria-label="Enviar solicitud de demo"
                    >
                      {status === "loading" ? "Enviando…" : "Solicitar Demo Gratis →"}
                    </button>

                    <p className="text-center text-[var(--text-muted)] text-xs">
                      Sin contratos. Sin tarjeta de crédito. Solo una demo personalizada. 🇲🇽
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
