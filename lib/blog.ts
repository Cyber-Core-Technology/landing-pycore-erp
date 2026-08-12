// ─── Blog ─────────────────────────────────────────────────────────────────────
// Los artículos viven aquí como datos tipados: agregar un post es agregar un
// objeto a POSTS. No hay CMS ni dependencias externas.

export type Block =
  | { type: "p";       text: string }
  | { type: "h2";      text: string }
  | { type: "h3";      text: string }
  | { type: "ul";      items: string[] }
  | { type: "ol";      items: string[] }
  | { type: "quote";   text: string; author?: string }
  | { type: "callout"; icon: string; title: string; text: string };

export type Category = "Gestión" | "Inventario" | "Ventas" | "Fiscal" | "IA";

export interface Post {
  slug:      string;
  title:     string;
  excerpt:   string;
  /** ISO (YYYY-MM-DD) */
  date:      string;
  author:    string;
  category:  Category;
  tags:      string[];
  /** Emoji de portada — el sitio no usa imágenes por artículo */
  emoji:     string;
  content:   Block[];
}

export const CATEGORIES: Category[] = ["Gestión", "Inventario", "Ventas", "Fiscal", "IA"];

export const POSTS: Post[] = [
  {
    slug:     "senales-de-que-tu-negocio-necesita-un-erp",
    title:    "5 señales de que tu negocio ya necesita un ERP",
    excerpt:  "Si cierras el mes con una hoja de cálculo y tres cuadernos, el problema no es el orden: es que tu operación ya creció más que tus herramientas.",
    date:     "2026-07-22",
    author:   "Equipo PyCore",
    category: "Gestión",
    tags:     ["ERP", "PyME", "productividad"],
    emoji:    "🚦",
    content: [
      { type: "p", text: "Casi ningún negocio decide un martes que necesita un ERP. Lo que pasa es más lento: primero era un cuaderno, luego una hoja de cálculo, después dos hojas de cálculo que nadie sabe cuál es la buena. Un día te das cuenta de que dedicas más tiempo a cuadrar números que a vender." },
      { type: "p", text: "Estas son las cinco señales que vemos con más frecuencia en PyMEs mexicanas. Si reconoces tres o más, el costo de **no** tener un sistema ya es mayor que el de tenerlo." },

      { type: "h2", text: "1. Nadie sabe cuánto inventario tienes realmente" },
      { type: "p", text: "La prueba es simple: pregunta cuántas piezas hay de tu producto más vendido. Si la respuesta es \"déjame checar en el almacén\", tu inventario no es un dato, es una suposición." },
      { type: "p", text: "El costo no es la incertidumbre: es lo que provoca. Compras de más porque no confías en el número, o vendes algo que ya no tienes y quedas mal con el cliente." },

      { type: "h2", text: "2. Cerrar el mes te toma días, no horas" },
      { type: "p", text: "Si el cierre mensual implica juntar ventas de un archivo, gastos de otro, y pedirle al contador que reconstruya lo que falta, no estás cerrando el mes: estás haciendo arqueología." },
      { type: "callout", icon: "⏱", title: "Cuenta las horas", text: "Multiplica las horas que dedicas al cierre por el costo de esa hora. Ese número es lo que estás pagando hoy por no tener los datos en un solo lugar." },

      { type: "h2", text: "3. Capturas la misma información dos o tres veces" },
      { type: "p", text: "Una venta que se anota en el POS, luego en la hoja de inventario, y otra vez en el control de cobranza. Cada captura extra es una oportunidad de error y un rato que nadie te paga." },
      { type: "p", text: "La doble captura casi siempre es la señal más clara: significa que tus herramientas no se hablan entre ellas." },

      { type: "h2", text: "4. Dependes de una persona para saber cómo va el negocio" },
      { type: "p", text: "Si hay alguien que \"sabe dónde está todo\" y sus vacaciones son un riesgo operativo, el conocimiento de tu negocio vive en una cabeza, no en un sistema. Eso es frágil y no escala." },

      { type: "h2", text: "5. Abriste (o quieres abrir) una segunda sucursal" },
      { type: "p", text: "Una sucursal se puede administrar con disciplina y buena memoria. Dos ya no. Necesitas comparar, traspasar producto entre ellas y saber cuál está dejando margen y cuál está consumiendo caja." },
      { type: "quote", text: "El segundo local no duplica el trabajo administrativo: lo multiplica, porque ahora también tienes que conciliar entre los dos.", author: "Un cliente, después de abrir su segunda tienda" },

      { type: "h2", text: "¿Y si todavía no es el momento?" },
      { type: "p", text: "También es una respuesta válida. Si vendes poco volumen, tienes un solo punto de venta y tu inventario cabe en una repisa, una hoja de cálculo bien hecha es suficiente. Un ERP resuelve problemas de coordinación; si no tienes ese problema, no lo compres todavía." },
      { type: "p", text: "La pregunta correcta no es \"¿ya soy suficientemente grande?\", sino \"¿cuánto me cuesta hoy la falta de información?\"." },

      { type: "h2", text: "Qué buscar cuando decidas" },
      { type: "ul", items: [
        "Que puedas empezar con lo que necesitas y activar módulos después, sin migrar de sistema.",
        "Que resuelva el manejo fiscal mexicano de fábrica (IVA, IEPS, retenciones), no como parche.",
        "Que el punto de venta funcione sin internet: la conexión se cae, las ventas no pueden parar.",
        "Que el inventario sea la única fuente de verdad para POS, tienda en línea y reportes.",
        "Que no te amarre con contratos de permanencia ni costos de migración.",
      ] },
      { type: "p", text: "PyCore SGC está construido con esos cinco criterios como punto de partida. Si quieres ver cómo se aplican a tu caso, agenda una demo y lo revisamos con tu operación real, no con datos de ejemplo." },
    ],
  },

  {
    slug:     "inventario-sin-fugas",
    title:    "Inventario sin fugas: cómo dejar de perder dinero en stock",
    excerpt:  "El dinero que pierdes en inventario casi nunca es robo. Es merma silenciosa, stock detenido y capital dormido en el almacén.",
    date:     "2026-07-08",
    author:   "Equipo PyCore",
    category: "Inventario",
    tags:     ["inventario", "merma", "capital de trabajo"],
    emoji:    "📦",
    content: [
      { type: "p", text: "Cuando un negocio pierde dinero en inventario, la primera sospecha suele ser el robo. En la práctica, la mayor parte de la fuga viene de tres lugares mucho más aburridos: producto que se venció, producto que nunca se movió y producto que se vendió mal capturado." },

      { type: "h2", text: "Fuga 1: capital dormido" },
      { type: "p", text: "Cada pieza en tu almacén es dinero que ya pagaste y todavía no recuperas. Si tienes 200 mil pesos en stock y una tercera parte no se ha movido en seis meses, tienes ~66 mil pesos congelados que podrían estar comprando lo que sí rota." },
      { type: "p", text: "La métrica que importa aquí es la **rotación**: cuántas veces vendes y reemplazas tu inventario en un periodo. Un número bajo no siempre es malo (hay giros que requieren surtido amplio), pero no medirlo sí lo es." },
      { type: "callout", icon: "🔍", title: "Ejercicio de 10 minutos", text: "Saca la lista de productos sin ninguna venta en los últimos 90 días y súmale el costo. Ese es tu capital dormido. Casi siempre sorprende." },

      { type: "h2", text: "Fuga 2: la diferencia entre stock total, reservado y disponible" },
      { type: "p", text: "Tres números distintos que muchos sistemas mezclan en uno:" },
      { type: "ul", items: [
        "**Stock total**: lo que físicamente está en el almacén.",
        "**Reservado**: lo que ya está comprometido en un pedido pendiente de entregar.",
        "**Disponible**: lo que realmente puedes vender hoy (total menos reservado).",
      ] },
      { type: "p", text: "Si tu sistema solo maneja \"stock\", tarde o temprano vas a vender algo que ya estaba comprometido. Eso no es un error de captura: es un problema de modelo de datos." },

      { type: "h2", text: "Fuga 3: mínimos que nadie vigila" },
      { type: "p", text: "El punto de reorden existe para que no te enteres de que se acabó algo cuando el cliente ya está en el mostrador. Pero un mínimo escrito en una hoja no sirve de nada si nadie lo revisa a diario." },
      { type: "p", text: "La diferencia entre un mínimo útil y uno decorativo es que el primero te avisa solo. Alertas automáticas por sucursal, con umbral por producto, cambian el trabajo de \"revisar todo\" a \"atender lo que ya sonó\"." },

      { type: "h2", text: "Variantes: el detalle que rompe los inventarios" },
      { type: "p", text: "Tallas, colores, sabores, presentaciones. Si manejas variantes y tu sistema solo tiene un SKU por producto, tu inventario es ficción: sabes que tienes 40 camisetas, pero no que 38 son talla XS." },
      { type: "p", text: "Cada variante necesita su propio SKU, su propio stock y su propio mínimo. Es más trabajo al dar de alta el catálogo y menos trabajo todos los días después." },

      { type: "h2", text: "El conteo físico no tiene que ser un evento" },
      { type: "p", text: "El inventario físico anual, con la tienda cerrada y todo el equipo contando de noche, es una herencia de cuando contar requería papel. Con conteo por ciclos (unas cuantas categorías por semana, escaneando con el celular) mantienes la exactitud sin parar la operación." },
      { type: "ol", items: [
        "Divide el catálogo en grupos por rotación o valor.",
        "Programa un grupo por semana: los de más valor, más seguido.",
        "Registra la diferencia y ajusta con motivo documentado (merma, error de captura, traspaso no registrado).",
        "Revisa los motivos al mes: ahí está el patrón que te está costando dinero.",
      ] },

      { type: "h2", text: "Lo que cambia con inventario en tiempo real" },
      { type: "p", text: "Cuando el ERP es la única fuente de verdad, una venta en el POS descuenta stock al instante, la tienda en línea deja de ofrecer lo que ya no hay, y el reporte de valor de inventario deja de ser una foto vieja." },
      { type: "p", text: "En PyCore SGC el inventario alimenta ventas, compras, tienda en línea y finanzas desde el mismo dato. Si quieres ver cómo se vería con tu catálogo, pide una demo." },
    ],
  },

  {
    slug:     "pos-offline-por-que-importa",
    title:    "POS offline: por qué tu punto de venta debe funcionar sin internet",
    excerpt:  "La conexión se cae. La pregunta no es si va a pasar, sino qué hace tu caja cuando pasa: cobra o se detiene.",
    date:     "2026-06-24",
    author:   "Equipo PyCore",
    category: "Ventas",
    tags:     ["POS", "ventas", "offline"],
    emoji:    "📶",
    content: [
      { type: "p", text: "Un punto de venta que necesita internet para cobrar tiene un solo punto de falla, y no está en tu control. Basta un corte de fibra en la colonia, un módem recalentado o un evento con la red saturada para que tu caja se convierta en un mostrador decorativo." },
      { type: "p", text: "En un fin de semana pesado, una hora sin cobrar no es una hora de ventas perdidas: es la fila que se va y no regresa." },

      { type: "h2", text: "Qué significa \"offline\" de verdad" },
      { type: "p", text: "Hay tres niveles y conviene distinguirlos antes de creerle a un demo:" },
      { type: "ol", items: [
        "**Solo lectura**: puedes consultar precios pero no cobrar. Sirve de poco.",
        "**Captura local**: registras la venta en el dispositivo y la subes después. Ya es útil.",
        "**Operación completa con resolución de conflictos**: cobras, descuentas stock localmente, y al reconectar el sistema sincroniza y te avisa si algo choca. Esto es lo que necesitas.",
      ] },

      { type: "h2", text: "El problema difícil no es guardar: es reconciliar" },
      { type: "p", text: "Guardar una venta en el navegador es fácil. Lo complicado pasa después: dos cajas vendieron la misma última pieza mientras estaban desconectadas. ¿Quién se queda con ella?" },
      { type: "p", text: "Un POS offline serio no oculta ese conflicto ni lo resuelve en silencio. Lo detecta al sincronizar, deja las dos ventas registradas, marca la diferencia de stock y te la presenta para que decidas. La trazabilidad importa más que la magia." },
      { type: "callout", icon: "⚠️", title: "Pregunta clave en una demo", text: "\"¿Qué pasa si dos terminales venden la misma última pieza sin conexión?\" Si la respuesta es vaga, el modo offline probablemente es solo un letrero." },

      { type: "h2", text: "Lo que sí debe seguir funcionando sin red" },
      { type: "ul", items: [
        "Búsqueda por nombre, SKU y código de barras sobre el catálogo cacheado.",
        "Cobro con varios métodos de pago en un mismo ticket.",
        "Descuentos por línea y por venta, con las reglas vigentes.",
        "Impresión del ticket y registro del folio.",
        "Corte de caja del turno con lo capturado localmente.",
      ] },
      { type: "p", text: "Lo que razonablemente no funciona sin conexión: cobros con tarjeta que requieren autorización del banco, timbrado fiscal en línea y consulta de datos de otras sucursales. Eso se resuelve al reconectar." },

      { type: "h2", text: "Cómo probarlo antes de comprar" },
      { type: "p", text: "No aceptes la respuesta teórica. En la demo, pide que apaguen el WiFi del dispositivo y hagan tres ventas: una en efectivo, una con descuento y una con producto de stock bajo. Luego reconecta y revisa que las tres aparezcan en el ERP con su folio, su descuento y el stock correcto." },
      { type: "p", text: "Cinco minutos de esa prueba dicen más que una hora de presentación." },

      { type: "h2", text: "En PyCore" },
      { type: "p", text: "El módulo de Ventas y POS de PyCore SGC guarda las ventas localmente cuando no hay red, sincroniza al reconectar y marca los conflictos en lugar de resolverlos a ciegas. Está incluido desde el plan Básico. Si quieres hacerle la prueba del WiFi apagado, agenda una demo." },
    ],
  },

  {
    slug:     "iva-ieps-y-retenciones-en-tu-sistema",
    title:    "IVA, IEPS y retenciones: lo que tu sistema debe resolver por ti",
    excerpt:  "Los impuestos mexicanos no son complicados por las tasas, sino por las combinaciones. Un sistema que los modela bien te ahorra el recálculo manual de cada mes.",
    date:     "2026-06-10",
    author:   "Equipo PyCore",
    category: "Fiscal",
    tags:     ["fiscal", "IVA", "IEPS", "México"],
    emoji:    "🧾",
    content: [
      { type: "p", text: "Si vendes en México, tu sistema no puede tratar los impuestos como un porcentaje al final del ticket. Un producto puede llevar IVA, otro IVA e IEPS, otro tasa cero, y algunos clientes te retienen. Cuando eso se calcula a mano, el error no aparece en la venta: aparece en la declaración." },
      { type: "p", text: "Este artículo es una guía operativa, no asesoría fiscal. Para tu caso concreto, valida siempre con tu contador." },

      { type: "h2", text: "El impuesto pertenece al producto, no al ticket" },
      { type: "p", text: "Es la decisión de diseño más importante. Si la tasa se configura por producto (o por categoría), el sistema puede calcular cualquier combinación de una venta sin que nadie intervenga. Si se configura al momento de cobrar, dependes de que el cajero recuerde la regla." },
      { type: "callout", icon: "🔁", title: "Prueba de un cambio de tasa", text: "Si mañana cambia una tasa, ¿lo actualizas en un solo lugar y se refleja en todo el catálogo, o hay que editar producto por producto? La respuesta define cuánto trabajo te va a costar cada ajuste." },

      { type: "h2", text: "IEPS: el que rompe las hojas de cálculo" },
      { type: "p", text: "El IEPS aplica a giros específicos —bebidas azucaradas, alcohol, tabaco, combustibles, entre otros— y convive con el IVA. El orden de aplicación importa: en varios casos el IVA se calcula sobre una base que ya incluye el IEPS." },
      { type: "p", text: "Hacer eso a mano en una hoja de cálculo funciona hasta que tienes 300 SKUs y tres tasas distintas. Ahí es donde empiezan las diferencias de centavos que después nadie puede explicar." },

      { type: "h2", text: "Retenciones: cuando tu cliente retiene parte del impuesto" },
      { type: "p", text: "En ciertas operaciones entre empresas, el comprador retiene una parte del IVA (y a veces del IEPS) y lo entera directamente. Para ti significa que cobras menos de lo que facturas, con un comprobante que debe cuadrar." },
      { type: "p", text: "Un sistema que maneja retenciones bien hace tres cosas:" },
      { type: "ul", items: [
        "Guarda la configuración de retención en el cliente, no en cada venta.",
        "Refleja el monto retenido en el comprobante y en la cuenta por cobrar.",
        "Deja rastro para que la conciliación del mes no sea una investigación.",
      ] },

      { type: "h2", text: "Lo que debe quedar en el registro de cada venta" },
      { type: "ol", items: [
        "Base gravable por línea, no solo el total.",
        "Impuesto desglosado por tipo y tasa (IVA trasladado, IEPS, retenciones).",
        "Quién capturó la venta y cuándo, para auditoría.",
        "El descuento aplicado antes de impuestos, con su motivo.",
      ] },
      { type: "p", text: "Con eso, el reporte fiscal del mes se genera; sin eso, se reconstruye. La diferencia entre esos dos verbos son días de trabajo." },

      { type: "h2", text: "Checklist para evaluar un sistema" },
      { type: "ul", items: [
        "¿Puedo definir tasas de impuesto y asignarlas por producto o categoría?",
        "¿Soporta IEPS junto con IVA, respetando el orden de aplicación?",
        "¿Configuro retenciones a nivel cliente?",
        "¿El desglose queda por línea y se exporta para el contador?",
        "¿Un cambio de tasa se hace una vez y aplica en todo el catálogo?",
      ] },
      { type: "p", text: "PyCore SGC modela impuestos en el módulo de Catálogos: defines la tasa una vez, la asignas al producto y el cálculo viaja solo a ventas, compras, tienda en línea y reportes. Si tu giro maneja IEPS o retenciones, en la demo lo revisamos con tus productos reales." },
    ],
  },

  {
    slug:     "ia-en-negocios-pequenos",
    title:    "Cómo usar IA en un negocio pequeño (sin ser experto en tecnología)",
    excerpt:  "La IA útil en una PyME no escribe poemas: te avisa que un cliente lleva doce días sin pagar y que tu producto estrella está por agotarse.",
    date:     "2026-05-27",
    author:   "Equipo PyCore",
    category: "IA",
    tags:     ["IA", "TEZCA", "analítica"],
    emoji:    "🤖",
    content: [
      { type: "p", text: "Hay dos conversaciones muy distintas sobre inteligencia artificial. Una es sobre el futuro del trabajo. La otra, mucho más aburrida y mucho más útil, es sobre quién revisa tus cuentas por cobrar los lunes a las 8 de la mañana." },
      { type: "p", text: "Para un negocio de 5 a 50 empleados, la IA que vale la pena es la segunda." },

      { type: "h2", text: "El problema real no es analizar: es notar" },
      { type: "p", text: "La mayoría de las PyMEs ya tiene los datos. Lo que no tiene es a alguien mirándolos todo el tiempo. El margen que se cayó dos puntos, el cliente que se atrasó, el producto que dejó de venderse: todo estaba en el sistema, nadie lo vio a tiempo." },
      { type: "p", text: "Ahí es donde un asistente con acceso a tus datos cambia algo concreto. No necesita ser brillante. Necesita ser constante." },
      { type: "quote", text: "Un reporte te dice qué pasó. Un buen asistente te dice qué hacer al respecto, hoy." },

      { type: "h2", text: "Tres usos que sí pagan su costo" },
      { type: "h3", text: "1. Alertas con contexto" },
      { type: "p", text: "\"Stock bajo\" es un dato. \"El producto X está al 15% y en las últimas dos semanas vendió 40 piezas: se te acaba el jueves\" es una decisión. La diferencia es que la segunda ya cruzó inventario con ritmo de venta." },
      { type: "h3", text: "2. Preguntas en lenguaje normal" },
      { type: "p", text: "No todos en tu equipo van a aprender a construir un reporte. Casi todos pueden escribir \"¿qué cliente me debe más y desde cuándo?\". Que el sistema responda eso con tus datos reales elimina el cuello de botella de \"pídeselo al que sabe\"." },
      { type: "h3", text: "3. Trabajo repetitivo de catálogo" },
      { type: "p", text: "Descripciones de producto, imágenes para la tienda en línea, categorización de gastos. Tareas que nadie quiere hacer y que no requieren criterio experto. Es el uso menos glamoroso y suele ser el que más horas libera." },

      { type: "h2", text: "Qué exigirle a la IA de tu sistema" },
      { type: "ul", items: [
        "**Que use tus datos, no datos generales.** Si no está conectada a tu inventario y tus ventas, es un chat cualquiera.",
        "**Que respete permisos.** Nadie debería ver por chat lo que no puede ver en el módulo.",
        "**Que muestre de dónde salió la respuesta.** Un número sin origen no se puede auditar ni defender.",
        "**Que sugiera una acción.** Un insight sin siguiente paso es trivia.",
        "**Que no requiera configuración.** Si necesitas un consultor para prenderla, el costo real es otro.",
      ] },
      { type: "callout", icon: "🎯", title: "Empieza por una sola pregunta", text: "Elige la pregunta que hoy alguien contesta a mano cada semana. Si el asistente la responde bien y en segundos, ya recuperaste el tiempo. Escala desde ahí." },

      { type: "h2", text: "Lo que no va a hacer" },
      { type: "p", text: "No va a decidir por ti si abres una sucursal, no conoce el contexto de tu calle y no sustituye a tu contador. Tampoco arregla datos malos: si tu inventario está mal capturado, la IA va a explicar con mucha confianza un número equivocado." },
      { type: "p", text: "Los datos limpios son el prerrequisito. Por eso ordenar la operación viene primero, y la capa de IA después." },

      { type: "h2", text: "TEZCA, en concreto" },
      { type: "p", text: "TEZCA es el asistente integrado en PyCore SGC. Analiza tu operación cada hora en segundo plano, genera alertas de stock y cobranza, responde preguntas con tus datos reales y sugiere una acción con cada insight. Está disponible desde el plan Profesional." },
      { type: "p", text: "Si quieres verlo respondiendo sobre tu propio negocio en vez de un demo genérico, agenda una sesión." },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Posts del más reciente al más antiguo. */
export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Misma categoría primero, luego los más recientes, hasta `limit`. */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const post = getPostBySlug(slug);
  if (!post) return [];

  const others = getAllPosts().filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest         = others.filter((p) => p.category !== post.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

const WORDS_PER_MINUTE = 200;

export function readingMinutes(post: Post): number {
  const words = post.content.reduce((acc, b) => {
    const text =
      b.type === "ul" || b.type === "ol" ? b.items.join(" ")
      : b.type === "callout"             ? `${b.title} ${b.text}`
      : b.text;
    return acc + text.trim().split(/\s+/).length;
  }, 0);

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Versión de un post sin el cuerpo del artículo, con los minutos de lectura ya
 * calculados. Es lo que se pasa a los componentes de cliente (tarjetas, filtro)
 * para no enviar el contenido completo de todos los artículos al navegador.
 */
export type PostSummary = Omit<Post, "content"> & { minutes: number };

export function toSummary(post: Post): PostSummary {
  const { content, ...rest } = post;
  return { ...rest, minutes: readingMinutes({ ...rest, content }) };
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-MX", {
    day:      "numeric",
    month:    "long",
    year:     "numeric",
    timeZone: "UTC",
  });
}
