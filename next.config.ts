import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Compresión gzip/br de respuestas
  compress: true,

  // Optimización de imágenes
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },

  // Cabeceras HTTP para assets estáticos y seguridad
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
      {
        // Assets estáticos: caché agresiva (Next los versionea con hash)
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
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
