import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  /*
    El directorio de build, configurable por entorno.

    `next build` escribe en el mismo `.next` que está usando `next dev`, así
    que verificar con el servidor de desarrollo levantado lo dejaba sirviendo
    una mezcla de dos builds: rutas en 500 intermitente, CSS que no carga y
    `Cannot find module './611.js'`. Pasó tres veces, y las tres el diagnóstico
    costó más que el arreglo.

    Con esto, `npm run verificar` construye en `.next-pruebas` y no toca el
    `.next` de quien está trabajando.
  */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // Compresión gzip/br de respuestas
  compress: true,

  // Optimización de imágenes
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },

  // Cabeceras HTTP para assets estáticos y seguridad
  /*
    `/nosotros` fue una página propia durante un rato y pudo quedar enlazada
    fuera. Ahora ese contenido vive dentro de Contacto, así que la ruta
    redirige en vez de dar 404 — y permanente, para que un buscador traslade
    lo que tuviera indexado en lugar de empezar de cero.
  */
  async redirects() {
    return [
      { source: "/nosotros", destination: "/contacto#quienes-somos", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",            value: "DENY" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      /*
        Caché agresiva de los assets **sólo en producción**.

        La premisa de `immutable` es que el nombre del archivo cambia cuando
        cambia su contenido, y eso sólo es cierto en el build: `next dev`
        sirve nombres fijos como `/_next/static/chunks/webpack.js`. Con este
        encabezado puesto en desarrollo, el navegador recibe la orden de
        guardarlo **un año sin revalidar**, así que sigue ejecutando el
        código de hace tres reinicios contra el HTML nuevo que manda el
        servidor — y lo que se ve es un error de hidratación señalando a un
        componente que ya está bien.

        Costó tres sesiones de «recarga forzada y vuelve a probar». Si el
        archivo no lleva hash, no puede ser `immutable`.
      */
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/_next/static/:path*",
              headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
              ],
            },
          ]
        : [
            {
              source: "/_next/static/:path*",
              headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
            },
          ]),
      {
        // Imágenes públicas
        source: "/(.*)\\.(png|jpg|jpeg|svg|ico|webp|avif)$",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  /*
    `optimizePackageImports` está apagado a propósito.

    Reescribe `import { motion, useScroll } from "framer-motion"` en imports
    profundos uno por uno, y en framer-motion 11 no todos los exportados
    tienen su módulo 1:1: el que no resuelve queda `undefined` en el grafo de
    webpack y lo que se ve es un «Cannot read properties of undefined
    (reading 'call')» señalando al primer componente de cliente de la página
    — un sitio que no tiene nada que ver con la causa.

    Además listaba `lucide-react`, que **no es una dependencia** de este
    proyecto: optimizar un paquete que no está instalado no ahorra nada y sí
    mete una resolución que puede fallar.

    Next 15 ya optimiza por su cuenta los paquetes que sabe tratar. Si algún
    día vuelve, que sea con una medición del bundle que lo justifique.
  */
};

export default nextConfig;
