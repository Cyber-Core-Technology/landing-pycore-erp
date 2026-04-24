import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { DemoModalProvider } from "@/lib/demo-context";
import { DemoModal } from "@/components/ui/DemoModal";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
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
    default:  "PyCore ERP — El núcleo de tu negocio",
    template: "%s · PyCore ERP",
  },
  description:
    "ERP modular en la nube para PyMEs mexicanas. Ventas, inventario, finanzas, facturación CFDI y tienda en línea conectados en un solo sistema.",
  keywords: [
    "ERP México", "sistema ERP PyME", "software administrativo México",
    "facturación CFDI", "control de inventario", "punto de venta POS",
    "tienda en línea México", "PyCore ERP", "TEZCA IA", "ERP en la nube",
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
    siteName:    "PyCore ERP",
    title:       "PyCore ERP — El núcleo de tu negocio",
    description: "ERP modular en la nube para PyMEs mexicanas. Ventas, inventario, finanzas, facturación CFDI y tienda en línea en un solo sistema.",
    locale:      "es_MX",
    images: [
      {
        url:    "/web-app-manifest-512x512.png",
        width:  512,
        height: 512,
        alt:    "PyCore ERP",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "PyCore ERP — El núcleo de tu negocio",
    description: "ERP modular en la nube para PyMEs mexicanas.",
    images:      ["/web-app-manifest-512x512.png"],
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
      name:               "PyCore ERP",
      url:                SITE_URL,
      description:        "ERP modular en la nube para PyMEs mexicanas. Ventas, inventario, finanzas, facturación CFDI y tienda en línea en un solo sistema.",
      applicationCategory: "BusinessApplication",
      operatingSystem:    "Web",
      offers: {
        "@type":     "AggregateOffer",
        priceCurrency: "MXN",
        lowPrice:    "499",
        highPrice:   "1099",
        offerCount:  "4",
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-MX",
      featureList: [
        "Inventario en tiempo real",
        "Ventas y Punto de Venta (POS) offline",
        "Facturación CFDI integrada con SAT",
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
      name:          "PyCore ERP",
      publisher:     { "@id": `${SITE_URL}/#organization` },
      inLanguage:    "es-MX",
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
          </DemoModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
