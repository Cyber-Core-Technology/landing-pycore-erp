import { defineConfig, devices } from "@playwright/test";

/*
  Las pruebas de punta a punta corren contra el build de producción, no
  contra `next dev`: en dev el primer acceso a cada ruta compila, y una
  prueba que a veces tarda cuatro segundos y a veces cuarenta es una prueba
  que se acaba ignorando.

  Dos tamaños, porque el responsive no se comprueba mirando: un teléfono de
  390 px y un escritorio de 1440. Lo que falla en uno casi nunca falla en el
  otro.
*/
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],

  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
  },

  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "telefono", use: { ...devices["Pixel 5"] } },
  ],

  webServer: {
    // Arranca el build de pruebas, no el de quien está trabajando.
    command: "NEXT_DIST_DIR=${NEXT_DIST_DIR:-.next-pruebas} npx next start -p 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
