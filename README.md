# PyCore SGC — Landing Page

Sitio de marketing para **PyCore SGC**, el sistema ERP en la nube diseñado para PyMEs mexicanas.

## Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + TypeScript + Tailwind CSS
- **Animaciones:** Framer Motion
- **Temas:** next-themes (dark / light)
- **Email:** Resend (solicitudes de demo)
- **Fuentes:** Inter · Poppins · JetBrains Mono (Google Fonts)
- **Deploy:** Docker (Dockerfile incluido)

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing principal con todas las secciones |
| `/modulos` | Detalle de los 14 módulos del ERP |
| `/tezca` | Página dedicada al asistente de IA TEZCA |
| `/tienda` | Página dedicada al módulo de Tienda en Línea |
| `/api/demo` | Endpoint POST para solicitudes de demo |

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores reales

# 3. Modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo de contacto visible |
| `RESEND_API_KEY` | API key de [Resend](https://resend.com) para emails |
| `EMAIL_FROM` | Remitente de los correos de demo |
| `EMAIL_TO` | Destinatario de las solicitudes de demo |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ID de Google Analytics (opcional) |

> Si `RESEND_API_KEY` no está configurada, las solicitudes de demo se registran en consola (modo desarrollo).

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## Docker

```bash
# Desarrollo
docker compose up

# Producción
docker build -t pycore-landing .
docker run -p 3000:3000 pycore-landing
```

## Estructura

```
landing-pycore/
├── app/                  # Rutas Next.js (App Router)
│   ├── page.tsx          # Landing principal
│   ├── modulos/          # Página de módulos
│   ├── tezca/            # Página de TEZCA
│   ├── tienda/           # Página de Tienda en Línea
│   ├── api/demo/         # Endpoint de solicitudes de demo
│   ├── layout.tsx        # Layout raíz con providers
│   └── globals.css       # Estilos globales + variables CSS
├── components/
│   ├── layout/           # Navbar y Footer
│   ├── sections/         # Secciones de la landing
│   ├── pages/            # Contenido de páginas internas
│   └── ui/               # Componentes reutilizables
├── lib/
│   ├── constants.ts      # Datos de módulos, planes, TEZCA, etc.
│   └── demo-context.tsx  # Contexto del modal de demo
├── public/               # Assets estáticos (logo, favicons)
├── hooks/                # Custom hooks
├── .env.example          # Plantilla de variables de entorno
├── Dockerfile            # Imagen de producción
├── Dockerfile.dev        # Imagen de desarrollo
└── docker-compose.yml
```

## Personalización de contenido

Todo el contenido de texto está centralizado en `lib/`, y editarlo actualiza
todas las páginas que lo consumen:

- [`lib/constants.ts`](lib/constants.ts) — módulos, planes, precios, TEZCA.
- [`lib/capacidades.ts`](lib/capacidades.ts) — lo que sólo se nota operando.
  Regla del archivo: **nada genérico**. Si una capacidad no se puede contar
  con un caso concreto, no entra.
- [`lib/documentos.ts`](lib/documentos.ts) — los PDF de ejemplo.

## El demo interactivo (`/demo`)

«El Mostrador» es el punto de venta jugable de la portada: se cobra una venta
sin registrarse y sin backend. Lo que lo separa de una maqueta es que **las
reglas son las del sistema** —granel en gramos, presentación con precio
absoluto, extra en su renglón, una línea en cero no se cobra— y que el
catálogo es el de verdad.

- **El catálogo sale del ERP.** `scripts/exportar_catalogo_demo.py` exporta el
  tenant `demo-abarrotes` a `public/demo/catalogo.json`: nombres, precios,
  códigos de barras, unidades e impuesto son los sembrados por
  `manage.py seed_demo`. Lo único añadido para el demo —dos presentaciones y
  un extra— va marcado con `autoria: "demo"` en el JSON.
- **La aritmética vive aparte**, en `lib/demoMostrador.ts`, con sus pruebas en
  `lib/demoMostrador.test.ts`. Lo que un mostrador no puede equivocar no se
  comprueba montando el árbol de React.
- **TEZCA es guionizado, y lo dice en su encabezado.** Un asistente real en
  una página pública es un gasto por visitante sin techo. Lo que sí es verdad
  es la forma: responde sobre lo que hay en pantalla (`lib/demoTezca.ts`).
- **No guarda nada**, y la pantalla lo avisa. Una simulación que finja
  persistir es peor que no tenerla.

Para regenerar el catálogo (p. ej. tras volver a sembrar los demos):

```bash
cd <ruta-al-erp>/pycore-erp
L=<ruta-a-esta-landing>
docker compose cp "$L/scripts/exportar_catalogo_demo.py" backend:/tmp/
docker compose exec -T backend python manage.py shell -c "exec(open('/tmp/exportar_catalogo_demo.py').read())"
docker compose cp backend:/tmp/catalogo.json "$L/public/demo/catalogo.json"
```

## Pruebas

```bash
npm test        # vitest — la lógica del mostrador (23 pruebas)
npm run e2e     # playwright — navegador real, escritorio y teléfono (62)
npm run verificar   # tsc + vitest + next build + playwright, todo seguido
```

Las de punta a punta corren contra `next build` + `next start`, no contra
`next dev`: en dev la primera visita a cada ruta compila, y una prueba que a
veces tarda cuatro segundos y a veces cuarenta acaba ignorándose. **Si ya hay
un `next start` vivo de un build anterior, Playwright lo reutiliza y falla
todo con errores de MIME** — hay que bajarlo antes.

Lo que cubren, y por qué eso y no otra cosa:

- **Que cada ruta cargue sin errores de consola.** Un 200 no basta: el fallo
  de `optimizePackageImports` daba SSR correcto y reventaba en la hidratación.
- **Que nada desborde a lo ancho** en 390 px y en 1440. El desbordamiento
  horizontal es lo que de verdad rompe una página en un teléfono, y no se ve
  desde el escritorio.
- **Que los PDF descargables empiecen por `%PDF`.** Si el servidor devolviera
  el HTML de un 404 con estado 200, el enlace «funcionaría» y el archivo
  estaría roto.

## Los PDF de ejemplo

`public/ejemplos/*.pdf` son documentos **reales**: los genera
[`scripts/gen_ejemplos_pdf.py`](scripts/gen_ejemplos_pdf.py) reproduciendo la
misma hoja que entrega el ERP —el cromo «Banda de marca» de
`frontend/src/utils/exportUtils.ts` y `apps/tezca/.../resumen_pdf_service.py`—
con los datos de `lib/documentos.ts`, que es lo mismo que pinta la vista
previa en pantalla.

**Si cambia `exportUtils.ts` en el ERP, cambia este script.** Es la misma
regla que ya rige entre los dos archivos del ERP, extendida a este tercero:
las constantes de arriba del script llevan el nombre y el valor de allá.

Se corre dentro del contenedor del backend del ERP, que es quien tiene
reportlab:

```bash
cd <ruta-al-erp>/pycore-erp
L=<ruta-a-esta-landing>
docker compose cp "$L/scripts/gen_ejemplos_pdf.py" backend:/tmp/
docker compose cp backend/static/emails/logo.png backend:/tmp/Logo.png
docker compose exec -T backend sh -c 'rm -rf /tmp/ejemplos && cd /tmp && python -I gen_ejemplos_pdf.py'
docker compose cp backend:/tmp/ejemplos/. "$L/public/ejemplos/"
```

Después hay que cuadrar `paginas` y `peso` en `lib/documentos.ts` con lo que
reporte `pdfinfo`: se dicen **antes** de que alguien baje el archivo, así que
una cifra vieja ahí es una mentira pequeña pero comprobable.

---

Desarrollado por [Raul Callejas](https://scorpion.cyco.tech) · Propiedad de [Global-IAnalytics S. A de C. V](https://global-ianalytics.com) · Hecho en México 🇲🇽

