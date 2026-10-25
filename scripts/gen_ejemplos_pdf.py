"""
Genera los PDF de ejemplo que la landing ofrece para descargar.

No es un diseño nuevo: reproduce **la misma hoja** que el sistema entrega, con
las constantes de `frontend/src/utils/exportUtils.ts` y de
`backend/apps/tezca/services/resumen_pdf_service.py` del ERP. Si allá cambia
una, aquí cambia la otra — es la misma regla que ya rige entre esos dos.

Los datos son los de `lib/documentos.ts`, que es lo que pinta la vista previa
de la landing: escribirlos dos veces es como la hoja que se mira y la que se
baja dejan de decir lo mismo.

Se corre dentro del contenedor del backend del ERP, que es quien tiene
reportlab:

    docker compose cp scripts/gen_ejemplos_pdf.py backend:/tmp/
    docker compose cp backend/static/emails/logo.png backend:/tmp/Logo.png
    docker compose exec -T backend sh -c 'cd /tmp && python -I gen_ejemplos_pdf.py'
    docker compose cp backend:/tmp/ejemplos/. <landing>/public/ejemplos/
"""
from __future__ import annotations

import os

from reportlab.lib.colors import Color
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

SALIDA = os.environ.get('SALIDA', '/tmp/ejemplos')
LOGO = os.environ.get('LOGO', '/tmp/Logo.png')


def _rgb(r, g, b) -> Color:
    return Color(r / 255, g / 255, b / 255)


# ── Las constantes de exportUtils.ts ──────────────────────────────────────
PAPEL = Color(1, 1, 1)
BANDA = _rgb(22, 20, 15)              # #16140F, el cromo de la aplicación
BANDA_INK = Color(1, 1, 1)
BANDA_INK_2 = _rgb(194, 185, 170)     # #C2B9AA
ACENTO = _rgb(14, 124, 102)           # #0E7C66, el verde del logo
TINTA = _rgb(28, 26, 23)              # #1C1A17
TINTA_2 = _rgb(69, 64, 58)            # #45403A
FILETE = _rgb(213, 208, 198)
FILETE_FINO = _rgb(228, 224, 216)
CEBRA = _rgb(250, 248, 245)

ALTO_BANDA = 22.0
MARGEN = 12.0

A4_W = A4[0] / mm
A4_H = A4[1] / mm


def fit(texto, ancho: float, fuente: str, tam: float) -> str:
    """`fitText` de exportUtils: corta con «…» lo que no cabe en un renglón."""
    texto = str(texto)
    if stringWidth(texto, fuente, tam) <= ancho * mm:
        return texto
    while texto and stringWidth(texto + '…', fuente, tam) > ancho * mm:
        texto = texto[:-1]
    return texto + '…'


