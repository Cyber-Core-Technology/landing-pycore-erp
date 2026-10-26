import type { Metadata } from "next";
import { COMPANY_NAME, COMPANY_URL, DEVELOPER_NAME, DEVELOPER_PERFIL, DEVELOPER_URL, REPO_URL, SOCIAL_LINKS } from "./constants";

/*
  Los metadatos de cada página, de una sola fuente.

  Estaban escritos a mano página por página y ya habían divergido: unas
  llevaban `twitter`, otras no; unas repetían la imagen con su `alt`, otras
  la omitían; el `canonical` se construía a mano cada vez. Eso no falla al
  compilar y no se ve en pantalla — se ve seis semanas después, en que una
  página no se comparte bien y otra no se indexa como debería.

  Es el mismo criterio que `billing/estados.py` del ERP: una fuente, porque
  el duplicado falla en silencio.
*/

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";

/** Las palabras que describen al producto entero; cada página suma las suyas. */
const CLAVES_BASE = [
  "ERP México",
  "ERP para PyMEs",
  "sistema de gestión empresarial",
  "punto de venta México",
  "software administrativo mexicano",
  "PyCore SGC",
];

type Opciones = {
  titulo: string;
  descripcion: string;
  ruta: string;
  /** Las propias de la página. Las comunes se añaden solas. */
  claves?: string[];
  /** Texto alternativo de la imagen al compartir. Describe la página, no la marca. */
  imagenAlt?: string;
  /** Un artículo del blog, no una página del producto. */
  tipo?: "website" | "article";
  publicado?: string;
};

/**
 * Construye los metadatos de una página.
 *
 * `title` va sin el sufijo de marca: lo pone la plantilla de `layout.tsx`
 * (`%s · PyCore SGC`). Duplicarlo aquí daría títulos con la marca dos veces,
 * que es como se desperdician los 60 caracteres que un buscador enseña.
 */
export function metadatosDe({
  titulo,
  descripcion,
  ruta,
  claves = [],
  imagenAlt,
  tipo = "website",
  publicado,
}: Opciones): Metadata {
  const url = `${SITE_URL}${ruta}`;
  const imagen = {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: imagenAlt ?? `${titulo} — PyCore SGC`,
  };

  return {
    title: titulo,
    description: descripcion,
    keywords: [...claves, ...CLAVES_BASE],
    alternates: {
      canonical: url,
      languages: { "es-MX": url },
    },
    openGraph: {
      type: tipo,
      url,
      siteName: "PyCore SGC",
      title: titulo,
      description: descripcion,
      locale: "es_MX",
      images: [imagen],
      ...(publicado ? { publishedTime: publicado } : {}),
    },
    // Sin esto, X y los clientes que leen su tarjeta caen al enlace pelado.
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: ["/og-image.png"],
      site: "@PycoreSGC",
      creator: "@PycoreSGC",
    },
  };
}

/*
  La migaja de pan estructurada.

  Es lo que hace que un buscador enseñe «pycore.app › Para tu giro» en vez de
  la URL cruda, y se escribía a mano en cada página con el riesgo de que una
  se quedara con el nombre de otra.
*/
export function migajaJsonLd(nombre: string, ruta: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: nombre, item: `${SITE_URL}${ruta}` },
    ],
  };
}

/*
  La entidad de la empresa y la del desarrollador, enlazadas.

  `sameAs` es lo que permite a un buscador unir este sitio con los perfiles
  de la marca en vez de tratarlos como seis cuentas sin relación; y
  `founder`/`employee` relacionan el producto con una persona que tiene ficha
  pública verificable. Las dos cosas construyen la entidad, que es lo que hoy
  pesa más que las palabras clave.
*/
export const ORGANIZACION_JSONLD = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY_NAME,
  url: COMPANY_URL,
  sameAs: SOCIAL_LINKS.map((s) => s.href),
  logo: { "@type": "ImageObject", url: `${SITE_URL}/Logo-Completo.png` },
};

export const DESARROLLADOR_JSONLD = {
  "@type": "Person",
  "@id": `${SITE_URL}/#developer`,
  name: DEVELOPER_NAME,
  url: DEVELOPER_PERFIL,
  jobTitle: "PyCore Lead Developer & DevOps Engineer",
  sameAs: [DEVELOPER_PERFIL, DEVELOPER_URL, REPO_URL],
  worksFor: { "@id": `${SITE_URL}/#organization` },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Autónoma del Estado de México",
  },
};

/** Envuelve bloques sueltos en el grafo que espera schema.org. */
export function grafo(...bloques: object[]) {
  return { "@context": "https://schema.org", "@graph": bloques };
}
