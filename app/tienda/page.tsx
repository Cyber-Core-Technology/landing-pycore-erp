import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TiendaPageContent } from "@/components/pages/TiendaPageContent";

export const metadata: Metadata = {
  title: "Tienda en Línea — PyCore ERP",
  description: "Lanza tu tienda en línea conectada en tiempo real con tu inventario. Sin doble captura, sin desincronía de stock. Integración con Mercado Pago incluida.",
};

export default function TiendaPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <TiendaPageContent />
      </main>
      <Footer />
    </>
  );
}
