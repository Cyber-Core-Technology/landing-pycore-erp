"use client";
import Image from "next/image";

export function DeviceMockup() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "580px",
        /* deja espacio a la izquierda y abajo para el phone */
        paddingLeft: "14%",
        paddingBottom: "16%",
      }}
    >
      {/* ── Desktop / Browser frame ── */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(122,224,195,0.15)",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.5), " +
            "0 28px 72px rgba(0,0,0,0.55), " +
            "0 0 56px rgba(14,124,102,0.2)",
          animation: "dashFloat 5s ease-in-out infinite",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            background: "#081410",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5F57", display: "block" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FEBC2E", display: "block" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28C840", display: "block" }} />
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              borderRadius: "5px",
              padding: "3px 10px",
              fontSize: "10px",
              color: "#7AE0C3",
              fontFamily: "monospace",
              letterSpacing: "0.03em",
            }}
          >
            plataforma.pycore.app/dashboard
          </div>
        </div>

        {/* Screenshot desktop */}
        <div style={{ lineHeight: 0, background: "#0F1E1A" }}>
          <Image
            src="/dashboard-desktop.png"
            alt="PyCore ERP — Dashboard en escritorio"
            width={1280}
            height={748}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
      </div>

      {/* ── Phone frame ── */}
      <div
        style={{
          position: "absolute",
          /* cuelga por debajo del desktop para dar profundidad */
          bottom: "-14%",
          left: 0,
          width: "30%",
          /* recorta la altura para mostrar solo la parte superior del mobile */
          maxHeight: "88%",
          borderRadius: "22px",
          overflow: "hidden",
          border: "1.5px solid rgba(122,224,195,0.22)",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.6), " +
            "0 20px 52px rgba(0,0,0,0.65), " +
            "0 0 36px rgba(14,124,102,0.32)",
          animation: "dashFloat 5s ease-in-out infinite",
          animationDelay: "0.8s",
          zIndex: 10,
          background: "#081410",
        }}
      >
        {/* Pill notch */}
        <div
          style={{
            background: "#081410",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "4px",
              background: "rgba(255,255,255,0.18)",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Screenshot mobile — object-fit recorta el exceso vertical */}
        <div style={{ lineHeight: 0, overflow: "hidden" }}>
          <Image
            src="/dashboard-mobile.png"
            alt="PyCore ERP — Dashboard en móvil"
            width={1080}
            height={2307}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
      </div>

      {/* Glow ambiental */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "10% -10% 0 10%",
          background:
            "radial-gradient(ellipse at 55% 45%, rgba(27,174,145,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </div>
  );
}