class Hoja:
    """
    Un lienzo con coordenadas de arriba hacia abajo y en milímetros, como las
    usa jsPDF. Así el código de abajo se lee igual que `exportUtils.ts` y las
    dos hojas se pueden comparar renglón por renglón.
    """

    def __init__(self, ruta: str, titulo: str, ancho=A4_W, alto=A4_H):
        self.W, self.H = ancho, alto
        self.c = canvas.Canvas(ruta, pagesize=(ancho * mm, alto * mm))
        self.c.setTitle(titulo)
        self.c.setAuthor('PyCore SGC')
        self.c.setCreator('PyCore SGC')
        self.paginas = 1

    # -- primitivas ------------------------------------------------------
    def _y(self, y: float) -> float:
        return (self.H - y) * mm

    def rect(self, x, y, w, h, color):
        self.c.setFillColor(color)
        self.c.rect(x * mm, self._y(y + h), w * mm, h * mm, stroke=0, fill=1)

    def line(self, x1, y1, x2, y2, color, grosor):
        self.c.setStrokeColor(color)
        self.c.setLineWidth(grosor * mm)
        self.c.line(x1 * mm, self._y(y1), x2 * mm, self._y(y2))

    def text(self, txt, x, y, tam, bold=False, color=TINTA, align='left'):
        self.c.setFillColor(color)
        self.c.setFont('Helvetica-Bold' if bold else 'Helvetica', tam)
        if align == 'right':
            self.c.drawRightString(x * mm, self._y(y), str(txt))
        elif align == 'center':
            self.c.drawCentredString(x * mm, self._y(y), str(txt))
        else:
            self.c.drawString(x * mm, self._y(y), str(txt))

    def nueva_pagina(self):
        self.c.showPage()
        self.paginas += 1

    # -- la banda de marca ----------------------------------------------
    def banda(self, titulo, empresa, contexto=None, derecha=None, margen=MARGEN):
        """
        Sangra a los bordes a propósito: es el gesto que identifica la hoja de
        lejos. Devuelve la `y` donde empieza el contenido.
        """
        M = margen
        self.rect(0, 0, self.W, ALTO_BANDA, BANDA)

        # La marca de PyCore arriba —el documento lo genera el sistema— y el
        # negocio debajo, que es de quien habla el documento.
        tx = M
        if LOGO and os.path.exists(LOGO):
            try:
                self.c.drawImage(LOGO, M * mm, self._y(6 + 8), 8 * mm, 8 * mm,
                                 mask='auto')
                tx = M + 11
            except Exception:
                pass  # formato no soportado: se queda sin marca, no rota

        self.text('PyCore SGC', tx, 10.5, 11, bold=True, color=BANDA_INK)
        sub = f'{empresa}  ·  {contexto}' if contexto else empresa
        self.text(fit(sub, (self.W - M * 2) * 0.52, 'Helvetica', 7.5),
                  tx, 15.5, 7.5, color=BANDA_INK_2)

        self.text(titulo, self.W - M, 10.5, 12, bold=True, color=BANDA_INK,
                  align='right')
        if derecha:
            self.text('  ·  '.join(derecha), self.W - M, 15.5, 7.5,
                      color=BANDA_INK_2, align='right')

        # El filete de marca: lo único verde de la hoja.
        self.rect(0, ALTO_BANDA, self.W, 0.8, ACENTO)
        return ALTO_BANDA + 0.8 + 7

    def contexto(self, y, partes, margen=MARGEN):
        if not partes:
            return y
        self.text('     '.join(partes), margen, y, 7.5, color=TINTA_2)
        return y + 5

    def seccion(self, y, titulo, margen=MARGEN):
        """El título de una sección del resumen: 14 pt, como allá."""
        y += 3
        self.text(titulo, margen, y, 14, bold=True, color=TINTA)
        return y + 6

    # -- las cifras ------------------------------------------------------
    def cifras(self, y, items, margen=MARGEN):
        """
        Sin tarjetas: un filete arriba, otro abajo y uno entre cada par. La
        caja no existe — lo que se mira es el número.
        """
        if not items:
            return y
        contenido = self.W - margen * 2
        # El renglón crece cuando alguna cifra trae pie (19 contra 16): con el
        # alto fijo, «$0.00» y su pie se tocaban.
        alto = 19 if any(k.get('sub') for k in items) else 16
        ancho = contenido / len(items)

        self.line(margen, y, self.W - margen, y, FILETE, 0.25)
        self.line(margen, y + alto, self.W - margen, y + alto, FILETE, 0.25)

        for i, k in enumerate(items):
            x = margen + i * ancho
            if i > 0:
                self.line(x, y, x, y + alto, FILETE, 0.2)
            px = x + (0 if i == 0 else 4)
            self.text(fit(k['label'].upper(), ancho - 6, 'Helvetica-Bold', 6),
                      px, y + 5.5, 6, bold=True, color=TINTA_2)
            self.text(fit(k['value'], ancho - 6, 'Helvetica-Bold', 12),
                      px, y + 12, 12, bold=True, color=TINTA)
            if k.get('sub'):
                self.text(fit(k['sub'], ancho - 6, 'Helvetica', 6),
                          px, y + 16.5, 6, color=TINTA_2)

        return y + alto + 7

    def rotulo(self, y, texto, margen=MARGEN):
        self.text(texto, margen, y, 8, bold=True, color=TINTA)
        return y + 2.5

    # -- la tabla --------------------------------------------------------
    def tabla(self, y, head, rows, anchos, aligns=None, margen=MARGEN,
              reencabezar=None):
        """
        Cabecera en la banda, letra de 7.5 pt y renglones alternados, dentro
        de un marco fino. Es `estilosTabla` de exportUtils.
        """
        aligns = aligns or ['left'] * len(head)
        PAD = 2.0
        ALTO_TH = 6.6
        LIM = self.H - 14          # el pie vive en H-9; 5 mm de aire

        def dibujar_th(yy):
            self.rect(margen, yy, sum(anchos), ALTO_TH, BANDA)
            x = margen
            for j, hh in enumerate(head):
                tx = x + PAD if aligns[j] != 'right' else x + anchos[j] - PAD
                self.text(fit(hh, anchos[j] - PAD * 2, 'Helvetica-Bold', 7),
                          tx, yy + 4.6, 7, bold=True, color=BANDA_INK,
                          align=aligns[j])
                x += anchos[j]
            return yy + ALTO_TH

        y = dibujar_th(y)
        y0 = y

        for i, row in enumerate(rows):
            # Cada celda se parte en los renglones que necesite: `overflow:
            # linebreak`. El alto de la fila lo manda la celda más alta.
            celdas = []
            for j, val in enumerate(row):
                disp = anchos[j] - PAD * 2
                lineas, actual = [], ''
                for p in str(val).split():
                    cand = f'{actual} {p}'.strip()
                    if stringWidth(cand, 'Helvetica', 7.5) <= disp * mm or not actual:
                        actual = cand
                    else:
                        lineas.append(actual)
                        actual = p
                lineas.append(actual)
                celdas.append(lineas or [''])

            alto = max(len(cs) for cs in celdas) * 3.0 + PAD * 2

            if y + alto > LIM:
                self._marco(margen, y0 - ALTO_TH, sum(anchos), y - y0 + ALTO_TH)
                self.nueva_pagina()
                y = reencabezar() if reencabezar else ALTO_BANDA + 0.8 + 7
                y = dibujar_th(y)
                y0 = y

            if i % 2 == 1:
                self.rect(margen, y, sum(anchos), alto, CEBRA)

            x = margen
            for j, cs in enumerate(celdas):
                tx = x + PAD if aligns[j] != 'right' else x + anchos[j] - PAD
                for k, ln in enumerate(cs):
                    self.text(ln, tx, y + PAD + 2.4 + k * 3.0, 7.5,
                              color=TINTA, align=aligns[j])
                x += anchos[j]

            self.line(margen, y + alto, margen + sum(anchos), y + alto,
                      FILETE_FINO, 0.1)
            y += alto

        self._marco(margen, y0 - ALTO_TH, sum(anchos), y - y0 + ALTO_TH)
        return y + 6

    def _marco(self, x, y, w, h):
        self.c.setStrokeColor(FILETE_FINO)
        self.c.setLineWidth(0.1 * mm)
        self.c.rect(x * mm, self._y(y + h), w * mm, h * mm, stroke=1, fill=0)

    # -- el pie ----------------------------------------------------------
    def cerrar_pagina(self, izquierda, indice, total, margen=MARGEN):
        """En todas las páginas: un filete, de qué es la hoja y cuál es."""
        self.line(margen, self.H - 9, self.W - margen, self.H - 9, FILETE, 0.25)
        self.text(izquierda, margen, self.H - 5, 6.5, color=TINTA_2)
        self.text(f'{indice} / {total}', self.W - margen, self.H - 5, 6.5,
                  color=TINTA_2, align='right')


