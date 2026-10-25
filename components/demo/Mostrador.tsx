"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { TezcaDemo } from "@/components/demo/TezcaDemo";
import { TicketDemo } from "@/components/demo/TicketDemo";
import {
  buscar,
  cantidadBase,
  construirTicket,
  gramosDesdeImporte,
  importeLinea,
  mxn,
  porCodigoDeBarras,
  precioUnitario,
  problemasParaCobrar,
  type CatalogoDemo,
  type Linea,
  type LineaExtra,
  type ProductoDemo,
} from "@/lib/demoMostrador";

/*
  El Mostrador: el punto de venta, jugable, en la propia web.

  Lo que lo separa de una maqueta bonita es que **las reglas son las del
  sistema**: el granel se captura en gramos, la presentación tiene precio
  absoluto, el extra va en su renglón y una línea en cero no se cobra. Lo que
  no hace —y lo dice— es guardar: al recargar, el mostrador vuelve a abrir.

  La aritmética vive en `lib/demoMostrador.ts`, probada aparte. Aquí sólo se
  pinta y se recoge lo que la persona hace.
*/

type Props = { catalogo: CatalogoDemo };

let contador = 0;
const nuevoUid = () => `l${++contador}`;

export function Mostrador({ catalogo }: Props) {
  const [q, setQ] = useState("");
  const [lineas, setLineas] = useState<Linea[]>([]);
  const [extras, setExtras] = useState<LineaExtra[]>([]);
  const [stock, setStock] = useState<Map<string, number>>(
    () => new Map(catalogo.productos.map((p) => [p.id, p.stock])),
  );
  const [cobrado, setCobrado] = useState<ReturnType<typeof construirTicket> | null>(null);
  const [ventas, setVentas] = useState({ n: 0, importe: 0 });
  const [aviso, setAviso] = useState<string | null>(null);
  const busqueda = useRef<HTMLInputElement>(null);

  const resultados = useMemo(() => buscar(catalogo.productos, q).slice(0, 24), [catalogo.productos, q]);
  const ticket = useMemo(() => construirTicket(lineas, extras), [lineas, extras]);
  const problemas = useMemo(() => problemasParaCobrar(lineas, stock), [lineas, stock]);

  // El aviso se va solo: un error que se queda fijo deja de leerse.
  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 6000);
    return () => clearTimeout(t);
  }, [aviso]);

  const agregar = useCallback((p: ProductoDemo) => {
    setCobrado(null);
    setLineas((prev) => {
      // Sin presentaciones y no granel: si ya está, sube uno. Es lo que hace
      // un mostrador cuando pasas dos veces el mismo código.
      if (!p.granel && !p.presentaciones) {
        const i = prev.findIndex((l) => l.producto.id === p.id && l.presentacion === null);
        if (i >= 0) {
          const copia = [...prev];
          copia[i] = { ...copia[i]!, cantidad: copia[i]!.cantidad + 1 };
          return copia;
        }
      }
      return [
        ...prev,
        {
          uid: nuevoUid(),
          producto: p,
          presentacion: p.presentaciones ? 0 : null,
          // Una línea por peso nace sin cantidad: «falta pesar» es un estado
          // legítimo, y un 0.1 de oficio hay que borrarlo antes de escribir.
          cantidad: p.granel ? 0 : 1,
        },
      ];
    });
  }, []);

  const cambiar = (uid: string, campos: Partial<Linea>) =>
    setLineas((prev) => prev.map((l) => (l.uid === uid ? { ...l, ...campos } : l)));

  const quitar = (uid: string) => {
    setLineas((prev) => prev.filter((l) => l.uid !== uid));
    setExtras((prev) => prev.filter((e) => e.padre !== uid));
  };

  const alternarExtra = (uid: string) => {
    const extra = catalogo.extras[0];
    if (!extra) return;
    setExtras((prev) =>
      prev.some((e) => e.padre === uid)
        ? prev.filter((e) => e.padre !== uid)
        : [...prev, { uid: nuevoUid(), extra, veces: 1, padre: uid }],
    );
  };

  function escanear(e: React.FormEvent) {
    e.preventDefault();
    const p = porCodigoDeBarras(catalogo.productos, q);
    if (p) {
      agregar(p);
      setQ("");
      return;
    }
    if (resultados.length === 1) {
      agregar(resultados[0]!);
      setQ("");
    }
  }

  function cobrar() {
    if (problemas.length) {
      setAviso(problemas[0]!.mensaje);
      return;
    }
    if (!lineas.length) {
      setAviso("No hay nada que cobrar todavía.");
      return;
    }
    // El almacén se descuenta con lo que de verdad salió: unidad base.
    setStock((prev) => {
      const m = new Map(prev);
      for (const l of lineas) {
        m.set(l.producto.id, Math.round(((m.get(l.producto.id) ?? 0) - cantidadBase(l)) * 100) / 100);
      }
      return m;
    });
    setCobrado(ticket);
    setVentas((v) => ({ n: v.n + 1, importe: Math.round((v.importe + ticket.total) * 100) / 100 }));
    setLineas([]);
    setExtras([]);
    setQ("");
    busqueda.current?.focus();
  }

  function reiniciar() {
    setStock(new Map(catalogo.productos.map((p) => [p.id, p.stock])));
    setLineas([]);
    setExtras([]);
    setCobrado(null);
    setVentas({ n: 0, importe: 0 });
    setQ("");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] items-start">
      {/* ── Catálogo ──────────────────────────────────────────────── */}
      <div
        className="rounded-card p-4 sm:p-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <form onSubmit={escanear} className="flex gap-2">
          <label className="sr-only" htmlFor="demo-buscar">
            Buscar producto por nombre, SKU o código de barras
          </label>
          <div className="relative flex-1 min-w-0">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--text-muted)" }}
            >
              <Icon name="search" size={17} />
            </span>
            <input
              id="demo-buscar"
              ref={busqueda}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Busca o escanea un código…"
              autoComplete="off"
              className="w-full rounded-btn pl-10 pr-3 py-2.5 text-sm outline-none focus-visible:ring-2"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border-control, var(--btn2-border))",
                color: "var(--text)",
              }}
            />
          </div>
          <button
            type="submit"
            className="rounded-btn px-4 py-2.5 text-sm font-semibold flex-shrink-0"
            style={{ background: "var(--btn2)", color: "var(--text-2)", border: "1px solid var(--btn2-border)" }}
          >
            <span className="sr-only">Agregar el código escaneado</span>
            <Icon name="barcode" size={17} />
          </button>
        </form>

        <p className="text-xs mt-2.5" style={{ color: "var(--text-muted)" }}>
          {catalogo.productos.length} productos reales del negocio de demostración. Prueba{" "}
          <button
            type="button"
            onClick={() => setQ("granel")}
            className="underline underline-offset-2 font-semibold"
            style={{ color: "var(--accent-ink)" }}
          >
            granel
          </button>{" "}
          o{" "}
          <button
            type="button"
            onClick={() => setQ("coca")}
            className="underline underline-offset-2 font-semibold"
            style={{ color: "var(--accent-ink)" }}
          >
            coca
          </button>
          .
        </p>

        <ul
          className="grid grid-cols-2 xl:grid-cols-3 gap-2 mt-4 list-none p-0 overflow-y-auto content-start"
          /*
            Alto fijo, no `maxHeight`: con `maxHeight` el panel se encoge al
            filtrar y deja un hueco en blanco del alto del ticket a su lado —
            y la rejilla salta de tamaño con cada tecla del buscador.
          */
          style={{ height: "clamp(300px, 46vh, 480px)" }}
        >
          {resultados.map((p) => {
            const hay = stock.get(p.id) ?? 0;
            const agotado = hay <= 0;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => agregar(p)}
                  disabled={agotado}
                  className="w-full h-full text-left rounded-card p-3 transition-colors disabled:opacity-45 disabled:cursor-not-allowed"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <p
                    className="text-[13px] font-semibold leading-snug line-clamp-2"
                    style={{ color: "var(--text)" }}
                  >
                    {p.nombre}
                  </p>
                  <p className="text-sm font-bold mt-1.5" style={{ color: "var(--accent-ink)" }}>
                    {mxn(p.precio)}
                    <span className="text-[11px] font-normal" style={{ color: "var(--text-muted)" }}>
                      {p.granel ? " / kg" : ""}
                    </span>
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {agotado ? "Agotado" : `${hay} ${p.unidad}`}
                    {p.granel && " · se pesa"}
                    {p.presentaciones && " · 2 empaques"}
                  </p>
                </button>
              </li>
            );
          })}
          {!resultados.length && (
            <li className="col-span-full text-sm py-6" style={{ color: "var(--text-muted)" }}>
              Nada con «{q}». Prueba con otro nombre o categoría.
            </li>
          )}
        </ul>
      </div>

      {/* ── Ticket ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div
          className="rounded-card p-4 sm:p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <h3 className="font-heading font-semibold text-[15px]" style={{ color: "var(--text)" }}>
              Venta en curso
            </h3>
            {ventas.n > 0 && (
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {ventas.n} {ventas.n === 1 ? "cobrada" : "cobradas"} · {mxn(ventas.importe)}
              </span>
            )}
          </div>

          <AnimatePresence initial={false}>
            {lineas.map((l) => (
              <motion.div
                key={l.uid}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <LineaTicket
                  linea={l}
                  tieneExtra={extras.some((e) => e.padre === l.uid)}
                  extraNombre={catalogo.extras[0]?.nombre ?? ""}
                  onCambiar={(c) => cambiar(l.uid, c)}
                  onQuitar={() => quitar(l.uid)}
                  onExtra={() => alternarExtra(l.uid)}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {!lineas.length && (
            <p className="text-sm py-7 text-center" style={{ color: "var(--text-muted)" }}>
              Elige un producto para empezar la venta.
            </p>
          )}

          {/* Totales */}
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            {[
              ["Subtotal", ticket.subtotal, false],
              ["Impuestos", ticket.impuesto, false],
              ["Total", ticket.total, true],
            ].map(([et, val, fuerte]) => (
              <div key={et as string} className="flex items-baseline justify-between mb-1 last:mb-0">
                <span
                  className={fuerte ? "font-heading font-bold text-base" : "text-sm"}
                  style={{ color: fuerte ? "var(--text)" : "var(--text-muted)" }}
                >
                  {et as string}
                </span>
                <span
                  className={`tabular-nums ${fuerte ? "font-heading font-bold text-xl" : "text-sm"}`}
                  style={{ color: fuerte ? "var(--text)" : "var(--text-2)" }}
                >
                  {mxn(val as number)}
                </span>
              </div>
            ))}
          </div>

          <div aria-live="polite" className="min-h-0">
            {aviso && (
              <p
                className="text-xs rounded-btn px-3 py-2 mt-3"
                style={{
                  background: "color-mix(in srgb, var(--color-error) 12%, transparent)",
                  color: "var(--color-error)",
                  border: "1px solid color-mix(in srgb, var(--color-error) 32%, transparent)",
                }}
              >
                {aviso}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={cobrar}
            disabled={!lineas.length}
            className="w-full rounded-btn py-3 mt-3 font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
          >
            Cobrar {ticket.total > 0 ? mxn(ticket.total) : ""}
          </button>

          <button
            type="button"
            onClick={reiniciar}
            className="w-full text-xs mt-2 py-1 underline underline-offset-2"
            style={{ color: "var(--text-muted)" }}
          >
            Reiniciar el mostrador
          </button>
        </div>

        <AnimatePresence>
          {cobrado && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <TicketDemo ticket={cobrado} empresa={catalogo.empresa} folio={ventas.n} />
            </motion.div>
          )}
        </AnimatePresence>

        <TezcaDemo
          contexto={{
            ticket,
            lineas,
            catalogo: catalogo.productos,
            stock,
            ventasCobradas: ventas.n,
            importeCobrado: ventas.importe,
          }}
        />
      </div>
    </div>
  );
}

