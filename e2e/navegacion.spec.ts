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
  { ruta: "/demo", titulo: "Compra tu plan, sube tu inventario y ponte a vender" },
  { ruta: "/modulos", titulo: "Todo lo que tu negocio necesita, en un solo lugar" },
  { ruta: "/capacidades", titulo: "Los detalles que deciden si un sistema sirve o estorba" },
  { ruta: "/documentos", titulo: "Los documentos ya están hechos" },
  { ruta: "/plataforma", titulo: "Lo que sostiene todo lo demás" },
  { ruta: "/giros", titulo: "Tu negocio no es «un negocio»" },
  { ruta: "/migracion", titulo: "Cambiar de sistema sin recapturar nada" },
  { ruta: "/contacto", titulo: "Habla con quien hace el sistema" },
  { ruta: "/accesibilidad", titulo: "Qué cumplimos, y qué todavía no" },
  { ruta: "/tezca", titulo: "Te dice qué hacer, no sólo qué pasó" },
  { ruta: "/tienda", titulo: "Tu catálogo público, conectado al mismo inventario" },
  { ruta: "/blog", titulo: "Lo que aprendemos operando" },
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
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Compra tu plan");
});

test("no hay enlaces internos rotos en el menú", async ({ page }, info) => {
  await page.goto("/");

  /*
    Los cinco de producto no están sueltos en la barra: hay que desplegarlos.
    Y el gesto es distinto en cada tamaño —en el escritorio es el menú
    «Producto», en el teléfono es el cajón entero—, que es justo el punto de
    que la maqueta cambie el árbol y no sólo el CSS.
  */
  if (info.project.name === "telefono") {
    await page.getByRole("button", { name: "Abrir menú" }).click();
  } else {
    await page.getByRole("button", { name: "Producto" }).click();
  }
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

test("el menú agrupa el producto en un desplegable accesible", async ({ page }, info) => {
  test.skip(info.project.name !== "escritorio", "Es la barra de escritorio");

  await page.goto("/");
  const boton = page.getByRole("button", { name: "Producto" });
  await expect(boton).toHaveAttribute("aria-expanded", "false");

  await boton.click();
  await expect(boton).toHaveAttribute("aria-expanded", "true");
  // Dentro del desplegable: «Capacidades» también está en el pie.
  await expect(page.locator("header").getByRole("link", { name: /Capacidades/ })).toBeVisible();

  // Cierra con Escape y devuelve el foco: sólo con un clic fuera no se puede
  // cerrar con el teclado.
  await page.keyboard.press("Escape");
  await expect(boton).toHaveAttribute("aria-expanded", "false");
  await expect(boton).toBeFocused();
});

test("la barra no se satura: pocos elementos arriba", async ({ page }, info) => {
  test.skip(info.project.name !== "escritorio", "Es la barra de escritorio");

  await page.goto("/");
  const items = page.locator("header nav > ul > li");
  // Producto + cuatro. El tope práctico: por encima, una lista deja de ser
  // un menú y pasa a ser una pared de palabras que nadie lee entera.
  await expect(items).toHaveCount(5);
});

test("la portada homologada se repite en todas las páginas interiores", async ({ page }) => {
  /*
    Los headers vivían escritos a mano en cada página, con colores fijos en
    vez de tokens: por eso unos se veían de un tono y otros de otro. Ahora
    salen todos de `EncabezadoPagina`, y lo que lo delata es la migaja de
    pan — la escribía ninguno de los antiguos.
  */
  for (const ruta of ["/giros", "/migracion", "/contacto", "/accesibilidad", "/modulos", "/tezca", "/tienda", "/blog", "/plataforma", "/demo", "/capacidades", "/documentos"]) {
    await page.goto(ruta);
    await expect(page.getByRole("navigation", { name: "Migaja de pan" }), ruta).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 }), ruta).toBeVisible();
  }
});