def dos_pasadas(ruta, titulo, dibuja, pie_izq):
    """
    El pie dice «página / total», y el total no se sabe hasta el final. Se
    dibuja dos veces: la primera sólo para contar las hojas.
    """
    h = Hoja(os.devnull, titulo)
    dibuja(h, lambda: None)
    total = h.paginas

    h = Hoja(ruta, titulo)
    estado = {'i': 0}

    def cerrar():
        estado['i'] += 1
        h.cerrar_pagina(pie_izq, estado['i'], total)

    dibuja(h, cerrar)
    cerrar()
    h.c.save()
    return total


# ══════════════════════════════════════════════════════════════════════════
#  Los datos — los mismos de lib/documentos.ts
# ══════════════════════════════════════════════════════════════════════════
EMPRESA = 'Abarrotes La Esperanza'

VENTAS = [
    ('VEN-00418', '24/10/2026 20:41', 'Público en general', 'Efectivo', '6', '$184.50'),
    ('VEN-00417', '24/10/2026 20:12', 'María Elena Cruz', 'Tarjeta débito', '11', '$612.00'),
    ('VEN-00416', '24/10/2026 19:58', 'Público en general', 'Efectivo', '3', '$78.00'),
    ('VEN-00415', '24/10/2026 19:34', 'Abarrotes Don Chuy', 'Crédito 15 días', '42', '$3,890.40'),
    ('VEN-00414', '24/10/2026 19:02', 'Público en general', 'Efectivo', '2', '$46.50'),
    ('VEN-00413', '24/10/2026 18:47', 'José Luis Ramírez', 'Transferencia', '18', '$1,245.80'),
    ('VEN-00412', '24/10/2026 18:21', 'Público en general', 'Efectivo', '8', '$256.00'),
    ('VEN-00411', '24/10/2026 17:55', 'Lonchería El Güero', 'Crédito 30 días', '27', '$2,104.60'),
    ('VEN-00410', '24/10/2026 17:30', 'Público en general', 'Tarjeta crédito', '5', '$398.00'),
    ('VEN-00409', '24/10/2026 17:08', 'Público en general', 'Efectivo', '4', '$112.50'),
    ('VEN-00408', '24/10/2026 16:44', 'Guadalupe Hernández', 'Efectivo', '14', '$724.30'),
    ('VEN-00407', '24/10/2026 16:19', 'Público en general', 'Efectivo', '7', '$203.00'),
    ('VEN-00406', '24/10/2026 15:52', 'Cremería Santa Fe', 'Crédito 15 días', '31', '$2,678.90'),
    ('VEN-00405', '24/10/2026 15:28', 'Público en general', 'Tarjeta débito', '9', '$467.20'),
    ('VEN-00404', '24/10/2026 15:03', 'Público en general', 'Efectivo', '2', '$58.00'),
    ('VEN-00403', '24/10/2026 14:41', 'Martha Patricia Ríos', 'Efectivo', '16', '$891.40'),
    ('VEN-00402', '24/10/2026 14:15', 'Público en general', 'Efectivo', '5', '$147.50'),
    ('VEN-00401', '24/10/2026 13:50', 'Taquería Los Primos', 'Crédito 30 días', '38', '$3,215.70'),
    ('VEN-00400', '24/10/2026 13:22', 'Público en general', 'Transferencia', '12', '$684.00'),
    ('VEN-00399', '24/10/2026 12:58', 'Público en general', 'Efectivo', '3', '$92.00'),
    ('VEN-00398', '24/10/2026 12:31', 'Rosa María Aguilar', 'Tarjeta débito', '21', '$1,432.60'),
    ('VEN-00397', '24/10/2026 12:04', 'Público en general', 'Efectivo', '6', '$178.50'),
    ('VEN-00396', '24/10/2026 11:39', 'Público en general', 'Efectivo', '4', '$124.00'),
    ('VEN-00395', '24/10/2026 11:12', 'Minisúper El Roble', 'Crédito 15 días', '45', '$4,102.30'),
    ('VEN-00394', '24/10/2026 10:48', 'Público en general', 'Efectivo', '8', '$289.70'),
    ('VEN-00393', '24/10/2026 10:21', 'Fernando Méndez', 'Transferencia', '13', '$798.40'),
    ('VEN-00392', '24/10/2026 09:57', 'Público en general', 'Efectivo', '2', '$64.00'),
    ('VEN-00391', '24/10/2026 09:30', 'Público en general', 'Tarjeta débito', '10', '$534.80'),
    ('VEN-00390', '24/10/2026 09:04', 'Carnicería La Bonita', 'Crédito 30 días', '29', '$2,456.10'),
    ('VEN-00389', '24/10/2026 08:38', 'Público en general', 'Efectivo', '5', '$156.00'),
]


