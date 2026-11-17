# Python y análisis de datos

## Entorno

**Usa el entorno y la herramienta del proyecto.** `pyproject.toml`, `uv.lock`, `poetry.lock`, `requirements.txt` o `environment.yml` indican cuál es. No instales paquetes en el Python del sistema ni añadas una dependencia sin comprobar que no haya ya una que sirva.

**La configuración dice qué se verifica.** En `pyproject.toml` o `setup.cfg` verás qué linter, formateador y comprobador de tipos usa el proyecto, y cómo está configurado pytest. Usa esos.

## Verificar código

1. Las pruebas de la zona que tocaste primero, y después la batería completa.
2. Linter y comprobador de tipos, si el proyecto los usa.
3. Si es un script, ejecútalo con una entrada real o de muestra y mira la salida.

## Trabajar con datos

En un análisis, los problemas de los datos cambian el resultado más que cualquier error de código, y no producen ningún mensaje de error. Por eso el orden importa: primero conocer los datos, luego calcular.

### Antes de calcular: perfila

- Número de filas y columnas, y tipo de cada columna.
- Valores vacíos por columna.
- Duplicados en lo que debería ser la clave (por ejemplo, el identificador de pedido).
- Rango de valores numéricos: negativos, ceros, valores extremos.
- Categorías distintas de cada columna de texto. Aquí aparecen "cancelado", "devuelto", "prueba".
- Fechas: formato o formatos presentes, rango cubierto, fechas fuera del periodo esperado.

### Cada anomalía es una decisión

Filas duplicadas, importes vacíos, pedidos cancelados, importes negativos: incluirlos o excluirlos cambia la cifra.

Si la diferencia es apreciable, la decisión es del usuario. Pregúntale; si la tarea no puede esperar, entrega el resultado con el supuesto escrito de forma explícita y di cuánto cambiaría con el supuesto contrario.

Nunca descartes filas en silencio. Informa de cuántas se excluyeron y por qué motivo.

### Al calcular

- **Cuenta filas antes y después de cada cruce.** Un `merge` o `join` que multiplica filas infla las sumas sin dar ningún error.
- **Interpreta las fechas con un formato explícito.** Con formatos mezclados, la detección automática puede leer `03/04` como marzo o como abril según la fila.
- **Para dinero, cuida el redondeo.** Redondea al final, no en cada paso, y usa `Decimal` cuando los céntimos importen.
- **No sobrescribas los datos de origen.** Escribe los resultados en archivos nuevos.

### Antes de entregar

- **Comprueba que cuadra**: la suma de las partes da el total; las filas usadas más las excluidas dan las filas de origen; el orden de magnitud es creíble.
- **Recalcula a mano dos o tres casos** y compáralos con lo que da el código.
- **Hazlo reproducible**: un script o cuaderno que regenere la cifra desde el archivo de origen, con semilla fija si hay algo aleatorio.

### Cómo se entrega una cifra

Una cifra sin contexto no se puede usar ni discutir. Acompáñala siempre de:

- El periodo y los filtros aplicados.
- La definición usada ("ingreso = suma de importes de pedidos no cancelados").
- Cuántas filas entraron en el cálculo y cuántas quedaron fuera, con el motivo.
- La unidad y la moneda.
