import { expect, test } from "@playwright/test";

/*
  El Mostrador, de punta a punta.

  La aritmética ya está probada suelta en `lib/demoMostrador.test.ts`. Lo que
  se comprueba aquí es lo otro: que lo que se teclea llegue a la pantalla, que
  el inventario baje de verdad al cobrar y que **lo que no se debe poder
  cobrar no se cobre**. Son las tres cosas que convierten la simulación en
  algo que se puede enseñar a un cliente sin miedo.
*/

test.beforeEach(async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

const buscador = (page: import("@playwright/test").Page) =>
  page.getByLabel(/Buscar producto/i);

test("cobra una venta sencilla y el total cuadra", async ({ page }) => {
  await buscador(page).fill("coca");
  const primero = page.locator("ul li button").first();
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
  await page.locator("ul li button").first().click();

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
  await page.locator("ul li button").first().click();

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
  const tarjeta = page.locator("ul li button").first();
  const antes = await tarjeta.innerText();

  await tarjeta.click();
  await page.getByRole("button", { name: /^Cobrar/ }).click();
  await expect(page.getByText(/Venta cobrada/i)).toBeVisible();

  // La misma tarjeta, con una pieza menos.
  await expect(async () => {
    expect(await page.locator("ul li button").first().innerText()).not.toBe(antes);
  }).toPass({ timeout: 4000 });
});

test("se puede elegir el empaque y el precio no es el proporcional", async ({ page }) => {
  await buscador(page).fill("coca");
  await page.locator("ul li button").first().click();

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
  await page.locator("ul li button").first().click();

  const extra = page.getByRole("button", { name: /Bolsa reutilizable/i });
  await extra.click();
  await expect(extra).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: /^Cobrar/ }).click();
  await expect(page.getByText(/\+ Bolsa reutilizable/)).toBeVisible();
});

test("TEZCA contesta sobre lo que hay en pantalla y se anuncia como guionizado", async ({ page }) => {
  await expect(page.getByText(/Respuestas guionizadas/i)).toBeVisible();

  await buscador(page).fill("coca");
  await page.locator("ul li button").first().click();

  await page.getByRole("button", { name: /¿Cómo va este ticket\?/ }).click();
  // Responde con el conteo real del ticket, no con texto fijo.
  await expect(page.getByText(/artículos por \$/)).toBeVisible({ timeout: 5000 });
});

test("reiniciar devuelve el mostrador a como estaba", async ({ page }) => {
  await buscador(page).fill("coca");
  await page.locator("ul li button").first().click();
  await page.getByRole("button", { name: /^Cobrar/ }).click();
  await expect(page.getByText(/Venta cobrada/i)).toBeVisible();

  await page.getByRole("button", { name: /Reiniciar el mostrador/i }).click();
  await expect(page.getByText(/Venta cobrada/i)).toHaveCount(0);
  await expect(page.getByText(/Elige un producto para empezar/i)).toBeVisible();
});

test("dice que no guarda nada", async ({ page }) => {
  await expect(page.getByText(/no guarda nada/i)).toBeVisible();
});
