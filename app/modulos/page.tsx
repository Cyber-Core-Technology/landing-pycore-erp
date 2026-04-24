import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ModulosPageContent } from "@/components/pages/ModulosPageContent";

export const metadata: Metadata = {
  title: "Módulos — PyCore ERP",
  description: "14 módulos integrados para gestionar toda la operación de tu negocio: inventario, ventas, finanzas, facturación CFDI, tienda en línea y más.",
};

export default function ModulosPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <ModulosPageContent />
      </main>
      <Footer />
    </>
  );
}
