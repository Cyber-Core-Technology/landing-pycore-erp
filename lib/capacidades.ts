/*
  Lo que el sistema hace y casi ningún folleto cuenta, porque sólo se nota
  operando.

  La regla de este archivo: **nada genérico**. «Control de inventario» no dice
  nada; «el cigarro suelto, la cajetilla y el cartón son un producto con un
  solo stock, y escanear el cartón mete 200 piezas» sí. Cada punto de aquí
  corresponde a una pieza que existe en el ERP, y está escrito con el caso
  real que la hizo necesaria — que es lo que distingue un sistema que alguien
  usó de uno que alguien imaginó.

  Si una capacidad no se puede contar con un ejemplo concreto, no entra.
*/

export type Capacidad = {
  titulo: string;
  /** El caso real, en dos o tres renglones. */
  detalle: string;
};

export type GrupoCapacidades = {
  slug: string;
  nombre: string;
  icon: string;
  /** Qué resuelve el grupo entero, en una línea. */
  resumen: string;
  items: Capacidad[];
};

export const CAPACIDADES: GrupoCapacidades[] = [
  {
    slug: "catalogo",
    nombre: "El catálogo",
    icon: "box",
    resumen:
      "Un producto casi nunca es «una cosa con un precio». El catálogo está hecho para las formas en que de verdad se vende.",
    items: [
      {
        titulo: "El mismo producto, suelto y por caja",
        detalle:
          "El estanquillo vende el cigarro suelto, por cajetilla y por cartón. Es un producto con un solo inventario, no tres: la cajetilla de 20 cuesta $100 y el suelto $8, y esos $60 de diferencia son el margen del menudeo. Escanear el cartón mete 200 piezas sin que el cajero decida nada.",
      },
      {
        titulo: "Comprar por caja y que el costo cuadre",
        detalle:
          "Una caja de 200 piezas a $1,400 entra como 200 piezas a $7, no como «1 pieza a $1,400». Es la diferencia entre un costo promedio que significa algo y uno que no.",
      },
      {
        titulo: "Extras que se cobran y descuentan",
        detalle:
          "«+ toma de proteína» sobre la malteada va en su propio renglón, con su precio, y descuenta del bote. Si dos malteadas llevan una sola proteína, es una vez, no dos.",
      },
      {
        titulo: "Recetas: lo que sale del almacén al vender",
        detalle:
          "El pan se hornea de madrugada y se vende de su charola. Las enchiladas se arman al momento y consumen sus ingredientes. El combo son productos distintos. Son tres casos distintos y el sistema los distingue — si falta algo, el error dice cuál: «quedan 3 de vainilla y se necesitan 4».",
      },
      {
        titulo: "Granel en gramos, no en kilos",
        detalle:
          "Nadie pide «0.1 de jamón»: pide 100 gramos, que es lo que marca la báscula. Y el peso y el importe se equilibran tecla por tecla en los dos sentidos: escribes $20 y te dice cuántos gramos son.",
      },
      {
        titulo: "Cada sucursal maneja lo suyo",
        detalle:
          "La del centro vende cigarros y la del norte no. Disponibilidad por sucursal, que es distinto de tener cero piezas. Quitar una sucursal no borra su historial: si vuelve, su stock y su costo siguen siendo los que eran.",
      },
      {
        titulo: "Duplicados: encontrarlos y fusionarlos",
        detalle:
          "Un minisúper llegó con 106 códigos repetidos. Dos fichas del mismo artículo parten la existencia y ninguna dice la verdad. La fusión enseña las dos lado a lado y deja elegir dato por dato — y no reescribe la historia: las ventas viejas se quedan donde están.",
      },
    ],
  },
  {
    slug: "mostrador",
    nombre: "El mostrador",
    icon: "store",
    resumen:
      "Cobrar es lo que más veces se hace al día. Todo lo demás puede esperar; esto no.",
    items: [
      {
        titulo: "Se cae el internet y se sigue cobrando",
        detalle:
          "La venta se guarda en el equipo y se manda sola al volver la señal. No es sólo el POS: entradas y ajustes de inventario, alta de clientes, compras y abonos a cuentas por cobrar también.",
      },
      {
        titulo: "Y no se cobra dos veces",
        detalle:
          "Cada operación lleva una llave única. Si la red se cae justo después de cobrar, el reintento no duplica la venta ni descuenta el stock otra vez: el servidor contesta con la que ya existía.",
      },
      {
        titulo: "Un rechazo no es un fallo de red",
        detalle:
          "Si el servidor dice que la operación está mal, deja de reintentarse y se puede ver por qué falló, reintentarla o descartarla. Lo que falla por red se queda en espera. Mezclarlos es como una venta rechazada se reintenta en silencio para siempre.",
      },
      {
        titulo: "No se puede cerrar un corte con ventas pendientes",
        detalle:
          "El efectivo esperado saldría corto y acusaría un faltante que no existe. La pantalla lo dice y ofrece mandarlas ahí mismo.",
      },
      {
        titulo: "Mesas, canchas, estaciones",
        detalle:
          "Un recurso se ocupa con una sesión, y se cobra por tiempo (billar, cancha) o fijo (mesa de restaurante, corte de pelo). El reloj corre para ver cuánto lleva ocupado el espacio, aunque no entre en la cuenta.",
      },
      {
        titulo: "Promociones que sólo aplican a quien van dirigidas",
        detalle:
          "Una oferta para doña Mary sólo se aplica si la venta va a su nombre, también con cupón. El mensaje se lo dice: pide tu compra a tu nombre.",
      },
    ],
  },
  {
    slug: "proveedores",
    nombre: "Proveedores",
    icon: "cart",
    resumen:
      "Lo que llega del proveedor viene en su formato, no en el tuyo. Esa traducción es el trabajo.",
    items: [
      {
        titulo: "La lista de precios en PDF, leída con IA",
        detalle:
          "El distribuidor manda un PDF de cuatro páginas con 141 productos. Se sube, se lee página por página —y se dice cuántos renglones trajo cada una, para cuadrarlo contra la hoja impresa— y se convierte en productos con su clave, su precio y su empaque.",
      },
      {
        titulo: "La segunda vez es gratis",
        detalle:
          "La correspondencia entre la clave del proveedor y tu producto queda guardada. La lista del mes que viene actualiza precios en vez de duplicarte el catálogo — que es lo que pasa cuando se reconoce por nombre.",
      },
      {
        titulo: "Enseña el cambio antes de aplicarlo",
        detalle:
          "«De $870 a $910», renglón por renglón. Una carga que mueve 150 precios en silencio es indistinguible de un desastre hasta el corte del día.",
      },
      {
        titulo: "Lo que una lista nunca toca",
        detalle:
          "La existencia (una lista de precios no cuenta mercancía), el costo promedio de lo que ya existe (sale de las compras recibidas) y el nombre con que tu gente lo busca. Actualiza precios. Nada más.",
      },
      {
        titulo: "«Este envase rinde 44 tomas»",
        detalle:
          "Un bote se vuelve 44 unidades: el inventario se cuenta en tomas, el costo por toma sale solo ($485.05 ÷ 44) y el panquecito que lleva dos las descuenta. El precio de venta no se divide: lo pone el negocio.",
      },
      {
        titulo: "La orden de compra sale sola",
        detalle:
          "Al registrar la compra se abre su orden, y habla en la clave del proveedor, no en la tuya. Sale por PDF, correo y WhatsApp, y el correo lleva tu dirección en Reply-To: «¿confirmas el martes?» no puede acabar en el buzón de nadie más.",
      },
    ],
  },
  {
    slug: "fiscal",
    nombre: "Facturación",
    icon: "receipt",
    resumen:
      "CFDI 4.0 timbrado con PAC, con los detalles que sólo aparecen cuando facturas de verdad.",
    items: [
      {
        titulo: "Tu sello nunca sale del sistema",
        detalle:
          "Se timbra con el XML ya firmado y se cancela con una solicitud que se firma aquí. El otro camino pedía mandar tu llave privada descifrada: no se usa.",
      },
      {
        titulo: "Una venta se factura por partes",
        detalle:
          "De cinco productos se facturan dos y los otros tres quedan pendientes — o se facturan después a otro RFC, que es el caso de la empresa que pide los insumos y la persona que pide lo suyo.",
      },
      {
        titulo: "Facturar crea la ficha del cliente",
        detalle:
          "El RFC, la razón social, el régimen y el CP dejan de quedarse dentro del comprobante. Los RFC genéricos no abren ficha: colapsarían todas las ventas de mostrador en un solo cliente con el historial de media colonia.",
      },
      {
        titulo: "El receptor se precarga, no se reteclea",
        detalle:
          "Volver a escribir el RFC al facturar es donde se cuelan los dígitos cambiados. Sale del cliente de la venta y todo es editable.",
      },
      {
        titulo: "La clave del SAT se busca, no se adivina",
        detalle:
          "52,500 claves con sus sinónimos oficiales: «refresco» encuentra la suya, y «cafe» sin acento encuentra «Café». Donde el SAT no agrupa de verdad —hay una clave por fruta— no se sugiere nada: una clave inventada es peor que la genérica porque nadie la vuelve a revisar.",
      },
      {
        titulo: "Se entrega por los dos canales",
        detalle:
          "Correo y WhatsApp, con el XML primero porque es el comprobante. El cliente también los baja desde su cuenta de la tienda.",
      },
    ],
  },
  {
    slug: "tezca",
    nombre: "TEZCA",
    icon: "robot",
    resumen:
      "No es un chat encima del ERP: es el negocio leído por quien tiene los datos enfrente.",
    items: [
      {
        titulo: "Un resumen de todo, a la hora que digas",
        detalle:
          "Ventas por forma de pago, sucursal y vendedor; utilidad; devoluciones; cada ajuste de inventario con quién lo hizo; stock crítico; cortes; cobros; gastos. En PDF, por correo, WhatsApp y notificación. Puedes bajarlo aquí arriba.",
      },
      {
        titulo: "Comparado contra el mismo día de la semana pasada",
        detalle:
          "Y un día en curso, hasta la misma hora. A las 3 de la tarde, cualquier día comparado contra un día completo parecería un desastre.",
      },
      {
        titulo: "A quién escribirle hoy",
        detalle:
          "«Doña Mary viene los viernes por su cartón y hoy no ha venido.» El porqué lo calcula el código —vino en ≥3 y ≥60% de los últimos viernes—, no la IA; la IA sólo redacta. Y se acota a los 15 que más pesan: 75 en un día no es una lista, es spam.",
      },
      {
        titulo: "Margen de catálogo y margen realizado",
        detalle:
          "Confundirlos es el error clásico. Uno compara tu precio con el costo de hoy y sirve para poner precio; el otro sale de lo vendido, con el costo del día en que salió. Y costo cero no es 100% de margen: es «no se sabe», y se dice con una raya.",
      },
      {
        titulo: "Baja de clientes, siempre",
        detalle:
          "Todo mensaje —también el que mandas a mano— respeta si el cliente se dio de baja, y cada correo y cada WhatsApp lleva su liga para hacerlo.",
      },
    ],
  },
  {
    slug: "arranque",
    nombre: "El arranque",
    icon: "bolt",
    resumen:
      "El día uno es el que de verdad detiene a un negocio: nadie quiere teclear su inventario entero.",
    items: [
      {
        titulo: "Se trae el sistema anterior completo",
        detalle:
          "Catálogo, contactos, existencias e historial de ventas desde otro punto de venta. Las tablas no se suponen: se descubren, porque los nombres cambian de versión a versión.",
      },
      {
        titulo: "Se simula antes de cargar",
        detalle:
          "La migración corre de verdad dentro de una transacción que se deshace, así que el informe conoce los choques de clave y lo que no cabe — antes de tocar nada.",
      },
      {
        titulo: "Y se puede volver atrás",
        detalle:
          "Cada registro recuerda de dónde vino, así que volver a correrla no duplica nada y deshacerla no borra lo que ya existía y sólo se enlazó.",
      },
      {
        titulo: "Catálogo maestro por código de barras",
        detalle:
          "Casi 15,000 productos mexicanos con su nombre, marca y presentación: escaneas y ya está, en vez de teclearlo. Se copia a tu catálogo con tu precio editable, no se referencia — una limpieza nuestra no puede romper el tuyo.",
      },
      {
        titulo: "Las altas de personal, por liga",
        detalle:
          "Mandas un enlace por WhatsApp y cada quien llena sus propios datos. Tú decides el rol y las sucursales; la liga no los acepta, porque entonces sería una puerta para hacerse administrador.",
      },
    ],
  },
];
