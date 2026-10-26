"use client";
import { Icon } from "@/components/ui/Icon";
import { PLANS, type PlanTier } from "@/lib/constants";

/*
  Paso uno: elegir plan.

  Aquí no se cobra nada ni se pide una tarjeta — eso se dice, porque una
  pantalla que se parece a un checkout y no lo es asusta justo a quien estaba
  entrando. Lo que se enseña es la decisión real: se paga **por sucursal
  activa**, no por usuario ni por volumen, y cambiar de plan es una decisión
  reversible.

  Es un grupo de radios, no una lista de `div`s con `onClick`: `aria-checked`
  dice cuál está elegido y el borde de color no lo dice de ninguna forma.
*/

export function ElegirPlan({
  elegido,
  onElegir,
}: {
  elegido: PlanTier | null;
  onElegir: (p: PlanTier) => void;
}) {
  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Elige tu plan"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"
      >
        {PLANS.map((plan) => {
          const activo = elegido === plan.name;
          return (
            <button
              key={plan.name}
              role="radio"
              aria-checked={activo}
              onClick={() => onElegir(plan.name)}
              className="text-left rounded-card p-4 flex flex-col h-full transition-colors"
              style={{
                background: activo ? "var(--tint)" : "var(--card)",
                border: `1px solid ${activo ? "var(--accent)" : plan.highlight ? "var(--accent-ink)" : "var(--border)"}`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: activo ? "var(--accent-ink)" : "var(--text)" }}
                >
                  {plan.name}
                </h3>
                {plan.highlight && !activo && (
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{ background: "var(--warm-tint)", color: "var(--warm-ink)" }}
                  >
                    Más elegido
                  </span>
                )}
                {activo && (
                  <span style={{ color: "var(--accent-ink)" }}>
                    <Icon name="check" size={17} strokeWidth={2.6} />
                  </span>
                )}
              </div>

              <p className="font-heading font-bold text-2xl mt-2" style={{ color: "var(--text)" }}>
                {plan.price}
              </p>
              <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                {plan.priceNote || plan.subtitle}
              </p>

              <ul className="flex flex-col gap-1.5 mt-3 list-none p-0 flex-1">
                {plan.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--text-3)" }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-ink)" }}>
                      <Icon name="check" size={12} strokeWidth={2.6} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <span
                className="text-xs font-semibold mt-3"
                style={{ color: activo ? "var(--accent-ink)" : "var(--text-muted)" }}
              >
                {activo ? "Elegido · continúa al paso 2" : "Elegir este"}
              </span>
            </button>
          );
        })}
      </div>

      <p
        className="text-xs rounded-card px-4 py-3 mt-4"
        style={{ background: "var(--warm-tint)", border: "1px solid var(--warm-tint-border)", color: "var(--text-3)" }}
      >
        <strong style={{ color: "var(--warm-ink)" }}>Aquí no se cobra nada ni se pide tarjeta.</strong>{" "}
        Es el paso del recorrido, para que veas qué desbloquea cada plan. Lo que importa de la
        decisión real: se paga <strong>por sucursal activa</strong> —no por usuario ni por volumen
        de ventas—, no hay contrato de permanencia y cambiar de plan no cuesta una migración.
      </p>
    </div>
  );
}
