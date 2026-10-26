"use client";
import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import {
  advertencias,
  BORRADOR_VACIO,
  CATEGORIAS,
  crearProducto,
  IMPUESTOS,
  UNIDADES,
  validar,
  type Borrador,
} from "@/lib/demoAlta";
import { mxn, type ProductoDemo } from "@/lib/demoMostrador";

/*
  Subir un producto al inventario.

  Es el paso que de verdad detiene a un negocio —nadie quiere teclear su
  catálogo entero—, así que lo que se enseña aquí no es un formulario bonito:
  es **qué hace el sistema cuando el dato está mal**. El código repetido dice
  cuál producto ya lo tiene; el costo vacío avisa que sin él no hay margen y
  no inventa un 100%; el nombre repetido trae escrita la salida.

  Las reglas viven en `lib/demoAlta.ts`, probadas aparte.
*/

type Props = {
  catalogo: ProductoDemo[];
  agregados: ProductoDemo[];
  onAgregar: (p: ProductoDemo) => void;
  onQuitar: (id: string) => void;
};

export function AltaProducto({ catalogo, agregados, onAgregar, onQuitar }: Props) {
  const [b, setB] = useState<Borrador>(BORRADOR_VACIO);
  const [tocado, setTocado] = useState(false);
  const id = useId();

  const todos = useMemo(() => [...agregados, ...catalogo], [agregados, catalogo]);
  const v = useMemo(() => validar(b, todos), [b, todos]);
  const avisos = useMemo(() => advertencias(b), [b]);

  const set = (campos: Partial<Borrador>) => setB((prev) => ({ ...prev, ...campos }));
  const problemaDe = (campo: keyof Borrador) =>
    tocado ? v.problemas.find((p) => p.campo === campo)?.mensaje : undefined;

  function guardar(e: React.FormEvent) {
    e.preventDefault();
    setTocado(true);
    if (!v.valido) return;
    onAgregar(crearProducto(b));
    // Se tira el borrador y se reponen los pocos campos que se conservan
    // entre altas seguidas: categoría, unidad e impuesto. Limpiar campo por
    // campo deja dentro los que alguien agregue después.
    setB({ ...BORRADOR_VACIO, categoria: b.categoria, unidad: b.unidad, tasa_impuesto: b.tasa_impuesto });
    setTocado(false);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-stretch">
      <form
        onSubmit={guardar}
        noValidate
        className="rounded-card p-4 sm:p-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-heading font-semibold text-[15px] mb-4" style={{ color: "var(--text)" }}>
          Nuevo producto
        </h3>

        <div className="grid sm:grid-cols-2 gap-3">
          <Campo
            id={`${id}-nombre`}
            etiqueta="Nombre"
            className="sm:col-span-2"
            error={problemaDe("nombre")}
          >
            <input
              id={`${id}-nombre`}
              value={b.nombre}
              onChange={(e) => set({ nombre: e.target.value })}
              placeholder="Galletas Marías 170 g"
              className="campo-demo"
            />
          </Campo>

          <Campo id={`${id}-precio`} etiqueta="Precio de venta" error={problemaDe("precio")}>
            <input
              id={`${id}-precio`}
              inputMode="decimal"
              value={b.precio}
              onChange={(e) => set({ precio: e.target.value })}
              placeholder="18.50"
              className="campo-demo tabular-nums"
            />
          </Campo>

          <Campo
            id={`${id}-costo`}
            etiqueta="Costo"
            ayuda="Opcional, pero sin él no hay margen."
            error={problemaDe("costo")}
          >
            <input
              id={`${id}-costo`}
              inputMode="decimal"
              value={b.costo}
              onChange={(e) => set({ costo: e.target.value })}
              placeholder="12.00"
              className="campo-demo tabular-nums"
            />
          </Campo>

          <Campo id={`${id}-codigo`} etiqueta="Código de barras" ayuda="Para escanearlo en la caja.">
            <input
              id={`${id}-codigo`}
              inputMode="numeric"
              value={b.codigo_barras}
              onChange={(e) => set({ codigo_barras: e.target.value })}
              placeholder="7501000000016"
              className="campo-demo tabular-nums"
            />
          </Campo>

          <Campo id={`${id}-stock`} etiqueta="Existencia inicial" error={problemaDe("stock")}>
            <input
              id={`${id}-stock`}
              inputMode="decimal"
              value={b.stock}
              onChange={(e) => set({ stock: e.target.value })}
              placeholder="24"
              className="campo-demo tabular-nums"
            />
          </Campo>

          <Campo id={`${id}-cat`} etiqueta="Categoría">
            <select
              id={`${id}-cat`}
              value={b.categoria}
              onChange={(e) => set({ categoria: e.target.value })}
              className="campo-demo"
              style={{ minWidth: 0 }}
            >
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Campo>

          <Campo id={`${id}-imp`} etiqueta="Impuesto">
            <select
              id={`${id}-imp`}
              value={b.tasa_impuesto}
              onChange={(e) => set({ tasa_impuesto: Number(e.target.value) })}
              className="campo-demo"
              style={{ minWidth: 0 }}
            >
              {IMPUESTOS.map((i) => <option key={i.valor} value={i.valor}>{i.etiqueta}</option>)}
            </select>
          </Campo>

          <Campo id={`${id}-unidad`} etiqueta="Se vende por">
            <select
              id={`${id}-unidad`}
              value={b.granel ? "kg" : b.unidad}
              disabled={b.granel}
              onChange={(e) => set({ unidad: e.target.value })}
              className="campo-demo"
              style={{ minWidth: 0 }}
            >
              {UNIDADES.map((u) => <option key={u.valor} value={u.valor}>{u.etiqueta}</option>)}
            </select>
          </Campo>

          <div className="sm:col-span-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={b.granel}
                onChange={(e) => set({ granel: e.target.checked })}
                className="mt-0.5"
              />
              <span>
                <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  Se vende a granel
                </span>
                <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Se pesa en la báscula y en la caja se captura en gramos, no en kilos.
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* El duplicado: no se rechaza y ya — se dice cuál lo tiene. */}
        <AnimatePresence>
          {v.duplicado && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-card px-3.5 py-3 mt-4"
              style={{
                background: "color-mix(in srgb, var(--color-error) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-error) 32%, transparent)",
              }}
            >
              <p className="text-[13px] font-semibold" style={{ color: "var(--color-error)" }}>
                Ese código ya está en uso
              </p>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-3)" }}>
                {v.duplicado.mensaje} Lo que suele pasar es que el producto ya existe y quien
                captura no lo encontró — por eso el sistema te enseña cuál es en vez de decir sólo
                «ya existe».
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {avisos.length > 0 && !v.duplicado && (
          <ul className="mt-4 flex flex-col gap-1.5 list-none p-0">
            {avisos.map((a) => (
              <li key={a} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-3)" }}>
                <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--warm-ink)" }}>
                  <Icon name="bulb" size={13} />
                </span>
                {a}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="w-full rounded-btn py-3 mt-4 font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
        >
          Guardar producto
        </button>
      </form>

      {/* ── Lo que llevas subido ─────────────────────────────────── */}
      <div
        className="rounded-card p-4 sm:p-5 flex flex-col"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-heading font-semibold text-[15px]" style={{ color: "var(--text)" }}>
          Tu inventario
        </h3>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {agregados.length > 0
            ? `${agregados.length} ${agregados.length === 1 ? "producto tuyo" : "productos tuyos"} · ${catalogo.length} de ejemplo`
            : `${catalogo.length} productos de ejemplo ya cargados`}
        </p>

        <ul className="flex flex-col gap-2 mt-4 list-none p-0 flex-1" style={{ minHeight: 180 }}>
          <AnimatePresence initial={false}>
            {agregados.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22 }}
                className="rounded-card p-3 flex items-start justify-between gap-2"
                style={{ background: "var(--tint)", border: "1px solid var(--accent)" }}
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-snug" style={{ color: "var(--text)" }}>
                    {p.nombre}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {mxn(p.precio)}{p.granel ? " / kg" : ""} · {p.stock} {p.unidad} · {p.sku}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onQuitar(p.id)}
                  className="flex-shrink-0 p-1 -m-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="sr-only">Quitar {p.nombre} del inventario</span>
                  <Icon name="close" size={14} />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>

          {!agregados.length && (
            <li className="text-sm py-6 text-center" style={{ color: "var(--text-muted)" }}>
              Lo que des de alta aparecerá aquí — y podrás venderlo en el paso siguiente.
            </li>
          )}
        </ul>

        <p
          className="text-xs rounded-btn px-3 py-2.5 mt-3"
          style={{ background: "var(--warm-tint)", color: "var(--text-3)" }}
        >
          En el producto real no capturas uno por uno: se trae de tu sistema anterior, se carga por
          archivo, o se escanea contra el catálogo maestro y el producto ya existe.
        </p>
      </div>
    </div>
  );
}

/* ── El campo, con su etiqueta, su ayuda y su error ─────────────────────── */

function Campo({
  id,
  etiqueta,
  ayuda,
  error,
  className = "",
  children,
}: {
  id: string;
  etiqueta: string;
  ayuda?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-semibold block mb-1" style={{ color: "var(--text-2)" }}>
        {etiqueta}
      </label>
      {children}
      {/* El error va antes que la ayuda: lo que hay que corregir ahora se lee
          primero. */}
      {error ? (
        <p className="text-[11px] mt-1" style={{ color: "var(--color-error)" }}>{error}</p>
      ) : ayuda ? (
        <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>{ayuda}</p>
      ) : null}
    </div>
  );
}
