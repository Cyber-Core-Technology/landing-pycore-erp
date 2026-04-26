"use client";
import Image from "next/image";

export function DeviceMockup() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "580px",
        /* espacio para que el phone no se recorte */
        paddingLeft: "8%",
        paddingBottom: "18%",
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
            "0 32px 80px rgba(0,0,0,0.6), " +
            "0 0 60px rgba(14,124,102,0.22)",
          animation: "dashFloat 5s ease-in-out infinite",
          transform: "perspective(1200px) rotateY(-4deg) rotateX(2deg)",
          transformOrigin: "center center",
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
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57", display: "block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FEBC2E", display: "block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28C840", display: "block" }} />
          </div>
          {/* URL bar */}
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
          bottom: 0,
          left: 0,
          width: "36%",
          borderRadius: "28px",
          overflow: "hidden",
          border: "1.5px solid rgba(122,224,195,0.25)",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.6), " +
            "0 20px 56px rgba(0,0,0,0.7), " +
            "0 0 40px rgba(14,124,102,0.35)",
          animation: "dashFloat 5s ease-in-out infinite",
          animationDelay: "0.7s",
          zIndex: 10,
          background: "#081410",
          transform: "perspective(800px) rotateY(4deg)",
        }}
      >
        {/* Pill notch */}
        <div
          style={{
            background: "#081410",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "5px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Screenshot mobile */}
        <div style={{ lineHeight: 0 }}>
          <Image
            src="/dashboard-mobile.png"
            alt="PyCore ERP — Dashboard en móvil"
            width={1080}
            height={2307}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      {/* Glow ambiental detrás de los dispositivos */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "20% 0 0 0",
          background: "radial-gradient(ellipse at 60% 40%, rgba(27,174,145,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </div>
  );
}
