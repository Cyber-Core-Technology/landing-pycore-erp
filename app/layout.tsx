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
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PyCore ERP — El núcleo de tu negocio",
  description:
    "ERP modular para PyMEs mexicanas. Ventas, inventario, finanzas y tienda en línea en un solo sistema.",
  openGraph: {
    title: "PyCore ERP",
    description: "El núcleo de tu negocio",
    locale: "es_MX",
    type: "website",
  },
  other: {
    "theme-color": "#0E7C66",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
