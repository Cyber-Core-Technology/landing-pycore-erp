"use client";
import { motion } from "framer-motion";
import type { DocumentoEjemplo, Tabla } from "@/lib/documentos";
import { TICKET } from "@/lib/documentos";

/*
  La hoja, en pantalla.

  No es una imagen del PDF: es la misma maqueta dibujada en HTML, con los
  valores de `exportUtils.ts` escritos aquí tal cual —banda #16140F sangrada,
  filete de marca #0E7C66, las cifras separadas por un filete y no metidas en
  tarjetas, cabecera de tabla en la banda y renglones alternados—. Se hace así
  y no con un PNG por tres razones que se pagan solas: pesa unos kilobytes en
  vez de medio mega, se puede leer y buscar, y un lector de pantalla la
  recorre como la tabla que es.

  El papel es blanco en los dos temas **a propósito**: lo que se está
  enseñando es una hoja impresa, y teñirla con el tema oscuro mentiría sobre
  lo que sale de la impresora. Lo que sí cambia con el tema es el marco.
*/

// Los valores de exportUtils.ts. Van literales porque esto representa tinta
// sobre papel, no la interfaz: no son tokens del tema y no deben seguirlo.
const BANDA = "#16140F";
const BANDA_INK = "#FFFFFF";
const BANDA_INK_2 = "#C2B9AA";
const ACENTO = "#0E7C66";
const TINTA = "#1C1A17";
const TINTA_2 = "#45403A";
const FILETE = "#D5D0C6";
const FILETE_FINO = "#E4E0D8";
const CEBRA = "#FAF8F5";

const aparece = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