# ── 1. Reporte de ventas ──────────────────────────────────────────────────
def reporte_ventas():
    def dibuja(h, cerrar):
        def encabezado():
            return h.banda(
                'Reporte de ventas', EMPRESA,
                contexto='Sucursal Centro',
                derecha=['Período: 01/10/2026 – 24/10/2026'],
            )

        y = encabezado()
        y = h.contexto(y, ['Generado: 24/10/2026 21:05', 'Sucursal: Centro',
                           'Estado: Completadas'])
        y = h.cifras(y, [
            {'label': 'Ventas', 'value': '418', 'sub': '+12.4% vs. mes anterior'},
            {'label': 'Importe total', 'value': '$312,480.60', 'sub': 'IVA incluido'},
            {'label': 'Ticket promedio', 'value': '$747.56', 'sub': '+3.1% vs. mes anterior'},
            {'label': 'Utilidad bruta', 'value': '$94,217.30', 'sub': 'margen 30.2%'},
        ])
        y = h.rotulo(y, 'VENTAS DEL PERÍODO')
        h.tabla(
            y,
            ['Folio', 'Fecha y hora', 'Cliente', 'Forma de pago', 'Artículos', 'Total'],
            [list(v) for v in VENTAS],
            anchos=[22, 28, 47, 32, 18, 39],
            aligns=['left', 'left', 'left', 'left', 'right', 'right'],
            reencabezar=lambda: (cerrar(), encabezado())[1],
        )

    dos_pasadas(f'{SALIDA}/pycore-reporte-ventas.pdf',
                'Reporte de ventas · PyCore SGC', dibuja,
                f'{len(VENTAS)} registros  ·  Reporte de ventas')


