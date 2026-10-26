import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EncabezadoPagina } from "@/components/layout/EncabezadoPagina";
import { CTASection } from "@/components/sections/CTASection";
import { TresPasos } from "@/components/demo/TresPasos";
import { Revelar } from "@/components/ui/Revelar";
import { Icon } from "@/components/ui/Icon";
import type { CatalogoDemo } from "@/lib/demoMostrador";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

export const metadata: Metadata = {
  title: "Pruébalo tú — compra tu plan, sube tu inventario y ponte a vender",
  description:
    "El recorrido completo, sin registrarte: elige plan, da de alta un producto y véndelo. Granel en gramos, empaques, variantes y extras, con el ticket al final.",
  keywords: [
    "demo punto de venta", "probar ERP gratis", "POS en línea demo",
    "software para abarrotes", "demo sin registro",
  ],
  alternates: { canonical: `${SITE_URL}/demo` },
  openGraph: {
    title: "Pruébalo tú — PyCore SGC en tres pasos",
    description:
      "Compra tu plan, sube tu inventario y ponte a vender. El recorrido completo, aquí mismo y sin registro.",
    url: `${SITE_URL}/demo`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Demo de PyCore SGC" }],
  },
};

/*
  El catálogo se lee en el servidor, en build.

  Sale de `scripts/exportar_catalogo_demo.py`, que lo exporta del tenant
  `demo-abarrotes` del ERP: nombres, precios, códigos de barras, unidades e
  impuesto son los sembrados, no inventados. Es el mismo criterio que los PDF
  de ejemplo — enseñar la cosa, no un dibujo de la cosa.
*/
async function leerCatalogo(): Promise<CatalogoDemo> {
  const ruta = path.join(process.cwd(), "public", "demo", "catalogo.json");
  return JSON.parse(await fs.readFile(ruta, "utf-8")) as CatalogoDemo;
}

const REGLAS = [
  {
    icon: "scale",
    titulo: "El granel va en gramos",
    texto:
      "Nadie pide «0.1 de frijol»: pide 100 gramos, que es lo que marca la báscula. Teclea el peso o teclea el importe — se equilibran en los dos sentidos.",
  },
  {
    icon: "box",
    titulo: "Pieza y cartón, un solo stock",
    texto:
      "La Coca-Cola suelta y el cartón de 12 son un producto, no dos. El cartón cuesta menos por pieza, y vender uno descuenta doce del almacén.",
  },
  {
    icon: "bag",
    titulo: "El extra se cobra aparte",
    texto:
      "La bolsa va en su propio renglón, debajo del producto al que se le puso, y cuenta una vez por línea — no una por pieza.",
  },
  {
    icon: "ban",
    titulo: "Lo que no se deja cobrar",
    texto:
      "Un granel sin pesar no es una venta de $0: es un producto que nadie pesó. Y si no alcanza la existencia, el error dice cuánto hay y cuánto falta.",
  },
];

export default async function DemoPage() {
  const catalogo = await leerCatalogo();

  return (
    <>
      <Navbar />
      <main id="main">
        <EncabezadoPagina
          icon="store"
          cejilla="PRUÉBALO TÚ · TRES PASOS"
          titulo="Compra tu plan, sube tu inventario y ponte a vender"
          bajada="El recorrido entero de un negocio que empieza, aquí mismo y sin registrarte. Lo que das de alta en el paso dos lo vendes en el tres — eso es lo que no puede enseñar un video."
        />

        <section className="py-10 lg:py-12" style={{ background: "var(--bg)" }} aria-label="Recorrido de demostración">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TresPasos catalogo={catalogo} />

            <Revelar retardo={0.1}>
              <p
                className="text-xs mt-5 rounded-card px-4 py-3"
                style={{
                  background: "var(--warm-tint)",
                  border: "1px solid var(--warm-tint-border)",
                  color: "var(--text-3)",
                }}
              >
                <strong style={{ color: "var(--warm-ink)" }}>Esto es una simulación y no guarda nada.</strong>{" "}
                Al recargar, el mostrador vuelve a abrir con el inventario completo. Las reglas de
                cobro, inventario e impuestos son las del sistema; TEZCA responde con un guion, y lo
                dice en su encabezado. En el producto real la venta queda registrada, mueve el
                kardex, genera su ticket por correo y WhatsApp y entra al corte del turno.
              </p>
            </Revelar>
          </div>
        </section>

        <section className="py-16" style={{ background: "var(--card)" }} aria-labelledby="reglas-demo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Revelar>
              <p className="text-xs font-semibold tracking-[0.16em]" style={{ color: "var(--warm-ink)" }}>
                QUÉ ESTÁS PROBANDO
              </p>
              <h2
                id="reglas-demo"
                className="font-heading text-3xl font-bold leading-[1.12] tracking-[-0.025em] mt-3"
                style={{ color: "var(--text)" }}
              >
                Cuatro reglas que casi
                <br />
                ningún sistema acierta
              </h2>
            </Revelar>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9 list-none p-0">
              {REGLAS.map((r, i) => (
                <Revelar key={r.titulo} as="li" retardo={i * 0.07}>
                  <div
                    className="rounded-card p-5 h-full"
                    style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                      style={{ background: "var(--tint)", color: "var(--accent-ink)" }}
                    >
                      <Icon name={r.icon} size={19} />
                    </span>
                    <h3 className="font-heading font-semibold text-[15px]" style={{ color: "var(--text)" }}>
                      {r.titulo}
                    </h3>
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {r.texto}
                    </p>
                  </div>
                </Revelar>
              ))}
            </ul>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
