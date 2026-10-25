import { defineConfig } from "vitest/config";
import path from "node:path";

/*
  Dos suites que no se pisan:

    npm test  → vitest, la lógica pura (`*.test.ts`)
    npm run e2e → playwright, el navegador de verdad (`e2e/*.spec.ts`)

  Sin excluir `e2e/`, vitest recoge los `.spec.ts` de Playwright, falla al
  importar `@playwright/test` fuera de su runner y deja la suite en rojo por
  un motivo que no tiene nada que ver con el código.
*/
export default defineConfig({
  test: {
    include: ["lib/**/*.test.ts", "components/**/*.test.ts"],
    exclude: ["node_modules", ".next", "e2e"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
