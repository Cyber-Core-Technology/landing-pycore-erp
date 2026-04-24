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

  experimental: {
    // Optimiza el bundle de paquetes del servidor
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