# ── 2. Corte por día ──────────────────────────────────────────────────────
def corte_por_dia():
    def dibuja(h, cerrar):
        def encabezado():
            return h.banda(
                'Corte por día', EMPRESA,
                contexto='Sucursal Centro  ·  Turno vespertino',
                derecha=['Folio: COR-CEN-00231', 'Sábado 24/10/2026'],
            )

        reenc = lambda: (cerrar(), encabezado())[1]

        y = encabezado()
        y = h.contexto(y, ['Abrió: 14:00  ·  Cerró: 21:30',
                           'Cajero: Guadalupe Hernández Soto'])
        y = h.cifras(y, [
            {'label': 'Fondo inicial', 'value': '$1,500.00'},
            {'label': 'Ventas del turno', 'value': '$18,742.30', 'sub': '24 ventas'},
            {'label': 'Efectivo esperado', 'value': '$9,318.10'},
            {'label': 'Efectivo contado', 'value': '$9,310.00', 'sub': 'faltante $8.10'},
        ])

        y = h.rotulo(y, 'DESGLOSE POR FORMA DE PAGO')
        y = h.tabla(y,
                    ['Forma de pago', 'Ventas', 'Importe', '% del turno'],
                    [['Efectivo', '13', '$7,818.10', '41.7%'],
                     ['Tarjeta de débito', '4', '$3,214.00', '17.1%'],
                     ['Tarjeta de crédito', '2', '$1,186.40', '6.3%'],
                     ['Transferencia', '2', '$1,482.40', '7.9%'],
                     ['Crédito a clientes', '3', '$5,041.40', '26.9%']],
                    anchos=[66, 26, 50, 44],
                    aligns=['left', 'right', 'right', 'right'],
                    reencabezar=reenc)

        y = h.rotulo(y, 'MOVIMIENTOS DE CAJA')
        y = h.tabla(y,
                    ['Hora', 'Concepto', 'Registró', 'Entrada', 'Salida'],
                    [['14:00', 'Fondo inicial del turno', 'G. Hernández', '$1,500.00', '—'],
                     ['16:10', 'Cobro CxC — Lonchería El Güero', 'G. Hernández', '$2,104.60', '—'],
                     ['17:45', 'Gasto — garrafón de agua y hielo', 'G. Hernández', '—', '$185.00'],
                     ['18:30', 'Retiro parcial a bóveda', 'R. Callejas', '—', '$6,000.00'],
                     ['19:20', 'Cobro CxC — Taquería Los Primos', 'G. Hernández', '$1,500.00', '—'],
                     ['21:30', 'Cierre de turno', 'G. Hernández', '—', '—']],
                    anchos=[18, 76, 36, 30, 26],
                    aligns=['left', 'left', 'left', 'right', 'right'],
                    reencabezar=reenc)

        y = h.rotulo(y, 'LO MÁS VENDIDO DEL TURNO')
        h.tabla(y,
                ['Producto', 'Cantidad', 'Importe', 'Utilidad'],
                [['Coca-Cola 600 ml', '48 pza', '$1,056.00', '$268.80'],
                 ['Tortilla de maíz', '32.50 kg', '$747.50', '$227.50'],
                 ['Huevo blanco a granel', '28.20 kg', '$1,297.20', '$310.20'],
                 ['Leche Lala entera 1 L', '24 pza', '$648.00', '$134.40'],
                 ['Sabritas original 45 g', '37 pza', '$703.00', '$203.50'],
                 ['Pan Bimbo grande', '14 pza', '$854.00', '$196.00'],
                 ['Jamón de pavo a granel', '6.40 kg', '$832.00', '$256.00']],
                anchos=[86, 32, 36, 32],
                aligns=['left', 'right', 'right', 'right'],
                reencabezar=reenc)

    dos_pasadas(f'{SALIDA}/pycore-corte-por-dia.pdf',
                'Corte por día · PyCore SGC', dibuja,
                'COR-CEN-00231  ·  Corte por día')


