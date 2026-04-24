import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TEZCAPageContent } from "@/components/pages/TEZCAPageContent";

export const metadata: Metadata = {
  title: "TEZCA — Consejero de Negocios con IA · PyCore ERP",
  description: "TEZCA es el asistente de inteligencia artificial integrado en PyCore. Analiza tu negocio en tiempo real, genera alertas automáticas y te dice qué hacer con tus datos.",
};

export default function TEZCAPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <TEZCAPageContent />
      </main>
      <Footer />
    </>
  );
}
