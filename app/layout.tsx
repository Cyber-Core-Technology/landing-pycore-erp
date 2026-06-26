import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { DemoModalProvider } from "@/lib/demo-context";
import { DemoModal } from "@/components/ui/DemoModal";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { MascotPopup } from "@/components/ui/MascotPopup";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false, // solo se usa en el mockup del dashboard
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  "PyCore SGC — El núcleo de tu negocio",
    template: "%s · PyCore SGC",
  },
  description:
    "ERP modular en la nube para PyMEs mexicanas. Ventas, inventario, finanzas y tienda en línea conectados en un solo sistema.",
  keywords: [
    "ERP México", "sistema ERP PyME", "software administrativo México",
    "control de inventario", "punto de venta POS",
    "tienda en línea México", "PyCore SGC", "TEZCA IA", "ERP en la nube",
  ],
  authors: [{ name: "Cyber Core Technology", url: SITE_URL }],
  creator: "Cyber Core Technology",
  publisher: "Cyber Core Technology",

  alternates: {
    canonical: SITE_URL,
    languages: { "es-MX": SITE_URL },
  },

  openGraph: {
    type:        "website",
    url:         SITE_URL,
    siteName:    "PyCore SGC",
    title:       "PyCore SGC — El núcleo de tu negocio",
    description: "ERP modular en la nube para PyMEs mexicanas. Ventas, inventario, finanzas y tienda en línea en un solo sistema.",
    locale:      "es_MX",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "PyCore SGC — El núcleo de tu negocio",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "PyCore SGC — El núcleo de tu negocio",
    description: "ERP modular en la nube para PyMEs mexicanas.",
    images:      ["/og-image.png"],
    creator:     "@pycoreerp",
  },

  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":      -1,
    },
  },

  icons: {
    icon:      [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-96x96.png", sizes: "96x96" }],
    apple:     "/apple-touch-icon.png",
    shortcut:  "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  other: {
    "theme-color":               "#0E7C66",
    "color-scheme":              "dark light",
    "msapplication-TileColor":   "#0E7C66",
  },
};

