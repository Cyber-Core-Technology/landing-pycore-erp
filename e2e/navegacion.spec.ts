import { expect, test } from "@playwright/test";

/*
  Que el sitio se recorra entero.

  La reestructuración repartió el contenido en seis pantallas, así que lo que
  antes era «hacer scroll» ahora es navegar: si una ruta se rompe, el
  contenido simplemente no existe para quien llega. Por eso aquí se visita
  **cada una** y se comprueba que trae su `<h1>` y no un error.
*/

const RUTAS = [
  { ruta: "/", titulo: null },
  { ruta: "/demo", titulo: "Cobra una venta aquí mismo" },
  { ruta: "/modulos", titulo: null },
  { ruta: "/capacidades", titulo: "Los detalles que deciden si un sistema sirve o estorba" },
  { ruta: "/documentos", titulo: "Los documentos ya están hechos" },
  { ruta: "/plataforma", titulo: "Lo que sostiene todo lo demás" },
  { ruta: "/tezca", titulo: null },
  { ruta: "/tienda", titulo: null },
  { ruta: "/blog", titulo: null },
];

for (const { ruta, titulo } of RUTAS) {
  test(`${ruta} carga, tiene un h1 y no tira errores de consola`, async ({ page }) => {
    const errores: string[] = [];
    page.on("pageerror", (e) => errores.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errores.push(m.text());
    });

    const respuesta = await page.goto(ruta);
    expect(respuesta?.status(), `${ruta} respondió ${respuesta?.status()}`).toBe(200);

    // Un `<h1>` por pantalla: es lo que la nombra, y lo primero que lee quien
    // entra con lector. El del hero cuenta para la portada.
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    if (titulo) await expect(h1).toContainText(titulo);

    // Lo que destapó el `optimizePackageImports`: SSR daba 200 y la
    // hidratación reventaba. Un 200 no basta como prueba.
    expect(errores, `errores en ${ruta}:\n${errores.join("\n")}`).toEqual([]);
  });
}

test("se puede llegar al demo desde la portada", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Pruébalo tú/i }).first().click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cobra una venta");
});

test("no hay enlaces internos rotos en el menú", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator("header a[href^='/']").evaluateAll((as) =>
    [...new Set(as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!))],
  );
  expect(hrefs.length).toBeGreaterThan(4);

  for (const href of hrefs) {
    if (href.includes("#")) continue;
    const r = await page.request.get(href);
    expect(r.status(), `${href} respondió ${r.status()}`).toBe(200);
  }
});

test("los PDF de ejemplo se descargan de verdad", async ({ page }) => {
  await page.goto("/documentos");
  const enlaces = await page
    .locator("a[download]")
    .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
  expect(enlaces.length).toBeGreaterThan(0);

  for (const href of enlaces) {
    const r = await page.request.get(href);
    expect(r.status()).toBe(200);
    const cuerpo = await r.body();
    // Un PDF empieza por %PDF: si el servidor devolviera el HTML del 404 con
    // un 200, el enlace «funcionaría» y el archivo estaría roto.
    expect(cuerpo.subarray(0, 4).toString()).toBe("%PDF");
    expect(cuerpo.length).toBeGreaterThan(2000);
  }
});
