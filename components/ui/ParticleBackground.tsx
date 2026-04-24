"use client";
import { useMemo } from "react";

export function ParticleBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        top:    `${Math.random() * 100}%`,
        left:   `${Math.random() * 100}%`,
        size:   Math.random() * 4 + 3,
        delay:  `${Math.random() * 6}s`,
        duration: `${Math.random() * 4 + 5}s`,
        color:  i % 2 === 0 ? "#1BAE91" : "#7AE0C3",
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width:  `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.3,
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