function TablaHoja({ t, idx }: { t: Tabla; idx: number }) {
  const visibles = t.previa ?? t.rows.length;
  const filas = t.rows.slice(0, visibles);
  const ocultas = t.rows.length - filas.length;

  return (
    <motion.div {...aparece} transition={{ duration: 0.3, delay: 0.1 + idx * 0.06 }}>
      <p
        className="font-bold uppercase"
        style={{ color: TINTA, fontSize: "6.5px", letterSpacing: "0.03em", margin: "9px 0 3px" }}
      >
        {t.rotulo}
      </p>
      <table
        className="w-full"
        style={{ borderCollapse: "collapse", border: `0.5px solid ${FILETE_FINO}`, tableLayout: "fixed" }}
      >
        <thead>
          <tr style={{ background: BANDA }}>
            {t.head.map((h, j) => (
              <th
                key={h + j}
                scope="col"
                style={{
                  color: BANDA_INK,
                  fontSize: "5.6px",
                  fontWeight: 700,
                  textAlign: t.aligns?.[j] === "right" ? "right" : "left",
                  padding: "3px 3px",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 1 ? CEBRA : "transparent" }}>
              {r.map((c, j) => (
                <td
                  key={j}
                  style={{
                    color: TINTA,
                    fontSize: "6px",
                    textAlign: t.aligns?.[j] === "right" ? "right" : "left",
                    padding: "3px 3px",
                    borderTop: `0.5px solid ${FILETE_FINO}`,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {ocultas > 0 && (
        <p style={{ color: TINTA_2, fontSize: "5.6px", margin: "2px 0 0" }}>
          … y {ocultas} {ocultas === 1 ? "renglón más" : "renglones más"} en el PDF
        </p>
      )}
    </motion.div>
  );
}

function HojaBanda({ doc }: { doc: DocumentoEjemplo }) {
  return (
    <>
      {/* La banda sangra a los bordes: es el gesto que identifica la hoja. */}
      <div style={{ background: BANDA, padding: "9px 11px 7px" }}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p style={{ color: BANDA_INK, fontWeight: 700, fontSize: "9px", lineHeight: 1.2 }}>
              PyCore SGC
            </p>
            <p
              style={{ color: BANDA_INK_2, fontSize: "6px", marginTop: "2px" }}
              className="truncate"
            >
              {doc.banda.empresa}
              {doc.banda.contexto ? `  ·  ${doc.banda.contexto}` : ""}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p style={{ color: BANDA_INK, fontWeight: 700, fontSize: "9.5px", lineHeight: 1.2 }}>
              {doc.banda.titulo}
            </p>
            {doc.banda.derecha && (
              <p style={{ color: BANDA_INK_2, fontSize: "6px", marginTop: "2px" }}>
                {doc.banda.derecha.join("  ·  ")}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* El filete de marca: lo único verde de la hoja. */}
      <div style={{ background: ACENTO, height: "2px" }} />

      <div style={{ padding: "9px 11px 14px" }}>
        {doc.contexto && (
          <p style={{ color: TINTA_2, fontSize: "6px", marginBottom: "7px" }}>
            {doc.contexto.join("     ")}
          </p>
        )}

        {/* Las cifras: un filete arriba, otro abajo y uno entre cada par. La
            caja no existe — lo que se mira es el número. */}
        {doc.cifras && (
          <motion.div
            {...aparece}
            transition={{ duration: 0.3, delay: 0.06 }}
            className="flex"
            style={{ borderTop: `1px solid ${FILETE}`, borderBottom: `1px solid ${FILETE}` }}
          >
            {doc.cifras.map((k, i) => (
              <div
                key={k.label}
                className="flex-1 min-w-0"
                style={{
                  padding: "5px 5px 6px",
                  borderLeft: i > 0 ? `0.5px solid ${FILETE}` : undefined,
                }}
              >
                <p
                  className="truncate font-bold uppercase"
                  style={{ color: TINTA_2, fontSize: "5.2px", letterSpacing: "0.04em" }}
                >
                  {k.label}
                </p>
                <p
                  className="truncate font-bold"
                  style={{ color: TINTA, fontSize: "10px", marginTop: "2px" }}
                >
                  {k.value}
                </p>
                {k.sub && (
                  <p className="truncate" style={{ color: TINTA_2, fontSize: "5.2px", marginTop: "1px" }}>
                    {k.sub}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {doc.tablas?.map((t, i) => <TablaHoja key={t.rotulo} t={t} idx={i} />)}
      </div>
    </>
  );
}

function HojaTicket() {
  const t = TICKET;
  return (
    <div style={{ padding: "14px 16px 16px", maxWidth: "260px", margin: "0 auto" }}>
      <p style={{ color: TINTA, fontWeight: 700, fontSize: "11px", textAlign: "center" }}>
        {t.empresa}
      </p>
      {[t.sucursal, t.direccion, t.fiscal].map((l) => (
        <p key={l} style={{ color: TINTA_2, fontSize: "6.5px", textAlign: "center", marginTop: "2px" }}>
          {l}
        </p>
      ))}

      <div style={{ borderTop: `1px solid ${FILETE}`, margin: "9px 0" }} />
      <p style={{ color: TINTA, fontWeight: 700, fontSize: "10px", textAlign: "center" }}>{t.folio}</p>
      <p style={{ color: TINTA_2, fontSize: "6.5px", textAlign: "center", marginTop: "2px" }}>{t.fecha}</p>
      <p style={{ color: TINTA_2, fontSize: "6.5px", textAlign: "center" }}>{t.cajero}</p>
      <div style={{ borderTop: `1px solid ${FILETE}`, margin: "9px 0" }} />

      {t.lineas.map((l, i) => (
        <motion.div
          key={l.nombre}
          {...aparece}
          transition={{ duration: 0.25, delay: 0.04 * i }}
          style={{ marginBottom: "5px" }}
        >
          <p style={{ color: TINTA, fontWeight: 700, fontSize: "7.5px" }}>{l.nombre}</p>
          <div className="flex items-baseline justify-between gap-2">
            <span style={{ color: TINTA_2, fontSize: "7px" }}>
              {l.cantidad} × {l.precio}
            </span>
            <span style={{ color: TINTA, fontSize: "7.5px" }}>{l.importe}</span>
          </div>
        </motion.div>
      ))}

      <div style={{ borderTop: `1px solid ${FILETE}`, margin: "8px 0" }} />
      {t.totales.map((x) => (
        <div key={x.label} className="flex items-baseline justify-between" style={{ marginBottom: "3px" }}>
          <span
            style={{
              color: x.fuerte ? TINTA : TINTA_2,
              fontSize: x.fuerte ? "10px" : "7.5px",
              fontWeight: x.fuerte ? 700 : 400,
            }}
          >
            {x.label}
          </span>
          <span
            style={{
              color: TINTA,
              fontSize: x.fuerte ? "10px" : "7.5px",
              fontWeight: x.fuerte ? 700 : 400,
            }}
          >
            {x.value}
          </span>
        </div>
      ))}

      <div style={{ borderTop: `1px solid ${FILETE}`, margin: "8px 0" }} />
      {t.pago.map((x) => (
        <div key={x.label} className="flex items-baseline justify-between" style={{ marginBottom: "3px" }}>
          <span style={{ color: TINTA_2, fontSize: "7.5px" }}>{x.label}</span>
          <span style={{ color: TINTA, fontSize: "7.5px" }}>{x.value}</span>
        </div>
      ))}

      <p style={{ color: TINTA, fontWeight: 700, fontSize: "7.5px", textAlign: "center", marginTop: "9px" }}>
        ¡Gracias por su compra!
      </p>
      <p style={{ color: TINTA_2, fontSize: "6px", textAlign: "center", marginTop: "2px" }}>
        Generado con PyCore SGC
      </p>
    </div>
  );
}

export function HojaPreview({ doc }: { doc: DocumentoEjemplo }) {
  const esTicket = doc.familia === "ticket";

  return (
    <div
      className="rounded-card overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1px solid var(--border)",
        boxShadow: "var(--tw-shadow, 0 12px 32px rgba(28, 26, 23, 0.09))",
        // La proporción de una A4; el ticket es un rollo y se deja crecer.
        aspectRatio: esTicket ? undefined : "210 / 297",
      }}
    >
      {esTicket ? <HojaTicket /> : <HojaBanda doc={doc} />}
    </div>
  );
}