# ── 3. Expediente de RRHH ─────────────────────────────────────────────────
def expediente():
    def dibuja(h, cerrar):
        def encabezado():
            return h.banda(
                'Expediente', EMPRESA, contexto='Sucursal Centro',
                derecha=['Empleado: EMP-00014', 'Generado: 24/10/2026'],
            )

        reenc = lambda: (cerrar(), encabezado())[1]

        y = encabezado()
        y = h.cifras(y, [
            {'label': 'Antigüedad', 'value': '3 a 7 m'},
            {'label': 'Asistencias (mes)', 'value': '22 / 24', 'sub': '1 falta · 1 justificada'},
            {'label': 'Puntualidad', 'value': '95.5%', 'sub': '1 retardo'},
            {'label': 'Sueldo diario', 'value': '$428.00', 'sub': 'integrado $452.84'},
        ])

        y = h.rotulo(y, 'DATOS DE IDENTIFICACIÓN')
        y = h.tabla(y, ['Campo', 'Valor', 'Campo', 'Valor'],
                    [['Nombre', 'Guadalupe Hernández Soto', 'CURP', 'HESG900412MDFRLD03'],
                     ['RFC', 'HESG900412H42', 'NSS', '12-09-90-4125-6'],
                     ['Nacimiento', '12/04/1990', 'Estado civil', 'Casada'],
                     ['Domicilio', 'Av. Hidalgo 412, Col. Centro', 'C.P.', '06000'],
                     ['Teléfono', '55 1234 5678', 'Correo', 'guadalupe.hs@correo.mx']],
                    anchos=[26, 68, 26, 66], reencabezar=reenc)

        y = h.rotulo(y, 'RELACIÓN LABORAL')
        y = h.tabla(y, ['Campo', 'Valor', 'Campo', 'Valor'],
                    [['Puesto', 'Cajera principal', 'Departamento', 'Punto de venta'],
                     ['Ingreso', '15/03/2023', 'Tipo de contrato', 'Indeterminado'],
                     ['Jornada', 'Diurna — 48 h semanales', 'Sucursal', 'Centro'],
                     ['Jefe directo', 'Raúl Callejas Mora', 'Régimen', 'Sueldos y salarios'],
                     ['Periodicidad', 'Quincenal', 'Forma de pago', 'Transferencia']],
                    anchos=[26, 68, 26, 66], reencabezar=reenc)

        y = h.rotulo(y, 'ASISTENCIA — OCTUBRE 2026')
        h.tabla(y, ['Fecha', 'Entrada', 'Salida', 'Horas', 'Estado', 'Nota'],
                [['24/10/2026', '13:52', '21:34', '7:42', 'Asistencia', '—'],
                 ['23/10/2026', '13:58', '21:12', '7:14', 'Asistencia', '—'],
                 ['22/10/2026', '14:21', '21:30', '7:09', 'Retardo', 'Tráfico en Eje Central'],
                 ['21/10/2026', '—', '—', '—', 'Justificada', 'Cita médica IMSS'],
                 ['20/10/2026', '13:49', '21:18', '7:29', 'Asistencia', '—'],
                 ['19/10/2026', '—', '—', '—', 'Descanso', '—'],
                 ['18/10/2026', '13:55', '21:40', '7:45', 'Asistencia', '—'],
                 ['17/10/2026', '13:51', '21:22', '7:31', 'Asistencia', '—'],
                 ['16/10/2026', '—', '—', '—', 'Falta', 'Sin aviso'],
                 ['15/10/2026', '13:47', '21:15', '7:28', 'Asistencia', '—']],
                anchos=[26, 22, 22, 20, 30, 66],
                aligns=['left', 'right', 'right', 'right', 'left', 'left'],
                reencabezar=reenc)

    dos_pasadas(f'{SALIDA}/pycore-expediente-rrhh.pdf',
                'Expediente · PyCore SGC', dibuja,
                'Guadalupe Hernández Soto  ·  Expediente')


