"""
Exporta el catálogo del negocio de demostración a `public/demo/catalogo.json`,
que es lo que mueve El Mostrador de la landing.

El punto de este archivo es que **el demo no invente productos**. Los nombres,
los precios, los códigos de barras, las unidades y el impuesto salen del tenant
`demo-abarrotes` que siembra `manage.py seed_demo`, así que lo que se teclea en
la web es el mismo catálogo que vería alguien dentro del sistema. Es el mismo
criterio de los PDF de ejemplo: enseñar la cosa, no un dibujo de la cosa.

Lo único **añadido aquí** son tres cosas que el sembrador no genera y que son
justo las que distinguen a este sistema. Van marcadas con `autoria: "demo"` en
el JSON y la pantalla lo dice:

  - unas presentaciones (el refresco por pieza y por cartón),
  - un extra (la bolsa reutilizable),
  - y la marca de granel sobre lo que se vende por kilo.

Se corre dentro del contenedor del backend del ERP:

    docker compose cp scripts/exportar_catalogo_demo.py backend:/tmp/
    docker compose exec -T backend python manage.py shell -c "exec(open('/tmp/exportar_catalogo_demo.py').read())"
    docker compose cp backend:/tmp/catalogo.json <landing>/public/demo/catalogo.json
"""
import json
import logging
from decimal import Decimal

logging.disable(logging.CRITICAL)

from apps.core.models import Empresa                      # noqa: E402
from apps.inventory.models import Inventario, Producto    # noqa: E402

SLUG = 'demo-abarrotes'
DESTINO = '/tmp/catalogo.json'
CUANTOS = 60
POR_CATEGORIA = 3   # 20 categorías × 3 = las 60, con todas representadas


def dec(v):
    return float(Decimal(v or 0).quantize(Decimal('0.01')))


def _precio_bonito(v):
    """Al múltiplo de $0.50 más cercano: ningún mostrador cobra $717.60."""
    return float((Decimal(v) / Decimal('0.5')).quantize(Decimal('1')) * Decimal('0.5'))


empresa = Empresa.objects.get(slug=SLUG)

# Sólo lo que un mostrador vende: con precio, con inventario y activo.
#
# El reparto es **por categoría**, no alfabético: el catálogo tiene 505
# productos y los primeros 60 por nombre son doce aceites y seis
# acondicionadores seguidos, que no se parece a ningún mostrador. Con unos
# pocos de cada categoría el buscador tiene algo que encontrar.
#
# Se deja fuera la unidad `lt`: el sembrador le pone litros a cosas que se
# venden por pieza —una botella de aceite con existencia «0.63 lt»— y en un
# demo eso se lee como un defecto nuestro, no del dato.
qs = (
    Producto.objects
    .filter(empresa=empresa, activo=True, maneja_inventario=True)
    .exclude(precio_venta__isnull=True)
    .exclude(precio_venta=0)
    .exclude(unidad_medida__abreviatura__iexact='lt')
    .select_related('categoria', 'unidad_medida', 'impuesto')
    .order_by('categoria__nombre', 'nombre')
)

# El stock sale de la sucursal principal: el promedio de todas no es el de
# ninguna, que es la regla del margen por sucursal del ERP.
sucursal = empresa.sucursales.filter(activo=True).order_by('-es_principal').first()
stocks = {
    i.producto_id: float(i.stock_actual or 0)
    for i in Inventario.objects.filter(producto__empresa=empresa, sucursal=sucursal)
}

# ── Lo añadido para el demo, marcado como tal ────────────────────────────
# Presentaciones: el sembrador sólo crea la base, y sin un segundo empaque no
# se puede enseñar lo que de verdad distingue al catálogo.
PRESENTACIONES_DEMO = {
    'Refrescos': [
        {'nombre': 'Pieza', 'factor': 1},
        # Absoluto, nunca `precio_base × factor`: el cartón sale más barato
        # por pieza y esa diferencia es el margen del menudeo.
        {'nombre': 'Cartón de 12', 'factor': 12, 'descuento': 0.88},
    ],
    'Cervezas y vinos': [
        {'nombre': 'Pieza', 'factor': 1},
        {'nombre': 'Six pack', 'factor': 6, 'descuento': 0.92},
    ],
}

# Granel es lo que se **pesa en la báscula**, y eso no lo dice la unidad: el
# sembrador le pone `kg` también al arroz embolsado de 1 kg, que se vende por
# pieza. Pedir «500 gramos de Arroz Morelos 1 kg» no tiene sentido. Así que
# granel = unidad de peso **y** el nombre lo dice.
UNIDADES_PESO = {'kg', 'kilogramo', 'kilogramos', 'kilo'}
PALABRA_GRANEL = 'granel'