/* ── Una línea ─────────────────────────────────────────────────────────── */

function LineaTicket({
  linea: l,
  tieneExtra,
  extraNombre,
  onCambiar,
  onQuitar,
  onExtra,
}: {
  linea: Linea;
  tieneExtra: boolean;
  extraNombre: string;
  onCambiar: (c: Partial<Linea>) => void;
  onQuitar: () => void;
  onExtra: () => void;
}) {
  const p = l.producto;
  // El importe del granel se teclea también: peso e importe son el mismo dato
  // visto de dos maneras, y se equilibran tecla por tecla en los dos sentidos.
  const [importeBorrador, setImporteBorrador] = useState<string | null>(null);
  const importeVisible = importeBorrador ?? (importeLinea(l) || "").toString();

  return (
    <div className="py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-semibold leading-snug" style={{ color: "var(--text)" }}>
          {p.nombre}
        </p>
        <button
          type="button"
          onClick={onQuitar}
          className="flex-shrink-0 p-1 -m-1 rounded"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="sr-only">Quitar {p.nombre} de la venta</span>
          <Icon name="close" size={14} />
        </button>
      </div>

      {/* La presentación: la misma cosa medida distinto, un solo stock. */}
      {p.presentaciones && (
        <div className="flex gap-1.5 mt-2" role="group" aria-label={`Empaque de ${p.nombre}`}>
          {p.presentaciones.map((pres, i) => (
            <button
              key={pres.nombre}
              type="button"
              onClick={() => onCambiar({ presentacion: i })}
              aria-pressed={l.presentacion === i}
              className="text-[11px] px-2 py-1 rounded-full font-semibold"
              style={{
                background: l.presentacion === i ? "var(--accent)" : "var(--chip)",
                color: l.presentacion === i ? "var(--accent-fg)" : "var(--chip-ink)",
              }}
            >
              {pres.nombre}
            </button>
          ))}
        </div>
      )}

      {p.granel ? (
        /* El granel va en su propio renglón: peso e importe no caben en el
           hueco de los [−][+] sin partirse en móvil. */
        <div className="flex items-end gap-2 mt-2">
          <div className="flex-1 min-w-0">
            <label className="text-[10px] block mb-0.5" style={{ color: "var(--text-muted)" }}>
              Gramos
            </label>
            <input
              inputMode="decimal"
              value={l.cantidad || ""}
              onChange={(e) => {
                setImporteBorrador(null);
                onCambiar({ cantidad: Math.max(0, Number(e.target.value.replace(",", ".")) || 0) });
              }}
              placeholder="0"
              aria-label={`Gramos de ${p.nombre}`}
              className="w-full rounded-btn px-2 py-1.5 text-sm tabular-nums outline-none focus-visible:ring-2"
              style={{ background: "var(--bg)", border: "1px solid var(--btn2-border)", color: "var(--text)" }}
            />
          </div>
          <span className="text-xs pb-2" style={{ color: "var(--text-muted)" }}>=</span>
          <div className="flex-1 min-w-0">
            <label className="text-[10px] block mb-0.5" style={{ color: "var(--text-muted)" }}>
              Importe
            </label>
            <input
              inputMode="decimal"
              value={importeVisible}
              onChange={(e) => {
                const txt = e.target.value.replace(",", ".");
                setImporteBorrador(txt);
                onCambiar({ cantidad: gramosDesdeImporte(p.precio, Number(txt) || 0) });
              }}
              onBlur={() => setImporteBorrador(null)}
              placeholder="0.00"
              aria-label={`Importe de ${p.nombre}`}
              className="w-full rounded-btn px-2 py-1.5 text-sm tabular-nums outline-none focus-visible:ring-2"
              style={{ background: "var(--bg)", border: "1px solid var(--btn2-border)", color: "var(--text)" }}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-1.5">
            <BotonCantidad
              etiqueta={`Quitar uno de ${p.nombre}`}
              onClick={() => onCambiar({ cantidad: Math.max(0, l.cantidad - 1) })}
              icono="close"
            >
              −
            </BotonCantidad>
            <span
              className="text-sm font-semibold tabular-nums w-7 text-center"
              style={{ color: "var(--text)" }}
            >
              {l.cantidad}
            </span>
            <BotonCantidad
              etiqueta={`Agregar uno de ${p.nombre}`}
              onClick={() => onCambiar({ cantidad: l.cantidad + 1 })}
            >
              +
            </BotonCantidad>
            <span className="text-[11px] ml-1" style={{ color: "var(--text-muted)" }}>
              × {mxn(precioUnitario(l))}
            </span>
          </div>
          <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--text)" }}>
            {mxn(importeLinea(l))}
          </span>
        </div>
      )}

      {p.granel && (
        <p className="text-[11px] mt-1 text-right tabular-nums" style={{ color: "var(--text-muted)" }}>
          {mxn(p.precio)} / kg · {mxn(importeLinea(l))}
        </p>
      )}

      {/* El extra: opcional, en su renglón, y aquí sin inventario. */}
      {extraNombre && (
        <button
          type="button"
          onClick={onExtra}
          aria-pressed={tieneExtra}
          className="text-[11px] mt-1.5 font-semibold underline underline-offset-2"
          style={{ color: tieneExtra ? "var(--accent-ink)" : "var(--text-muted)" }}
        >
          {tieneExtra ? `✓ ${extraNombre}` : `+ ${extraNombre}`}
        </button>
      )}
    </div>
  );
}

function BotonCantidad({
  children,
  etiqueta,
  onClick,
}: {
  children: React.ReactNode;
  etiqueta: string;
  onClick: () => void;
  icono?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-7 h-7 rounded-md text-sm font-bold flex items-center justify-center"
      style={{ background: "var(--chip)", color: "var(--chip-ink)" }}
    >
      <span className="sr-only">{etiqueta}</span>
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
