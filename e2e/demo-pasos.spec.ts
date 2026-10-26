import { expect, test } from "@playwright/test";

/*
  Los tres pasos.

  Lo que de verdad hay que comprobar no es que las pestañas cambien: es que
  **lo que haces en un paso llegue al siguiente**. Un producto dado de alta
  en el dos que no se pueda vender en el tres convierte el recorrido en tres
  pantallas sueltas, que es justo lo que no se quería.
*/

test.beforeEach(async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("los tres pasos están y se recorren con las flechas", async ({ page }) => {
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(3);
  await expect(tabs.nth(0)).toContainText("Compra tu plan");
  await expect(tabs.nth(1)).toContainText("Sube tu inventario");
  await expect(tabs.nth(2)).toContainText("Ponte a vender");

  // Una sola parada de tabulador: tres pasos no cuestan tres tabulaciones.
  await tabs.nth(0).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
});

test("elegir plan avanza al paso dos y no pide tarjeta", async ({ page }) => {
  await expect(page.getByText(/no se cobra nada ni se pide tarjeta/i)).toBeVisible();
  await page.getByRole("radio", { name: /^Profesional/ }).click();
  await expect(page.getByRole("tab", { name: /Sube tu inventario/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("un producto dado de alta se puede vender en el paso tres", async ({ page }) => {
  await page.getByRole("tab", { name: /Sube tu inventario/ }).click();

  await page.getByLabel("Nombre").fill("Galletas Marías 170 g");
  await page.getByLabel("Precio de venta").fill("18.50");
  await page.getByLabel("Costo").fill("12");
  await page.getByLabel("Existencia inicial").fill("24");
  await page.getByRole("button", { name: /Guardar producto/i }).click();

  // Aparece en «Tu inventario».
  await expect(page.getByText("Galletas Marías 170 g", { exact: true })).toBeVisible();

  // Y se puede vender.
  await page.getByRole("tab", { name: /Ponte a vender/ }).click();
  await page.getByLabel(/Buscar producto/i).fill("Marías");
  await page.getByRole("list", { name: "Productos del catálogo" }).locator("button").first().click();
  await page.getByRole("button", { name: /^Cobrar/ }).click();
  await expect(page.getByRole("dialog", { name: /Ticket de la venta/i })).toBeVisible();
});

test("un código de barras repetido dice CUÁL producto ya lo tiene", async ({ page }) => {
  await page.getByRole("tab", { name: /Sube tu inventario/ }).click();

  await page.getByLabel("Nombre").fill("Refresco de prueba");
  await page.getByLabel("Precio de venta").fill("20");
  // El código real de la Coca-Cola 1.5 lt del catálogo, con ceros delante:
  // la identidad es la clave, no el texto.
  await page.getByLabel("Código de barras").fill("007501829644183");

  await expect(page.getByText(/Ese código ya está en uso/i)).toBeVisible();
  await expect(page.getByText(/ceros de la izquierda/i)).toBeVisible();
});

test("sin costo avisa que el margen no se puede calcular", async ({ page }) => {
  await page.getByRole("tab", { name: /Sube tu inventario/ }).click();
  await page.getByLabel("Nombre").fill("Producto sin costo");
  await page.getByLabel("Precio de venta").fill("30");
  await expect(page.getByText(/no se sabe/i)).toBeVisible();
});

test("un producto sin nombre no se guarda", async ({ page }) => {
  await page.getByRole("tab", { name: /Sube tu inventario/ }).click();
  await page.getByRole("button", { name: /Guardar producto/i }).click();
  await expect(page.getByText(/necesita un nombre/i)).toBeVisible();
});
