"use client";
import { mxn, type Ticket } from "@/lib/demoMostrador";

/*
  El ticket que sale al cobrar.

  Es la misma hoja de 80 mm que imprime el sistema y que se puede bajar en
  `/documentos`, con los renglones de lo que se acaba de capturar. El papel va
  blanco en los dos temas a propósito: lo que se enseña es papel térmico, y
  teñirlo con el tema oscuro mentiría sobre lo que sale de la impresora.
*/

const TINTA = "#1C1A17";
const TINTA_2 = "#45403A";
const FILETE = "#D5D0C6";

export function TicketDemo({
  ticket,
  empresa,
  folio,
}: {
  ticket: Ticket;
  empresa: { nombre: string; sucursal: string };
  folio: number;
}) {
  return (
    <div
      className="rounded-card overflow-hidden"
      style={{ background: "#FFFFFF", border: "1px solid var(--border)" }}
    >
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: "var(--tint)" }}>
        <span style={{ color: "var(--accent-ink)" }} aria-hidden="true">✓</span>
        <p className="text-[13px] font-semibold" style={{ color: "var(--accent-ink)" }}>
          Venta cobrada · el inventario ya bajó
        </p>
      </div>

      <div style={{ padding: "16px 18px 18px", maxWidth: 280, margin: "0 auto" }}>
        <p style={{ color: TINTA, fontWeight: 700, fontSize: 12, textAlign: "center" }}>
          {empresa.nombre}
        </p>
        <p style={{ color: TINTA_2, fontSize: 7.5, textAlign: "center", marginTop: 2 }}>
          {empresa.sucursal}
        </p>

        <div style={{ borderTop: `1px solid ${FILETE}`, margin: "10px 0" }} />
        <p style={{ color: TINTA, fontWeight: 700, fontSize: 11, textAlign: "center" }}>
          VEN-{String(folio).padStart(5, "0")}
        </p>
        <p style={{ color: TINTA_2, fontSize: 7.5, textAlign: "center", marginTop: 2 }}>
          Demostración · este ticket no se guardó
        </p>
        <div style={{ borderTop: `1px solid ${FILETE}`, margin: "10px 0" }} />

        {ticket.lineas.map((l, i) => (
          <div key={i} style={{ marginBottom: 6, paddingLeft: l.esExtra ? 8 : 0 }}>
            <p style={{ color: TINTA, fontWeight: l.esExtra ? 400 : 700, fontSize: 8 }}>
              {l.nombre}
              {l.detalle ? ` · ${l.detalle}` : ""}
            </p>
            <div className="flex items-baseline justify-between gap-2">
              <span style={{ color: TINTA_2, fontSize: 7.5 }}>
                {l.cantidad} × {mxn(l.precioUnitario)}
              </span>
              <span style={{ color: TINTA, fontSize: 8 }}>{mxn(l.importe)}</span>
            </div>
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${FILETE}`, margin: "9px 0" }} />
        {[
          ["Subtotal", ticket.subtotal, false],
          ["Impuestos", ticket.impuesto, false],
          ["TOTAL", ticket.total, true],
        ].map(([et, v, fuerte]) => (
          <div key={et as string} className="flex items-baseline justify-between" style={{ marginBottom: 3 }}>
            <span
              style={{
                color: fuerte ? TINTA : TINTA_2,
                fontSize: fuerte ? 10 : 8,
                fontWeight: fuerte ? 700 : 400,
              }}
            >
              {et as string}
            </span>
            <span style={{ color: TINTA, fontSize: fuerte ? 10 : 8, fontWeight: fuerte ? 700 : 400 }}>
              {mxn(v as number)}
            </span>
          </div>
        ))}

        <p style={{ color: TINTA, fontWeight: 700, fontSize: 8, textAlign: "center", marginTop: 10 }}>
          ¡Gracias por su compra!
        </p>
        <p style={{ color: TINTA_2, fontSize: 6.5, textAlign: "center", marginTop: 2 }}>
          Generado con PyCore SGC
        </p>
      </div>
    </div>
  );
}