// JSON-LD: Organización + SoftwareApplication
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type":       "Organization",
      "@id":         `${SITE_URL}/#organization`,
      name:          "Cyber Core Technology",
      url:           SITE_URL,
      logo: {
        "@type": "ImageObject",
        url:     `${SITE_URL}/Logo-Completo.png`,
      },
      contactPoint: {
        "@type":       "ContactPoint",
        contactType:   "sales",
        email:         "hola@pycore.app",
        areaServed:    "MX",
        availableLanguage: "Spanish",
      },
    },
    {
      "@type":            "SoftwareApplication",
      "@id":              `${SITE_URL}/#software`,
      name:               "PyCore SGC",
      url:                SITE_URL,
      description:        "ERP modular en la nube para PyMEs mexicanas. Ventas, inventario, finanzas y tienda en línea en un solo sistema.",
      applicationCategory: "BusinessApplication",
      operatingSystem:    "Web",
      datePublished: "2024-01-01",
      offers: {
        "@type":       "AggregateOffer",
        priceCurrency: "MXN",
        lowPrice:      "999",
        highPrice:     "1999",
        offerCount:    "4",
        offers: [
          { "@type": "Offer", name: "Básico",       price: "999",  priceCurrency: "MXN", priceSpecification: { "@type": "UnitPriceSpecification", price: "999",  priceCurrency: "MXN", unitText: "MON" } },
          { "@type": "Offer", name: "Profesional",  price: "1499", priceCurrency: "MXN", priceSpecification: { "@type": "UnitPriceSpecification", price: "1499", priceCurrency: "MXN", unitText: "MON" } },
          { "@type": "Offer", name: "Empresarial",  price: "1999", priceCurrency: "MXN", priceSpecification: { "@type": "UnitPriceSpecification", price: "1999", priceCurrency: "MXN", unitText: "MON" } },
          { "@type": "Offer", name: "Elite",        priceSpecification: { "@type": "UnitPriceSpecification", description: "Precio personalizado" } },
        ],
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-MX",
      featureList: [
        "Inventario en tiempo real",
        "Ventas y Punto de Venta (POS) offline",
        "Tienda en línea con Mercado Pago",
        "Asistente de IA TEZCA",
        "Multi-sucursal",
        "Recursos Humanos",
        "Reportes y analítica",
      ],
    },
    {
      "@type":       "WebSite",
      "@id":         `${SITE_URL}/#website`,
      url:           SITE_URL,
      name:          "PyCore SGC",
      publisher:     { "@id": `${SITE_URL}/#organization` },
      inLanguage:    "es-MX",
    },
    {
      "@type": "FAQPage",
      "@id":   `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type":          "Question",
          name:             "¿Qué es PyCore SGC?",
          acceptedAnswer: {
            "@type": "Answer",
            text:    "PyCore SGC es un sistema de gestión empresarial (ERP) modular en la nube diseñado para PyMEs mexicanas. Integra inventario, ventas, finanzas, recursos humanos y tienda en línea en una sola plataforma.",
          },
        },
        {
          "@type":          "Question",
          name:             "¿Cuánto cuesta PyCore SGC?",
          acceptedAnswer: {
            "@type": "Answer",
            text:    "PyCore SGC tiene cuatro planes que se cobran por cada sucursal activa: Básico a $999 MXN/mes, Profesional a $1,499 MXN/mes y Empresarial a $1,999 MXN/mes. También existe un plan Elite con precio personalizado para cadenas y grupos empresariales. Todos los precios son más IVA y sin contratos de permanencia.",
          },
        },
        {
          "@type":          "Question",
          name:             "¿Puedo usar PyCore SGC sin conexión a internet?",
          acceptedAnswer: {
            "@type": "Answer",
            text:    "Sí. El módulo de Ventas y Punto de Venta (POS) de PyCore SGC funciona en modo offline. Las ventas se sincronizan automáticamente cuando se recupera la conexión.",
          },
        },
        {
          "@type":          "Question",
          name:             "¿PyCore SGC sirve para negocios con varias sucursales?",
          acceptedAnswer: {
            "@type": "Answer",
            text:    "Sí. PyCore SGC es multi-sucursal: se cobra por cada sucursal activa, así que puedes agregar las sucursales que necesites. Gestiona inventario, ventas y personal de cada una desde un solo panel.",
          },
        },
        {
          "@type":          "Question",
          name:             "¿Qué es TEZCA en PyCore SGC?",
          acceptedAnswer: {
            "@type": "Answer",
            text:    "TEZCA es el asistente de inteligencia artificial integrado en PyCore SGC. Analiza tu operación cada hora, genera alertas automáticas de stock bajo o cuentas vencidas, responde preguntas con tus datos reales y proporciona recomendaciones de negocio.",
          },
        },
        {
          "@type":          "Question",
          name:             "¿PyCore SGC tiene tienda en línea?",
          acceptedAnswer: {
            "@type": "Answer",
            text:    "Sí. El plan Empresarial incluye tienda en línea conectada en tiempo real con el inventario del ERP, con cobros integrados via Mercado Pago, seguimiento de pedidos y catálogo público personalizable.",
          },
        },
        {
          "@type":          "Question",
          name:             "¿Hay contrato de permanencia en PyCore SGC?",
          acceptedAnswer: {
            "@type": "Answer",
            text:    "No. PyCore SGC no tiene contratos de permanencia ni costos de migración. Puedes cambiar de plan o cancelar cuando tu negocio lo necesite.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans bg-bg text-[var(--text)]`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-[9999]"
        >
          Ir al contenido principal
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <DemoModalProvider>
            {children}
            <DemoModal />
            <ScrollToTop />
            <MascotPopup />
          </DemoModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
