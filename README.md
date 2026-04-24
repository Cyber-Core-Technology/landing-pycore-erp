# PyCore ERP — Landing Page

Sitio de marketing para **PyCore ERP**, el sistema ERP en la nube diseñado para PyMEs mexicanas.

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

Todo el contenido de texto (módulos, planes, precios, TEZCA) está centralizado en [`lib/constants.ts`](lib/constants.ts). Editar ese archivo actualiza automáticamente todas las páginas que lo consumen.

---

Desarrollado por [Cyber Core Technology](https://cyco.tech) · Hecho en México 🇲🇽
