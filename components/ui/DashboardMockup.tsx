"use client";

export function DashboardMockup() {
  const metrics = [
    { label: "Ventas del día",  value: "$48,320", change: "+12%", changeType: "up",      progress: 78 },
    { label: "Utilidad bruta",  value: "$14,210", change: "+8%",  changeType: "up",      progress: 60 },
    { label: "Ticket promedio", value: "$960",    change: "+3%",  changeType: "neutral", progress: 45 },
  ];

  return (
    <div
      role="img"
      aria-label="Vista previa del dashboard de PyCore ERP"
      style={{
        background: "#1A3A33",
        borderRadius: "20px",
        boxShadow: "0 0 40px rgba(14,124,102,0.4)",
        padding: "24px",
        color: "#E6F2EE",
        animation: "dashFloat 4s ease-in-out infinite",
        maxWidth: "480px",
        width: "100%",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px" }}>⚙️</span>
          <span style={{ fontFamily: "var(--font-poppins, sans-serif)", fontWeight: 700, fontSize: "14px", color: "#E6F2EE" }}>
            PyCore ERP
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2ECC71", display: "inline-block" }} />
          <span style={{ fontSize: "12px", color: "#94B8B0" }}>En línea</span>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ background: "rgba(14,124,102,0.15)", borderRadius: "12px", padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "#94B8B0", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {m.label}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "20px",
                  background: m.changeType === "neutral" ? "rgba(241,196,15,0.2)" : "rgba(46,204,113,0.2)",
                  color: m.changeType === "neutral" ? "#F1C40F" : "#2ECC71",
                }}
              >
                {m.change}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "22px",
                fontWeight: 700,
                color: "#E6F2EE",
                marginBottom: "10px",
              }}
            >
              {m.value}
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "4px", height: "4px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${m.progress}%`,
                  height: "100%",
                  background: "linear-gradient(to right, #0E7C66, #1BAE91)",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
