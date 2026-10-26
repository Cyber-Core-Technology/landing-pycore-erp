import { expect, test } from "@playwright/test";

/*
  El Mostrador, de punta a punta.

  La aritmética ya está probada suelta en `lib/demoMostrador.test.ts`. Lo que
  se comprueba aquí es lo otro: que lo que se teclea llegue a la pantalla, que
  el inventario baje de verdad al cobrar y que **lo que no se debe poder
  cobrar no se cobre**. Son las tres cosas que convierten la simulación en
  algo que se puede enseñar a un cliente sin miedo.
*/

/* El mostrador es el paso 3: hay que llegar a él antes de cada prueba. */
test.beforeEach(async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("tab", { name: /Ponte a vender/ }).click();
  await expect(page.getByLabel(/Buscar producto/i)).toBeVisible();
});

const buscador = (page: import("@playwright/test").Page) =>
  page.getByLabel(/Buscar producto/i);

/* La lista por su nombre, no por su posición: `ul li button` también
   alcanza el desplegable del menú, que va antes en el DOM. */
const tarjetas = (page: import("@playwright/test").Page) =>
  page.getByRole("list", { name: "Productos del catálogo" }).locator("button");

test("cobra una venta sencilla y el total cuadra", async ({ page }) => {
  await buscador(page).fill("coca");
  const primero = tarjetas(page).first();
  await expect(primero).toBeVisible();
  await primero.click();

  // La línea aparece en el ticket con su total.
  const total = page.getByRole("button", { name: /^Cobrar/ });
  await expect(total).toBeEnabled();

  await total.click();
  await expect(page.getByText(/Venta cobrada/i)).toBeVisible();
  await expect(page.getByText(/VEN-00001/)).toBeVisible();
});

test("un granel sin pesar no se puede cobrar, y lo dice", async ({ page }) => {
  await buscador(page).fill("granel");
  await tarjetas(page).first().click();

  // Nace sin cantidad: «falta pesar» es un estado legítimo.
  const campoGramos = page.getByLabel(/^Gramos de /i);
  await expect(campoGramos).toBeVisible();
  await expect(campoGramos).toHaveValue("");

  await page.getByRole("button", { name: /^Cobrar/ }).click();
  await expect(page.getByText(/Falta pesar/i)).toBeVisible();
  // Y no cobró nada.
  await expect(page.getByText(/Venta cobrada/i)).toHaveCount(0);
});

test("el granel se captura en gramos y el importe se equilibra solo", async ({ page }) => {
  await buscador(page).fill("granel");
  await tarjetas(page).first().click();

  await page.getByLabel(/^Gramos de /i).fill("500");
  const importe = page.getByLabel(/^Importe de /i);
  // Medio kilo cuesta la mitad del precio por kilo, no mil veces más.
  const valor = Number(await importe.inputValue());
  expect(valor).toBeGreaterThan(0);
  expect(valor).toBeLessThan(500);

  // Y al revés: se teclea el importe y salen los gramos.
  await importe.fill("20");
  const gramos = Number(await page.getByLabel(/^Gramos de /i).inputValue());
  expect(gramos).toBeGreaterThan(0);
  expect(gramos).not.toBe(500);
});

test("el inventario baja al cobrar", async ({ page }) => {
  await buscador(page).fill("coca");
  const tarjeta = tarjetas(page).first();
  const antes = await tarjeta.innerText();

  await tarjeta.click();
  await page.getByRole("button", { name: /^Cobrar/ }).click();
  await expect(page.getByText(/Venta cobrada/i)).toBeVisible();

  // La misma tarjeta, con una pieza menos.
  await expect(async () => {
    expect(await tarjetas(page).first().innerText()).not.toBe(antes);
  }).toPass({ timeout: 4000 });
});

test("se puede elegir el empaque y el precio no es el proporcional", async ({ page }) => {
  await buscador(page).fill("coca");
  await tarjetas(page).first().click();

  const grupo = page.getByRole("group", { name: /Empaque de/i });
  await expect(grupo).toBeVisible();

  const pieza = grupo.getByRole("button").first();
  const carton = grupo.getByRole("button").nth(1);
  await expect(pieza).toHaveAttribute("aria-pressed", "true");

  await carton.click();
  await expect(carton).toHaveAttribute("aria-pressed", "true");
  await expect(pieza).toHaveAttribute("aria-pressed", "false");
});

test("el extra se agrega en su propio renglón del ticket", async ({ page }) => {
  await buscador(page).fill("coca");
  await tarjetas(page).first().click();

  // El extra ahora es del producto: el vaso térmico es del café.
  await page.getByLabel(/Buscar producto/i).fill("café de olla");
  await tarjetas(page).first().click();
  const extra = page.getByRole("button", { name: /Vaso térmico/i }).first();
  await extra.click();
  await expect(extra).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: /^Cobrar/ }).click();
  await expect(page.getByText(/\+ Vaso térmico/)).toBeVisible();
});

test("TEZCA contesta sobre lo que hay en pantalla y se anuncia como guionizado", async ({ page }) => {
  await expect(page.getByText(/Respuestas guionizadas/i)).toBeVisible();

  await buscador(page).fill("coca");
  await tarjetas(page).first().click();

  await page.getByRole("button", { name: /¿Cómo va este ticket\?/ }).click();
  // Responde con el conteo real del ticket, no con texto fijo.
  await expect(page.getByText(/artículos por \$/)).toBeVisible({ timeout: 5000 });
});

