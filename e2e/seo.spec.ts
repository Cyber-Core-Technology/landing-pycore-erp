import { expect, test } from "@playwright/test";

/*
  El SEO, comprobado.

  Nada de esto se ve en pantalla, así que se degrada sin que nadie lo note:
  una página nueva sin `canonical`, un título que se pasa de largo y el
  buscador lo corta, una descripción duplicada entre dos páginas. Se descubre
  seis semanas después, cuando ya costó posiciones.

  Por eso va en una prueba y no en una lista de buenas intenciones.
*/

const RUTAS = [
  "/", "/demo", "/giros", "/migracion", "/contacto", "/accesibilidad",
  "/modulos", "/capacidades", "/documentos", "/plataforma", "/tezca",
  "/tienda", "/blog",
];

const meta = (page: import("@playwright/test").Page, nombre: string) =>
  page.locator(`meta[name="${nombre}"]`).first().getAttribute("content");

const prop = (page: import("@playwright/test").Page, propiedad: string) =>
  page.locator(`meta[property="${propiedad}"]`).first().getAttribute("content");

test.describe("metadatos por página", () => {
  for (const ruta of RUTAS) {
    test(`${ruta} trae lo que un buscador necesita`, async ({ page }, info) => {
      test.skip(info.project.name !== "escritorio", "No depende del tamaño");
      await page.goto(ruta);

      /*
        El título: ni vacío ni pasado de largo. Un buscador enseña unos 60
        caracteres y corta el resto con puntos suspensivos — justo donde
        suele estar la palabra que importa.
      */
      const titulo = await page.title();
      expect(titulo.length, `${ruta}: título vacío`).toBeGreaterThan(15);
      expect(titulo.length, `${ruta}: título largo → «${titulo}»`).toBeLessThanOrEqual(62);

      /*
        Y la marca **una sola vez**: la plantilla de `layout.tsx` ya añade
        «· PyCore SGC», así que escribirla también en el título la repetía y
        gastaba en eso los caracteres que se enseñan.
      */
      expect(
        titulo.match(/PyCore SGC/g)?.length ?? 0,
        `${ruta}: marca duplicada → «${titulo}»`,
      ).toBeLessThanOrEqual(1);

      const desc = await meta(page, "description");
      expect(desc, `${ruta}: sin descripción`).toBeTruthy();
      expect(desc!.length, `${ruta}: descripción corta`).toBeGreaterThan(70);
      expect(desc!.length, `${ruta}: descripción larga (${desc!.length})`).toBeLessThanOrEqual(185);

      // Canónica absoluta y apuntando a su propia ruta.
      const canonica = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonica, `${ruta}: sin canonical`).toBeTruthy();
      expect(canonica!).toMatch(/^https?:\/\//);
      expect(new URL(canonica!).pathname).toBe(ruta === "/" ? "/" : ruta);

      // Al compartir: tarjeta grande con imagen, o sale el enlace pelado.
      expect(await prop(page, "og:title"), `${ruta}: sin og:title`).toBeTruthy();
      expect(await prop(page, "og:description")).toBeTruthy();
      expect(await prop(page, "og:image"), `${ruta}: sin og:image`).toBeTruthy();
      expect(await meta(page, "twitter:card")).toBe("summary_large_image");

      // Idioma declarado: el sitio es de México y para México.
      expect(await page.locator("html").getAttribute("lang")).toBe("es-MX");
    });
  }
});

test("ninguna página repite el título ni la descripción de otra", async ({ page }, info) => {
  test.skip(info.project.name !== "escritorio", "No depende del tamaño");

  /*
    Dos páginas con la misma descripción compiten entre sí: el buscador elige
    una y entierra la otra. Es el defecto más común al crecer un sitio a
    base de copiar la página anterior.
  */
  const titulos = new Map<string, string>();
  const descripciones = new Map<string, string>();

  for (const ruta of RUTAS) {
    await page.goto(ruta);
    const t = await page.title();
    const d = (await meta(page, "description"))!;
    expect(titulos.has(t), `«${t}» se repite en ${ruta} y en ${titulos.get(t)}`).toBe(false);
    expect(descripciones.has(d), `descripción repetida en ${ruta} y en ${descripciones.get(d)}`).toBe(false);
    titulos.set(t, ruta);
    descripciones.set(d, ruta);
  }
});

test("el mapa del sitio lista todas las rutas y ninguna rota", async ({ page }) => {
  const xml = await (await page.request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);

  for (const ruta of RUTAS) {
    expect(urls, `${ruta} falta en el sitemap`).toContain(ruta);
  }
  // Y lo que lista tiene que existir: una entrada muerta gasta rastreo.
  for (const u of urls) {
    if (u.startsWith("/blog/")) continue;
    const r = await page.request.get(u);
    expect(r.status(), `${u} está en el sitemap y responde ${r.status()}`).toBe(200);
  }
});

test("robots permite rastrear y apunta al mapa", async ({ page }) => {
  const txt = await (await page.request.get("/robots.txt")).text();
  expect(txt).toContain("Allow: /");
  expect(txt).toContain("Sitemap:");
  // La API no aporta nada a un buscador y sí gasta su presupuesto de rastreo.
  expect(txt).toContain("/api/");
});

test("los datos estructurados de la portada están completos", async ({ page }, info) => {
  test.skip(info.project.name !== "escritorio", "No depende del tamaño");
  await page.goto("/");

  const bloques = await page.locator('script[type="application/ld+json"]').allTextContents();
  const grafo = bloques.flatMap((b) => JSON.parse(b)["@graph"] ?? [JSON.parse(b)]);
  const tipos = grafo.map((n: { "@type": string }) => n["@type"]);

  for (const t of ["Organization", "Person", "SoftwareApplication", "WebSite", "FAQPage"]) {
    expect(tipos, `falta ${t}`).toContain(t);
  }

  // La entidad se construye enlazando: sin `sameAs` son páginas sin relación.
  const persona = grafo.find((n: { "@type": string }) => n["@type"] === "Person");
  expect(persona.sameAs?.length ?? 0).toBeGreaterThan(1);

  const org = grafo.find((n: { "@type": string }) => n["@type"] === "Organization");
  expect(org.sameAs?.length ?? 0).toBeGreaterThan(3);

  // El precio que se publica tiene que ser el que se cobra.
  const app = grafo.find((n: { "@type": string }) => n["@type"] === "SoftwareApplication");
  expect(app.offers.priceCurrency).toBe("MXN");
  expect(Number(app.offers.lowPrice)).toBeGreaterThan(0);
});
