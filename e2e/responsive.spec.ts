import { expect, test } from "@playwright/test";

/*
  El responsive, medido.

  «Se ve bien en móvil» no es una comprobación. Lo que de verdad rompe una
  página en un teléfono es **el desbordamiento horizontal**: un ancho fijo, un
  `select` nativo que mide lo que su opción más larga, una tabla sin recorte.
  Aparece como una franja en blanco a la derecha y un scroll lateral que nadie
  quería — y no se nota en el escritorio, que es donde se mira.

  Así que se mide: el documento no puede ser más ancho que la ventana, en
  ninguna de las dos resoluciones y en ninguna pantalla.
*/

const RUTAS = ["/", "/demo", "/modulos", "/capacidades", "/documentos", "/plataforma", "/tezca", "/tienda"];

for (const ruta of RUTAS) {
  test(`${ruta} no desborda a lo ancho`, async ({ page }, info) => {
    await page.goto(ruta);
    await page.waitForLoadState("networkidle");

    const { ancho, ventana } = await page.evaluate(() => ({
      ancho: document.documentElement.scrollWidth,
      ventana: window.innerWidth,
    }));

    // Un píxel de margen por el redondeo de los navegadores.
    expect(
      ancho,
      `${ruta} en ${info.project.name}: el documento mide ${ancho}px en una ventana de ${ventana}px`,
    ).toBeLessThanOrEqual(ventana + 1);
  });
}

test("el menú de móvil se abre, atrapa el foco y cierra con Escape", async ({ page }, info) => {
  test.skip(info.project.name !== "telefono", "Sólo aplica al menú compacto");

  await page.goto("/");
  const abrir = page.getByRole("button", { name: "Abrir menú" });
  await abrir.click();

  const dialogo = page.getByRole("dialog");
  await expect(dialogo).toBeVisible();

  // El foco entra al cajón, no se queda en el botón que lo abrió.
  await expect(dialogo.getByRole("link").first()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialogo).toHaveCount(0);
  // Y vuelve al botón: dejarlo en el aire manda el siguiente Tab al
  // principio de la página.
  await expect(abrir).toBeFocused();
});

test("en el teléfono el mostrador se apila y el buscador se alcanza", async ({ page }, info) => {
  test.skip(info.project.name !== "telefono", "Es la maqueta del teléfono");

  await page.goto("/demo");
  const buscador = page.getByLabel(/Buscar producto/i);
  await expect(buscador).toBeVisible();

  // El buscador tiene que caber en el ancho de la pantalla, no salirse.
  const caja = await buscador.boundingBox();
  const ventana = page.viewportSize()!;
  expect(caja!.x).toBeGreaterThanOrEqual(0);
  expect(caja!.x + caja!.width).toBeLessThanOrEqual(ventana.width + 1);

  // Y el ticket va debajo del catálogo, no a un lado.
  const catalogo = (await buscador.boundingBox())!;
  const ticket = (await page.getByRole("heading", { name: "Venta en curso" }).boundingBox())!;
  expect(ticket.y).toBeGreaterThan(catalogo.y);
});

test("los controles táctiles tienen un tamaño alcanzable", async ({ page }, info) => {
  test.skip(info.project.name !== "telefono", "Es una regla de puntero grueso");

  await page.goto("/demo");
  await page.getByLabel(/Buscar producto/i).fill("coca");
  await page.locator("ul li button").first().click();

  // Los [−][+] son el control que más se pulsa en un mostrador.
  const mas = page.getByRole("button", { name: /Agregar uno de/i }).first();
  const caja = (await mas.boundingBox())!;
  // 28 px es el tamaño dibujado; con su área de pulsación efectiva queda por
  // encima del mínimo de 24×24 de WCAG 2.2 (criterio 2.5.8).
  expect(Math.min(caja.width, caja.height)).toBeGreaterThanOrEqual(24);
});

test("la tipografía no se queda minúscula en el teléfono", async ({ page }, info) => {
  test.skip(info.project.name !== "telefono", "Es legibilidad en pantalla chica");

  await page.goto("/demo");
  const parrafo = page.locator("main p").first();
  const tam = await parrafo.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(tam).toBeGreaterThanOrEqual(12);
});