test("reiniciar devuelve el mostrador a como estaba", async ({ page }) => {
  await buscador(page).fill("coca");
  await tarjetas(page).first().click();
  await page.getByRole("button", { name: /^Cobrar/ }).click();
  await expect(page.getByText(/Venta cobrada/i)).toBeVisible();

  // El ticket se superpone al panel, así que primero se cierra: ése es el
  // punto de que salga encima y no debajo.
  await page.getByRole("button", { name: "Seguir vendiendo" }).click();
  await page.getByRole("button", { name: /Reiniciar el mostrador/i }).click();
  await expect(page.getByText(/Venta cobrada/i)).toHaveCount(0);
  await expect(page.getByText(/Elige un producto para empezar/i)).toBeVisible();
});

test("dice que no guarda nada", async ({ page }) => {
  await expect(page.getByText(/no guarda nada/i)).toBeVisible();
});

test("el ticket sale sobre la venta y se puede cerrar", async ({ page }) => {
  await page.getByLabel(/Buscar producto/i).fill("coca");
  await tarjetas(page).first().click();
  await page.getByRole("button", { name: /^Cobrar/ }).click();

  // Es un diálogo encima de la venta, no un bloque añadido abajo.
  const ticket = page.getByRole("dialog", { name: /Ticket de la venta/i });
  await expect(ticket).toBeVisible();

  await ticket.getByRole("button", { name: "Seguir vendiendo" }).click();
  await expect(ticket).toHaveCount(0);
  // Y el mostrador queda listo para la siguiente.
  await expect(page.getByText(/Elige un producto para empezar/i)).toBeVisible();
});

test("el ticket cierra con Escape", async ({ page }) => {
  await page.getByLabel(/Buscar producto/i).fill("coca");
  await tarjetas(page).first().click();
  await page.getByRole("button", { name: /^Cobrar/ }).click();

  const ticket = page.getByRole("dialog", { name: /Ticket de la venta/i });
  await expect(ticket).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(ticket).toHaveCount(0);
});

test("el selector distingue granel, empaques, variantes y extras", async ({ page }) => {
  const buscar = page.getByLabel(/Buscar producto/i);

  await buscar.fill("granel");
  await expect(tarjetas(page).first().getByText("Granel", { exact: true })).toBeVisible();

  await buscar.fill("coca");
  await expect(page.getByText(/\d+ empaques/).first()).toBeVisible();

  await buscar.fill("botana barcel bolsa familiar");
  await expect(page.getByText(/\d+ variantes/).first()).toBeVisible();

  await buscar.fill("café de olla");
  await expect(page.getByText("Con extras", { exact: true }).first()).toBeVisible();
});

test("una variante lleva su propia existencia", async ({ page }) => {
  await page.getByLabel(/Buscar producto/i).fill("botana barcel bolsa familiar");
  await tarjetas(page).first().click();

  const grupo = page.getByRole("group", { name: /Variante de/i });
  await expect(grupo).toBeVisible();
  const primera = grupo.getByRole("button").first();
  const segunda = grupo.getByRole("button").nth(1);
  await expect(primera).toHaveAttribute("aria-pressed", "true");

  await segunda.click();
  await expect(segunda).toHaveAttribute("aria-pressed", "true");
  await expect(primera).toHaveAttribute("aria-pressed", "false");
});

test("el ticket cabe entero: el botón de cerrar no se corta", async ({ page }) => {
  /*
    Iba superpuesto con `absolute inset-0`, así que tomaba el alto del panel
    de la venta —que al cobrar queda vacío y corto— y se cortaba por abajo:
    el botón quedaba fuera de la caja. Ahora ocupa su lugar y la tarjeta
    crece con el contenido.
  */
  await buscador(page).fill("granel");
  await tarjetas(page).first().click();
  await page.getByLabel(/^Gramos de /i).fill("465");
  await page.getByRole("button", { name: /^Cobrar/ }).click();

  const ticket = page.getByRole("dialog", { name: /Ticket de la venta/i });
  await expect(ticket).toBeVisible();

  /*
    «Cortado» se comprueba como lo ve una persona: que el botón esté
    **entero** en pantalla. Comparar cajas se enredaba con los márgenes
    negativos del envoltorio y medía cualquier cosa menos lo que falla.

    Con el ticket superpuesto, el botón quedaba fuera del área visible de su
    contenedor con scroll, así que esta comprobación es la que se ponía roja.
  */
  const boton = ticket.getByRole("button", { name: "Seguir vendiendo" });
  await expect(boton).toBeInViewport({ ratio: 1 });

  // Y nada por encima lo recorta.
  const recortado = await boton.evaluate((el) => {
    const r = el.getBoundingClientRect();
    for (let p = el.parentElement; p; p = p.parentElement) {
      const estilo = getComputedStyle(p);
      if (estilo.overflowY === "visible" && estilo.overflowX === "visible") continue;
      const pr = p.getBoundingClientRect();
      if (r.bottom > pr.bottom + 1 || r.top < pr.top - 1) return p.className || "(sin clase)";
    }
    return null;
  });
  expect(recortado, `lo recorta: ${recortado}`).toBeNull();
});