test("el acceso a la empresa sale del sitio, no inventa una página", async ({ page }) => {
  await page.goto("/contacto");
  const enlace = page.getByRole("link", { name: /Ir al sitio de la empresa/i });
  await expect(enlace).toHaveAttribute("href", "https://global-ianalytics.com");
  await expect(enlace).toHaveAttribute("target", "_blank");
});

test("la declaración de accesibilidad dice lo que NO cumple", async ({ page }) => {
  await page.goto("/accesibilidad");
  // Una declaración que sólo presume es la que nadie vuelve a creer.
  await expect(page.getByRole("heading", { name: "Esto es lo que falta" })).toBeVisible();
  await expect(page.getByText(/Fuera del alcance, hoy/i)).toBeVisible();
});

test("las redes incluyen TikTok y se leen sobre la cabecera oscura", async ({ page }, info) => {
  test.skip(info.project.name !== "escritorio", "El riel sólo existe en pantallas anchas");

  await page.goto("/contacto");
  const riel = page.getByRole("complementary", { name: "Redes sociales" });
  await expect(riel.getByRole("link")).toHaveCount(6);
  await expect(riel.getByRole("link", { name: /TikTok/i })).toBeVisible();

  /*
    El riel es fijo y cruza la banda oscura de la cabecera. Sin superficie
    propia los iconos se desvanecían justo ahí, que es donde más se miran:
    cada enlace tiene que traer su fondo, no sólo su color.
  */
  const fondo = await riel.getByRole("link").first().evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  expect(fondo).not.toBe("rgba(0, 0, 0, 0)");
});

test("quiénes somos nombra a la empresa y a quien lo escribió", async ({ page }) => {
  await page.goto("/contacto");
  await expect(page.getByRole("heading", { name: /Global-IAnalytics/ }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Raul Jovany Callejas/ }).first()).toBeVisible();
  // Su ficha oficial es verificable, que es lo que distingue esto de adjetivos.
  await expect(
    page.getByRole("link", { name: /Su ficha en la empresa/i }),
  ).toHaveAttribute("href", /global-ianalytics\.com\/es\/equipo\//);
});

test("la ruta vieja /nosotros redirige en vez de romperse", async ({ page }) => {
  // Pudo quedar enlazada fuera: un 404 ahí pierde a quien venía de un buscador.
  const res = await page.goto("/nosotros");
  expect(res?.status()).toBe(200);
  expect(page.url()).toContain("/contacto");
});

test("quiénes somos NO enumera los otros productos de la empresa", async ({ page }) => {
  /*
    Quien lee vino por un ERP. Enumerarle un CRM y un ERP académico no le
    resuelve nada y desvía la atención de lo que vino a decidir.
  */
  await page.goto("/contacto");
  const cuerpo = (await page.locator("main").innerText()).toLowerCase();
  for (const otro of ["qualidot", "artemisa", "victoria"]) {
    expect(cuerpo, `no debería aparecer «${otro}»`).not.toContain(otro);
  }
});

test("TEZCA explica su nombre y lleva el jaguar de la plataforma", async ({ page }) => {
  await page.goto("/tezca");
  await expect(page.getByRole("heading", { name: /Ver lo que otros/ })).toBeVisible();
  await expect(page.getByText(/Tezcatlipoca/).first()).toBeVisible();
  await expect(page.getByText(/espejo humeante/i).first()).toBeVisible();

  // El mismo archivo que la plataforma, no uno redibujado aquí.
  const jaguar = page.getByAltText(/Jaguar de TEZCA/i);
  await expect(jaguar).toBeVisible();
  const r = await page.request.get("/tezca-logo.svg");
  expect(r.status()).toBe(200);
  expect(await r.text()).toContain("Tezcatlipoca");
});

test("el crédito enlaza las dos fichas verificables", async ({ page }) => {
  await page.goto("/contacto");
  await expect(page.getByRole("link", { name: /Su ficha en la empresa/i }))
    .toHaveAttribute("href", /global-ianalytics\.com\/es\/equipo\//);
  await expect(page.getByRole("link", { name: /Su trabajo de infraestructura/i }))
    .toHaveAttribute("href", "https://scorpion.cyco.tech");
});