# ── 4. Resumen programado de TEZCA ────────────────────────────────────────
def resumen_tezca():
    def dibuja(h, cerrar):
        def encabezado():
            return h.banda(
                'Resumen diario', EMPRESA, contexto='Todas las sucursales',
                derecha=['Período: viernes 23/10/2026', 'Generado: 24/10/2026 08:00'],
            )

        reenc = lambda: (cerrar(), encabezado())[1]
        y = encabezado()

        # -- Ventas
        y = h.seccion(y, 'Ventas')
        y = h.cifras(y, [
            {'label': 'Importe', 'value': '$41,286.50', 'sub': '+6.8% vs. viernes pasado'},
            {'label': 'Ventas', 'value': '56', 'sub': '+4 vs. viernes pasado'},
            {'label': 'Ticket promedio', 'value': '$737.26', 'sub': '-0.4% vs. viernes pasado'},
            {'label': 'Utilidad bruta', 'value': '$12,604.20', 'sub': 'margen 30.5%'},
        ])
        y = h.rotulo(y, 'POR SUCURSAL')
        y = h.tabla(y, ['Sucursal', 'Ventas', 'Importe', 'Utilidad', 'Margen'],
                    [['Centro', '34', '$26,418.40', '$8,142.10', '30.8%'],
                     ['Norte', '15', '$10,204.60', '$3,021.40', '29.6%'],
                     ['Sur', '7', '$4,663.50', '$1,440.70', '30.9%']],
                    anchos=[58, 26, 38, 36, 28],
                    aligns=['left', 'right', 'right', 'right', 'right'],
                    reencabezar=reenc)
        y = h.rotulo(y, 'POR FORMA DE PAGO')
        y = h.tabla(y, ['Forma de pago', 'Ventas', 'Importe'],
                    [['Efectivo', '31', '$17,340.20'],
                     ['Tarjeta de débito', '9', '$7,118.60'],
                     ['Crédito a clientes', '7', '$11,284.30'],
                     ['Transferencia', '6', '$4,102.40'],
                     ['Tarjeta de crédito', '3', '$1,441.00']],
                    anchos=[86, 42, 58],
                    aligns=['left', 'right', 'right'], reencabezar=reenc)

        # -- Inventario
        y = h.seccion(y, 'Inventario')
        y = h.cifras(y, [
            {'label': 'Movimientos', 'value': '184'},
            {'label': 'Entradas', 'value': '$28,410.00', 'sub': '3 compras recibidas'},
            {'label': 'Salidas', 'value': '$28,682.30', 'sub': 'por venta'},
            {'label': 'Stock crítico', 'value': '7', 'sub': 'productos bajo mínimo'},
        ])
        y = h.rotulo(y, 'AJUSTES DEL DÍA — Y QUIÉN LOS HIZO')
        y = h.tabla(y,
                    ['Hora', 'Producto', 'Sucursal', 'Antes', 'Después', 'Registró', 'Motivo'],
                    [['09:14', 'Huevo blanco a granel', 'Centro', '42.00 kg', '38.60 kg', 'R. Callejas', 'Merma — cartón roto'],
                     ['12:40', 'Leche Lala entera 1 L', 'Norte', '36 pza', '34 pza', 'A. Jiménez', 'Caducidad'],
                     ['17:02', 'Tortilla de maíz', 'Centro', '18.00 kg', '21.50 kg', 'G. Hernández', 'Conteo físico'],
                     ['19:55', 'Sabritas original 45 g', 'Sur', '52 pza', '49 pza', 'M. Pérez', 'Merma — bolsa ponchada']],
                    anchos=[18, 48, 22, 22, 24, 26, 26],
                    aligns=['left', 'left', 'left', 'right', 'right', 'left', 'left'],
                    reencabezar=reenc)
        y = h.rotulo(y, 'STOCK CRÍTICO')
        y = h.tabla(y, ['Producto', 'Sucursal', 'Existencia', 'Mínimo', 'Sugerido'],
                    [['Aceite 1-2-3 de 946 ml', 'Centro', '4 pza', '12 pza', '24 pza'],
                     ['Atún Dolores en agua', 'Centro', '7 pza', '20 pza', '48 pza'],
                     ['Azúcar estándar a granel', 'Norte', '2.40 kg', '15 kg', '50 kg'],
                     ['Detergente Roma 1 kg', 'Sur', '3 pza', '10 pza', '24 pza'],
                     ['Frijol bayo a granel', 'Centro', '6.80 kg', '25 kg', '50 kg'],
                     ['Papel higiénico Pétalo 4R', 'Norte', '5 pza', '18 pza', '36 pza'],
                     ['Refresco Fanta 2 L', 'Sur', '6 pza', '15 pza', '30 pza']],
                    anchos=[76, 28, 34, 26, 22],
                    aligns=['left', 'left', 'right', 'right', 'right'],
                    reencabezar=reenc)

        # -- Finanzas
        y = h.seccion(y, 'Finanzas')
        y = h.cifras(y, [
            {'label': 'Cobrado', 'value': '$8,412.60', 'sub': '5 abonos'},
            {'label': 'Pagado', 'value': '$14,280.00', 'sub': '2 proveedores'},
            {'label': 'Gastos', 'value': '$1,845.00', 'sub': '6 gastos'},
            {'label': 'Por cobrar', 'value': '$62,418.90', 'sub': '$9,204.10 vencido'},
        ])
        y = h.rotulo(y, 'CUENTAS VENCIDAS')
        h.tabla(y, ['Cliente', 'Folio', 'Vencimiento', 'Días', 'Saldo'],
                [['Lonchería El Güero', 'CXC-00184', '09/10/2026', '15', '$3,104.60'],
                 ['Taquería Los Primos', 'CXC-00176', '14/10/2026', '10', '$2,815.70'],
                 ['Carnicería La Bonita', 'CXC-00169', '19/10/2026', '5', '$2,456.10'],
                 ['Abarrotes Don Chuy', 'CXC-00191', '21/10/2026', '3', '$827.70']],
                anchos=[66, 30, 34, 20, 36],
                aligns=['left', 'left', 'left', 'right', 'right'],
                reencabezar=reenc)

    dos_pasadas(f'{SALIDA}/pycore-resumen-tezca.pdf',
                'Resumen diario · PyCore SGC', dibuja,
                '3 secciones  ·  Resumen diario')


