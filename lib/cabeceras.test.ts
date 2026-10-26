import { describe, expect, it, vi, afterEach } from "vitest";

/*
  El encabezado de caché de los assets.

  Esto existe por un defecto que costó tres sesiones de «recarga forzada y
  vuelve a probar»: `/_next/static/:path*` se servía con
  `immutable, max-age=31536000` **también en desarrollo**, donde los nombres
  no llevan hash (`/_next/static/chunks/webpack.js`). El navegador recibía la
  orden de guardarlo un año sin revalidar, seguía ejecutando el código de
  hace tres reinicios contra el HTML nuevo del servidor, y lo que se veía era
  un error de hidratación señalando a un componente que ya estaba bien.

  La premisa de `immutable` es que el nombre cambia cuando cambia el
  contenido. Si el archivo no lleva hash, no puede ser `immutable`.
*/

async function cabeceraDeAssets(entorno: string) {
  vi.stubEnv("NODE_ENV", entorno);
  vi.resetModules();
  const { default: config } = await import("../next.config");
  const reglas = await config.headers!();
  const regla = reglas.find((r) => r.source === "/_next/static/:path*");
  return regla?.headers.find((h) => h.key === "Cache-Control")?.value;
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("caché de los assets estáticos", () => {
  it("en producción es inmutable: ahí los nombres llevan hash", async () => {
    expect(await cabeceraDeAssets("production")).toBe("public, max-age=31536000, immutable");
  });

  it("en desarrollo NO es inmutable: ahí los nombres son fijos", async () => {
    const v = await cabeceraDeAssets("development");
    expect(v).not.toContain("immutable");
    expect(v).toMatch(/no-store|must-revalidate/);
  });

  it("siempre hay una regla para los assets, en los dos entornos", async () => {
    expect(await cabeceraDeAssets("production")).toBeTruthy();
    expect(await cabeceraDeAssets("development")).toBeTruthy();
  });
});

describe("las cabeceras de seguridad", () => {
  it("van en todas las rutas y en los dos entornos", async () => {
    for (const entorno of ["production", "development"]) {
      vi.stubEnv("NODE_ENV", entorno);
      vi.resetModules();
      const { default: config } = await import("../next.config");
      const reglas = await config.headers!();
      const todas = reglas.find((r) => r.source === "/:path*");
      const claves = todas?.headers.map((h) => h.key) ?? [];
      expect(claves, entorno).toContain("X-Content-Type-Options");
      expect(claves, entorno).toContain("X-Frame-Options");
      expect(claves, entorno).toContain("Referrer-Policy");
    }
  });
});