# Hasta `POR_CATEGORIA` de cada una, en orden estable: el mismo JSON entre
# corridas, porque un diff de sesenta productos barajados no se revisa.
_vistos = {}
elegidos = []

# Lo que se pesa entra primero y sin tope: la captura en gramos es una de las
# tres cosas que este demo existe para enseñar, y el reparto por categoría la
# dejaba fuera por orden alfabético.
granel = [p for p in qs if PALABRA_GRANEL in p.nombre.lower()]
for p in granel:
    cat = p.categoria.nombre if p.categoria else 'General'
    _vistos[cat] = _vistos.get(cat, 0) + 1
    elegidos.append(p)

for p in qs:
    if p in elegidos:
        continue
    cat = p.categoria.nombre if p.categoria else 'General'
    if _vistos.get(cat, 0) >= POR_CATEGORIA:
        continue
    _vistos[cat] = _vistos.get(cat, 0) + 1
    elegidos.append(p)

_con_pres = {}
productos = []
for p in elegidos[:CUANTOS]:
    unidad = (p.unidad_medida.abreviatura if p.unidad_medida else 'pza') or 'pza'
    unidad_l = unidad.lower()
    tasa = float(p.impuesto.tasa) if p.impuesto and p.impuesto.tasa is not None else 0.0
    # En el ERP la tasa se guarda como fracción o como porcentaje según el
    # catálogo; se normaliza a fracción aquí y no en el navegador.
    if tasa > 1:
        tasa = tasa / 100.0

    nombre_l = p.nombre.lower()
    item = {
        'id': str(p.id),
        'nombre': p.nombre,
        'codigo_barras': p.codigo_barras or '',
        'sku': p.sku or '',
        'categoria': p.categoria.nombre if p.categoria else 'General',
        'unidad': unidad,
        'granel': unidad_l in UNIDADES_PESO and PALABRA_GRANEL in nombre_l,
        'precio': dec(p.precio_venta),
        'costo': dec(p.precio_compra),
        'tasa_impuesto': round(tasa, 4),
        # Lo que se cuenta por pieza va entero: el sembrador deja existencias
        # fraccionarias de tanto consumir y reponer, y «92.09 pza» en un
        # mostrador se lee como un defecto nuestro. Lo que se pesa sí lleva
        # decimales, porque medio kilo es medio kilo.
        'stock': (round(stocks.get(p.id, 0), 2) if unidad_l in UNIDADES_PESO
                  else int(stocks.get(p.id, 0))),
    }

    cat = item['categoria']
    # Nunca sobre algo que YA es un empaque: un «six pack» de un producto
    # llamado «six 355 ml» son 36 cervezas y se lee como un defecto.
    ya_es_paquete = any(w in nombre_l for w in ('six', 'cartón', 'carton', 'caja', 'pack'))
    if (cat in PRESENTACIONES_DEMO and not item['granel'] and not ya_es_paquete
            and _con_pres.get(cat, 0) < 1):
        _con_pres[cat] = _con_pres.get(cat, 0) + 1
        base = Decimal(str(item['precio']))
        item['presentaciones'] = [
            {
                'nombre': x['nombre'],
                'factor': x['factor'],
                'precio': _precio_bonito(base * x['factor'] * Decimal(str(x.get('descuento', 1)))),
            }
            for x in PRESENTACIONES_DEMO[cat]
        ]
        item['autoria_presentaciones'] = 'demo'

    productos.append(item)

# El extra: se cobra en su renglón y, si consume un producto, lo descuenta.
# Éste no consume nada —es un cargo— y por eso no causa movimiento.
extras = [
    {
        'id': 'extra-bolsa',
        'nombre': 'Bolsa reutilizable',
        'precio': 5.00,
        'tasa_impuesto': 0.16,
        'autoria': 'demo',
    },
]

salida = {
    'empresa': {
        'nombre': empresa.nombre_comercial or empresa.nombre,
        'sucursal': sucursal.nombre if sucursal else 'Matriz',
    },
    'generado': 'manage.py seed_demo --giro abarrotes',
    'productos': productos,
    'extras': extras,
}

with open(DESTINO, 'w', encoding='utf-8') as fh:
    json.dump(salida, fh, ensure_ascii=False, indent=1)

con_pres = sum(1 for x in productos if 'presentaciones' in x)
granel = sum(1 for x in productos if x['granel'])
print('empresa:', salida['empresa']['nombre'], '| sucursal:', salida['empresa']['sucursal'])
print('productos:', len(productos), '| granel:', granel, '| con presentaciones:', con_pres)
print('escrito en', DESTINO)