# ── 5. El ticket de 80 mm ─────────────────────────────────────────────────
def ticket():
    """
    El ticket no es «Banda de marca»: es papel de 80 mm para el mostrador, y
    ahí el ancho manda sobre cualquier idea de diseño. Va como ejemplo
    justamente para que se vea que es otra familia.
    """
    W, M = 80.0, 4.0
    LINEAS = [
        ('Coca-Cola 600 ml', '2 pza', '$22.00', '$44.00'),
        ('Sabritas original 45 g', '1 pza', '$19.00', '$19.00'),
        ('Tortilla de maíz', '1.250 kg', '$23.00', '$28.75'),
        ('Huevo blanco a granel', '0.980 kg', '$46.00', '$45.08'),
        ('Leche Lala entera 1 L', '2 pza', '$27.00', '$54.00'),
        ('Pan Bimbo grande', '1 pza', '$61.00', '$61.00'),
        ('Jamón de pavo a granel', '0.300 kg', '$130.00', '$39.00'),
        ('+ 1 bolsa reutilizable', '1 pza', '$5.00', '$5.00'),
    ]
    cw = W - 2 * M

    def dibujar(h):
        y = 10.0

        h.text(EMPRESA, W / 2, y, 12, bold=True, align='center'); y += 5
        for txt in ('Sucursal Centro', 'Av. Hidalgo 412, Col. Centro, CDMX',
                    'RFC: AES900412H42  ·  Tel. 55 1234 5678'):
            h.text(fit(txt, cw, 'Helvetica', 7), W / 2, y, 7, color=TINTA_2, align='center')
            y += 3.6
        y += 1.4

        h.line(M, y, W - M, y, FILETE, 0.2); y += 5
        h.text('VEN-00418', W / 2, y, 11, bold=True, align='center'); y += 4.5
        h.text('24/10/2026 20:41  ·  Caja 1', W / 2, y, 7, color=TINTA_2, align='center'); y += 3.6
        h.text('Le atendió: Guadalupe H.', W / 2, y, 7, color=TINTA_2, align='center'); y += 5
        h.line(M, y, W - M, y, FILETE, 0.2); y += 4.5

        for nombre, cant, pu, imp in LINEAS:
            h.text(fit(nombre, cw, 'Helvetica-Bold', 8), M, y, 8, bold=True); y += 3.4
            h.text(f'{cant} × {pu}', M, y, 7.5, color=TINTA_2)
            h.text(imp, W - M, y, 8, align='right'); y += 4.4

        h.line(M, y, W - M, y, FILETE, 0.2); y += 4.8
        for et, val, bold in [('Subtotal', '$254.16', False),
                              ('IVA 16%', '$40.67', False),
                              ('TOTAL', '$294.83', True)]:
            h.text(et, M, y, 10 if bold else 8, bold=bold,
                   color=TINTA if bold else TINTA_2)
            h.text(val, W - M, y, 10 if bold else 8, bold=bold, align='right')
            y += 5.6 if bold else 4.4

        h.line(M, y, W - M, y, FILETE, 0.2); y += 4.6
        for et, val in [('Efectivo', '$300.00'), ('Cambio', '$5.17')]:
            h.text(et, M, y, 8, color=TINTA_2)
            h.text(val, W - M, y, 8, align='right'); y += 4.4

        y += 2
        h.text('¡Gracias por su compra!', W / 2, y, 8, bold=True, align='center'); y += 4.2
        h.text('Consulta tu ticket en pycore.app', W / 2, y, 6.5, color=TINTA_2, align='center'); y += 3.2
        h.text('Generado con PyCore SGC', W / 2, y, 6.5, color=TINTA_2, align='center')
        return y

    # El rollo es continuo: el alto lo decide el contenido, no al revés. Se
    # mide en una primera pasada —como el «página / total» del pie— porque un
    # alto fijo corta el pie del ticket en cuanto la venta trae un renglón más.
    final = dibujar(Hoja(os.devnull, 'medición', ancho=W, alto=400))

    h = Hoja(f'{SALIDA}/pycore-ticket-venta.pdf',
             'Ticket de venta · PyCore SGC', ancho=W, alto=final + 6)
    dibujar(h)
    h.c.save()


if __name__ == '__main__':
    os.makedirs(SALIDA, exist_ok=True)
    reporte_ventas()
    corte_por_dia()
    expediente()
    resumen_tezca()
    ticket()
    for f in sorted(os.listdir(SALIDA)):
        print(f, os.path.getsize(os.path.join(SALIDA, f)), 'bytes')
