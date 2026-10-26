/*
  Quién está detrás de PyCore SGC.

  Todo sale de fuentes públicas y verificables —el sitio de la empresa y la
  ficha del desarrollador en ese mismo sitio—, y por eso cada afirmación se
  puede ir a comprobar. En un «quiénes somos» eso es lo único que lo
  distingue de una página de adjetivos.

  Dos cosas quedan fuera a propósito:

  - **Las otras líneas de producto de la empresa.** Quien está leyendo vino
    por un ERP; enumerarle un CRM y un ERP académico no le resuelve nada y
    desvía la atención de lo que vino a decidir.
  - **Las cifras globales de la empresa** (transacciones, organizaciones).
    Son del conjunto, no de PyCore, y ponerlas aquí dejaría que se entiendan
    como si lo fueran.
*/

export const EMPRESA = {
  descripcion:
    "Empresa tecnológica especializada en inteligencia artificial, automatización y analítica.",
  lema: "Tecnología que conecta. Inteligencia que transforma.",
  parrafos: [
    "Global-IAnalytics diseña, integra y **opera** lo que entrega. No vende una licencia y se retira: los servidores, los dominios y los despliegues los lleva la misma casa que escribió el código, y en un ERP esa diferencia se nota el día que algo falla — porque hay a quién llamarle y quien contesta puede arreglarlo.",
    "Su especialidad es la inteligencia artificial y la analítica antes que el software administrativo. Por eso PyCore SGC trae su asistente dentro, trabajando sobre la operación real del negocio, y no como un módulo aparte que se cobra extra: es la materia de la casa, no una función que alguien quiso agregar al final.",
    "De sus valores hay uno que manda sobre la arquitectura de este sistema: la confidencialidad. Un ERP ve todo lo que gana y lo que debe un negocio, así que el aislamiento entre empresas está resuelto en los cimientos y no como una opción que se activa.",
  ],
  /** A qué se dedica, en tres palabras. Llena la columna y dice más que el lema solo. */
  especialidades: [
    { icon: "robot", nombre: "Inteligencia artificial", desc: "Agentes y asistentes sobre datos reales" },
    { icon: "refresh", nombre: "Automatización", desc: "Procesos que dejan de hacerse a mano" },
    { icon: "chart", nombre: "Analítica", desc: "Que los números digan qué hacer, no sólo qué pasó" },
  ],
  valores: [
    "Innovación",
    "Escalabilidad",
    "Confidencialidad",
    "Integridad",
    "Disponibilidad",
    "Confianza",
  ],
};

/*
  Lo que la empresa pone detrás del producto, dicho desde lo que le importa a
  quien compra — no desde el organigrama.
*/
export const RESPALDO = [
  {
    icon: "robot",
    titulo: "Inteligencia artificial de casa",
    texto:
      "Es a lo que se dedica la empresa. El asistente del sistema no se subcontrató ni se conectó a un servicio de terceros envuelto en una pantalla.",
  },
  {
    icon: "cloud",
    titulo: "Quien lo hace, lo opera",
    texto:
      "La infraestructura donde corre la lleva la propia empresa. Un fallo se arregla, no se escala a un proveedor que responde en 72 horas.",
  },
  {
    icon: "shield",
    titulo: "Tus datos, aislados",
    texto:
      "La confidencialidad es uno de sus valores declarados, y en este sistema se traduce en que los datos de cada negocio están separados desde la base.",
  },
];

/*
  El crédito de autoría.

  Breve a propósito: la petición fue que el protagonismo sea de la empresa.
  Lo que no puede faltar es el hecho —que el sistema lo escribió una persona
  concreta, verificable en el sitio de la empresa—, porque para quien va a
  confiarle su operación a un software eso es información, no vanidad.
*/
export const AUTORIA = {
  nombre: "Raul Jovany Callejas Vázquez",
  titulo: "PyCore Lead Developer & DevOps Engineer",
  /*
    El alcance se **enseña**, no se declara.

    «Lo desarrollé yo al cien por ciento» obliga a creer en la palabra de
    quien lo dice; enumerar las capas —datos, API, pantallas, asistente,
    infraestructura— deja el mismo hecho demostrado y además informa, porque
    dice de qué está hecho el sistema. Y lo que de verdad convence a quien va
    a comprarlo no es quién lo hizo, sino **por qué está hecho así**: el
    último renglón enlaza las dos cosas.
  */
  texto:
    "Llevó PyCore SGC de la primera tabla a producción: el modelo de datos, la API, las pantallas, el asistente y los servidores donde todo esto corre. Ingeniero en computación por la UAEMéx, se ocupa además de la infraestructura de los proyectos de la casa — y de ahí sale buena parte de lo que este sistema hace bien: que funcione sin internet, o que una venta no se cobre dos veces al reconectar, son cosas que se aprenden manteniendo algo en pie a las nueve de la noche, no diseñándolo en una pizarra.",
  reconocimientos: [
    "XXIV Concurso Emprendedor UAEMéx 2026",
    "2.º lugar en Proyectos de Base Tecnológica — IV Mercado Emprendedor 2026",
  ],
};
