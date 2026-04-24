"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Role = "user" | "tezca";

interface ChatMsg {
  role: Role;
  text: string;
  time: string;
}

const CONVERSATION: ChatMsg[] = [
  { role: "user",  time: "10:02", text: "¿Cuáles son mis productos más vendidos este mes?" },
  { role: "tezca", time: "10:02", text: "Tus top 3 de abril 📦\n• Leche Lala 1L — 234 u. (+12%)\n• Pan Bimbo Integral — 189 u.\n• Coca-Cola 600ml — 165 u.\n\nEl más rentable: Leche con 34% de margen." },
  { role: "user",  time: "10:03", text: "¿Cuánto dinero en stock tengo detenido?" },
  { role: "tezca", time: "10:03", text: "💰 $28,400 en productos sin movimiento los últimos 30 días. El caso más crítico: 45 unidades de Shampoo Pantene 400ml sin venta en 45 días." },
  { role: "user",  time: "10:04", text: "¿Debería hacer una promoción esta semana?" },
  { role: "tezca", time: "10:04", text: "📊 Sí. Tus días más flojos son jueves y viernes. Un 2x1 en Refrescos podría subir tus ventas un 18% esos días, basado en tu historial de los últimos 3 meses." },
];

// Delay entre mensajes (ms)
const MSG_DELAY = 1600;
// Tiempo que se muestra la conversación completa antes de reiniciar
const RESET_DELAY = 3500;

export function ChatConversation() {
  const [visible,  setVisible]  = useState<ChatMsg[]>([]);
  const [typing,   setTyping]   = useState(false);
  const [msgIdx,   setMsgIdx]   = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll al fondo cuando aparece un mensaje nuevo
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visible, typing]);

  // Máquina de estados: idle → mostrar mensajes → reset
  useEffect(() => {
    if (msgIdx >= CONVERSATION.length) {
      // Conversación completa: esperar y reiniciar
      const t = setTimeout(() => {
        setVisible([]);
        setMsgIdx(0);
      }, RESET_DELAY);
      return () => clearTimeout(t);
    }

    const next = CONVERSATION[msgIdx]!;

    if (next.role === "tezca") {
      // Mostrar indicador de escritura antes de la respuesta
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setVisible(v => [...v, next]);
        setMsgIdx(i => i + 1);
      }, MSG_DELAY);
      return () => clearTimeout(t);
    }

    // Mensaje del usuario: aparece más rápido
    const t = setTimeout(() => {
      setVisible(v => [...v, next]);
      setMsgIdx(i => i + 1);
    }, msgIdx === 0 ? 600 : MSG_DELAY * 0.5);
    return () => clearTimeout(t);
  }, [msgIdx]);

  return (
    <div
      style={{
        background: "#0F1E1A",
        borderRadius: "18px",
        border: "1px solid rgba(30,74,64,0.8)",
        boxShadow: "0 0 40px rgba(14,124,102,0.25)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "380px",
        maxWidth: "480px",
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1A3A33",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid rgba(30,74,64,0.8)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0E7C66, #1BAE91)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            flexShrink: 0,
          }}
        >
          🤖
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-poppins,sans-serif)", fontWeight: 700, fontSize: "13px", color: "#E6F2EE" }}>
            TEZCA
          </p>
          <p style={{ fontSize: "10px", color: "#1BAE91" }}>
            {typing ? "Escribiendo…" : "● En línea · responde con tus datos reales"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 14px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          // Hide scrollbar visually
          scrollbarWidth: "none",
        }}
      >
        <AnimatePresence initial={false}>
          {visible.map((msg, i) => (
            <motion.div
              key={`${msg.role}-${i}`}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: "8px",
              }}
            >
              {/* Avatar TEZCA — izquierda */}
              {msg.role === "tezca" && (
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0E7C66, #1BAE91)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    flexShrink: 0,
                  }}
                >
                  🤖
                </div>
              )}

              {/* Bubble */}
              <div style={{ maxWidth: "75%", display: "flex", flexDirection: "column", gap: "3px", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    background:   msg.role === "tezca" ? "rgba(14,124,102,0.25)" : "rgba(52,152,219,0.2)",
                    border:       msg.role === "tezca" ? "1px solid rgba(27,174,145,0.4)" : "1px solid rgba(52,152,219,0.3)",
                    borderRadius: msg.role === "tezca" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                    padding:      "8px 12px",
                    fontSize:     "12px",
                    lineHeight:   1.55,
                    color:        "#E6F2EE",
                    whiteSpace:   "pre-line",
                  }}
                >
                  {msg.text}
                </div>
                <span style={{ fontSize: "9px", color: "#94B8B0", paddingInline: "2px" }}>{msg.time}</span>
              </div>

              {/* Avatar usuario — derecha, después del bubble */}
              {msg.role === "user" && (
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "rgba(52,152,219,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    flexShrink: 0,
                  }}
                >
                  👤
                </div>
              )}
            </motion.div>
          ))}

          {/* Indicador de escritura */}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
            >
              <div
                style={{
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #0E7C66, #1BAE91)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", flexShrink: 0,
                }}
              >
                🤖
              </div>
              <div
                style={{
                  background: "rgba(14,124,102,0.25)",
                  border: "1px solid rgba(27,174,145,0.4)",
                  borderRadius: "4px 14px 14px 14px",
                  padding: "10px 14px",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#1BAE91",
                      display: "inline-block",
                      animation: `float ${0.8}s ease-in-out ${d * 0.18}s infinite`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
