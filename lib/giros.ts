/*
  Los doce giros, con lo que cada uno enseña y ningún otro.

  No son doce descripciones genéricas con el nombre cambiado: cada entrada
  sale del perfil real de `apps/core/demos/perfiles/*.py` del ERP, que es el
  que siembra ese negocio con 18 meses de operación. Si aquí dijera «control
  total de tu inventario» doce veces, no serviría para nada — lo que hace que
  alguien se reconozca es leer **su** problema, no el genérico.

  La regla de este archivo es la de `capacidades.ts`: si no se puede contar
  con un caso concreto, no entra.
*/

export type Giro = {
  slug: string;
  nombre: string;
  /** Cómo se llama el negocio en el demo sembrado. */
  ejemplo: string;
  icon: string;
  /** La frase que hace que alguien se reconozca. */
  gancho: string;
  /** Lo que ese giro necesita y casi ningún sistema resuelve. */
  detalle: string;
  /** Las piezas del sistema que ese giro de verdad usa. */
  claves: string[];
};

export const GIROS: Giro[] = [
  {
    slug: "abarrotes",
    nombre: "Abarrotes y minisúper",
    ejemplo: "Abarrotes La Estrella",
    icon: "store",
    gancho: "Vendes barato y muchas veces, y tienes más de una tienda.",
    detalle:
      "Stock, ventas y compras separados por sucursal, mayoreo contra menudeo, y el volumen de tickets de un negocio que cobra cada dos minutos. El cigarro suelto, la cajetilla y el cartón son un producto, no tres.",
    claves: ["Multi-sucursal", "Presentaciones", "Precio de mayoreo", "Tienda en línea"],
  },
  {
    slug: "carniceria",
    nombre: "Carnicería y pollería",
    ejemplo: "Carnicería Don Beto",
    icon: "scale",
    gancho: "Casi nada se vende por pieza: todo son kilos y fracciones.",
    detalle:
      "La venta por peso llevada al extremo — se captura en gramos, que es lo que marca la báscula. El corte primario se compra en canal y se despieza, los precios se mueven con el mercado, y la merma es parte del negocio, no un accidente.",
    claves: ["Venta por peso", "Despiece", "Merma", "Rotación alta"],
  },
  {
    slug: "restaurante",
    nombre: "Restaurante y fonda",
    ejemplo: "La Cocina de Rulo",
    icon: "basket",
    gancho: "La mesa, la comanda y lo que sale de la cocina son lo mismo.",
    detalle:
      "Se compra kilo de pollo, se abre una mesa, se piden enchiladas y la receta descuenta el pollo y la tortilla. El costo del platillo no está tecleado: sale de lo que costaron sus insumos ese día.",
    claves: ["Mesas", "Recetas", "Producción por lote", "Merma de cocina"],
  },
  {
    slug: "panaderia",
    nombre: "Panadería",
    ejemplo: "Panadería La Espiga",
    icon: "bread",
    gancho: "Horneas de madrugada y lo que no se vende es merma.",
    detalle:
      "Producción diaria en serio: cada lote sale de harina, levadura y manteca, y el costo del pan se recalcula con lo que costó el bulto de harina esa semana. Dos turnos de producción y la vida de anaquel más corta del conjunto.",
    claves: ["Órdenes de producción", "Recetas", "Costo recalculado", "Dos turnos"],
  },
  {
    slug: "farmacia",
    nombre: "Farmacia",
    ejemplo: "Farmacia San Rafael",
    icon: "shield",
    gancho: "Dos tasas de IVA conviviendo en el mismo ticket.",
    detalle:
      "La medicina de patente va a tasa 0% y la perfumería, los suplementos y el material de curación al 16%. El desglose de impuestos es el más delicado de todos, y encima hay convenios con crédito corporativo y consultorio adjunto.",
    claves: ["Tasa 0% y 16%", "Crédito corporativo", "Consultorio", "Catálogo grande"],
  },
  {
    slug: "ropa",
    nombre: "Ropa y calzado",
    ejemplo: "Boutique Amaranta",
    icon: "bag",
    gancho: "El mismo modelo en seis tallas y cuatro colores.",
    detalle:
      "Variantes de verdad: cada combinación de talla y color tiene su propio código y su propia existencia. Vender la roja no toca a la azul, y el reporte te dice cuál talla se te quedó.",
    claves: ["Variantes", "Stock por combinación", "Tienda en línea", "Temporadas"],
  },
  {
    slug: "ferreteria",
    nombre: "Ferretería y materiales",
    ejemplo: "Ferretería El Tornillo",
    icon: "gear",
    gancho: "Mil claves, y muchas casi idénticas entre sí.",
    detalle:
      "El catálogo más grande del conjunto, que es justamente el problema de una ferretería real: distinguir el tornillo de los otros nueve tornillos parecidos. Venta por metro y por kilo, y cartera pesada porque la constructora paga cuando cobra la obra.",
    claves: ["Catálogo grande", "Venta por metro", "Cuentas por cobrar", "Crédito a obra"],
  },
  {
    slug: "billar",
    nombre: "Billar y bar",
    ejemplo: "Billar & Bar El Ocho",
    icon: "clock",
    gancho: "La mesa corre con un reloj y encima se le cargan las cervezas.",
    detalle:
      "Cobro por tiempo puro, con bloque de media hora, tolerancia de cinco minutos y pausas que no se cobran. La cuenta final es tiempo más consumo, y el tablero de mesas ocupadas es la pantalla que mejor se ve del sistema.",
    claves: ["Cobro por tiempo", "Tablero de mesas", "Consumo sobre la mesa", "Horario nocturno"],
  },
  {
    slug: "estetica",
    nombre: "Estética y spa",
    ejemplo: "Estética Bella Vita",
    icon: "sparkle",
    gancho: "El servicio es de precio fijo y el producto es el complemento.",
    detalle:
      "Un ingreso que no depende del reloj sino de la estación ocupada, con clientela recurrente y con nombre —aquí casi nadie es «público en general»—. El producto profesional que se gasta dentro del servicio descuenta del mismo almacén que el mostrador.",
    claves: ["Servicios de precio fijo", "Estaciones", "Clientes con nombre", "Retail"],
  },
  {
    slug: "taller",
    nombre: "Taller mecánico",
    ejemplo: "Taller Mecánico Ruiz",
    icon: "gear",
    gancho: "Mano de obra y refacción, en el mismo ticket.",
    detalle:
      "La hora de taller es un servicio medido por reloj sobre una bahía; las balatas y el aceite son producto con existencia. La orden de servicio termina siendo una sola venta con las dos cosas, que es exactamente el problema de facturación de un taller.",
    claves: ["Mano de obra por hora", "Bahías", "Refacciones", "Orden de servicio"],
  },
  {
    slug: "gimnasio",
    nombre: "Gimnasio",
    ejemplo: "Gimnasio Titán Fitness",
    icon: "trophy",
    gancho: "Tu ingreso es recurrente, y tu problema es la morosidad.",
    detalle:
      "La membresía se vende a crédito y genera cartera que se cobra cada mes, así que aquí la cuenta por cobrar es el tema principal y no un accesorio. El padrón de clientes es el más grande del conjunto porque cada socio tiene nombre.",
    claves: ["Membresías", "Cartera mensual", "Morosidad", "Suplementos"],
  },
  {
    slug: "papeleria",
    nombre: "Papelería y copias",
    ejemplo: "Papelería Cuadrícula",
    icon: "sheet",
    gancho: "En agosto vendes cuatro veces lo de junio.",
    detalle:
      "Estacionalidad extrema, que es la razón por la que un reporte mensual plano engaña y hay que comparar contra el mismo mes del año anterior. Corre en plan Básico a propósito, para ver qué se ve y qué no sin Finanzas ni RR.HH.",
    claves: ["Estacionalidad", "Comparativo anual", "Centro de copiado", "Plan Básico"],
  },
];

/*
  Lo que hay detrás de cada uno, y que conviene decir sin adornos: son
  negocios **de demostración**, sembrados con 18 meses de operación generada
  día por día. No son clientes reales con su nombre puesto, y decirlo evita
  la pregunta incómoda de «¿y ésos quiénes son?».
*/
export const NOTA_GIROS =
  "Cada giro tiene su negocio de demostración, sembrado con 18 meses de operación generada día por día: compras que suben el costo promedio, ventas que lo consumen y devoluciones que lo reponen. Son negocios de ejemplo, no clientes.";
