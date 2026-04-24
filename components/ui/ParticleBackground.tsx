"use client";
import { useMemo, useEffect, useState } from "react";

// Generamos las partículas una sola vez fuera del componente
// para evitar diferencias entre SSR y cliente
const SEED = [
  [14, 72, 6, 0.0, 8.2, 0], [67, 23, 4, 1.2, 6.5, 1], [31, 88, 5, 0.4, 7.1, 0],
  [82, 45, 3, 2.1, 5.8, 1], [55, 10, 7, 0.8, 9.0, 0], [9,  63, 4, 1.5, 6.3, 1],
  [74, 37, 6, 0.2, 8.7, 0], [43, 91, 3, 2.8, 5.5, 1], [28, 54, 5, 0.6, 7.4, 0],
  [91, 18, 4, 1.9, 6.1, 1], [16, 79, 6, 0.3, 8.4, 0], [60, 42, 3, 2.4, 5.9, 1],
  [38, 6,  5, 0.9, 7.7, 0], [77, 68, 7, 1.1, 9.2, 1], [5,  33, 4, 2.6, 6.0, 0],
  [50, 85, 3, 0.5, 5.7, 1], [23, 49, 6, 1.7, 8.1, 0], [86, 27, 4, 2.2, 6.6, 1],
  [44, 73, 5, 0.7, 7.3, 0], [12, 56, 3, 1.4, 5.6, 1], [69, 94, 6, 2.9, 8.8, 0],
  [35, 15, 4, 0.1, 6.9, 1], [93, 61, 5, 1.8, 7.5, 0], [58, 38, 3, 2.3, 5.4, 1],
] as const;

export function ParticleBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Móvil: 10 partículas. Desktop: 20
  const particles = useMemo(
    () => (isMobile ? SEED.slice(0, 10) : SEED.slice(0, 20)),
    [isMobile]
  );

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      {particles.map(([top, left, size, delay, duration, colorIdx], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top:    `${top}%`,
            left:   `${left}%`,
            width:  `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background: colorIdx === 0 ? "#1BAE91" : "#7AE0C3",
            opacity: 0.3,
            animation: `float ${duration}s ease-in-out ${delay}s infinite`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
