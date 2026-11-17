---
name: planear-construir-revisar
description: Manual de trabajo para llevar una tarea de principio a fin en tres fases (planear, construir y revisar) y cerrarla con un informe fiel de lo hecho. Úsala siempre que el usuario pida planear, diseñar, implementar, construir, arreglar o revisar algo que tenga más de un paso, ya sea una funcionalidad, una corrección de error, una refactorización, un documento o un análisis. Úsala también cuando pida un plan de trabajo, una revisión de código o de un entregable, o cuando diga cosas como "hazlo bien", "de principio a fin", "revísalo todo", "plan, build, review" o "sigue el manual", aunque no nombre la skill.
---

# Planear, construir y revisar

Este manual describe cómo abordar una tarea de principio a fin: entenderla y planearla, construirla, revisarla y dar cuenta de lo hecho.

Las tres fases se aplican siempre, pero a escala de la tarea. Corregir una errata no necesita un plan escrito; rediseñar un módulo sí. Lo que no cambia con el tamaño es el orden: primero entender, luego cambiar, luego comprobar. Si una instrucción del usuario o del proyecto contradice este manual, manda esa instrucción.

El manual está escrito pensando en software, pero sirve igual para un documento, un análisis o un diseño. En esos casos, "pruebas" significa cualquier comprobación objetiva contra el criterio de terminado: releer contra los requisitos, recalcular una cifra, abrir el archivo final y mirarlo.

Si el usuario pide solo una fase (solo un plan, solo una revisión), entrega esa fase y no sigas con las demás sin que lo pida.

## 1. Planear

El objetivo de esta fase es saber qué se pide y cómo se sabrá que está terminado, antes de modificar nada.

**Lee antes de proponer.** Abre el código, las pruebas y la documentación que toca la tarea, y mira cómo se han resuelto problemas parecidos en el proyecto. Lo que afirmes sobre el código debe venir de haberlo leído, no de suponer cómo suele ser.

**Define "terminado" de forma comprobable.** Un resultado observable y la manera de verificarlo: una prueba que pasa, un comando que devuelve cierto valor, un comportamiento visible en la aplicación. Si no puedes decir cómo se comprobará, todavía no entiendes la tarea.

**Delimita el alcance.** Decide qué entra y qué queda fuera. Prefiere el cambio más pequeño que resuelve el problema completo; lo que descubras por el camino y no forme parte de la tarea se anota y se informa, no se arregla de paso.

**Resuelve la incertidumbre tú mismo cuando puedas.** Lo que se puede averiguar leyendo o ejecutando, se averigua. Pregunta al usuario solo lo que le corresponde decidir a él: decisiones de producto, compromisos difíciles de deshacer, preferencias que el proyecto no revela. En lo demás, elige la opción razonable, dila y sigue.

**Identifica lo que puede salir mal.** Qué partes del sistema dependen de lo que vas a tocar, y qué pasos son difíciles de revertir: borrar datos, migraciones, cambios en una interfaz pública, cualquier cosa que salga del proyecto hacia fuera. Esos pasos necesitan confirmación explícita del usuario.

Para una tarea mediana o grande, deja el plan por escrito con este contenido:

- **Objetivo**: qué problema se resuelve y para quién.
- **Criterio de terminado**: cómo se verificará.
- **Zonas afectadas**: archivos y módulos que se van a tocar, y los que dependen de ellos.
- **Pasos**: en orden, cada uno verificable por separado.
- **Riesgos y preguntas abiertas**: lo que podría romperse y lo que aún no sabes.

Si el enfoque sería caro de deshacer una vez construido, presenta el plan y espera el acuerdo del usuario antes de empezar. Si es barato de corregir, empieza.

## 2. Construir

**Sigue las convenciones del proyecto.** Estilo, nombres, estructura de carpetas y bibliotecas ya en uso. El código nuevo debe parecer escrito por la misma mano que el que lo rodea; antes de añadir una dependencia, comprueba que el proyecto no tenga ya una que sirva.

**Avanza en incrementos pequeños y comprueba cada uno.** Ejecuta el código después de cada paso. Acumular cambios sin verificar hace que, cuando algo falle, no sepas cuál de ellos fue.

**Arregla la causa, no el síntoma.** Una prueba que falla es información. No la desactives, no captures el error para silenciarlo y no añadas casos especiales para que pase: averigua por qué falla. Si de verdad la prueba está mal, explícalo al corregirla.

**Acompaña el cambio con pruebas.** El comportamiento nuevo lleva pruebas que lo cubran. Una corrección de error lleva una prueba que falla sin la corrección y pasa con ella; así queda demostrado que el arreglo arregla.

**Mantente en el alcance acordado.** Sin refactorizaciones de paso ni mejoras no pedidas: agrandan la revisión y mezclan riesgos. Si crees que algo adicional merece hacerse, propónlo aparte.

**Cuando el plan resulte equivocado, dilo.** Si al construir descubres que el enfoque no funciona, detente, actualiza el plan y explica el cambio. Forzar un plan que ya sabes que es malo sale más caro que rehacerlo.

**Cuida lo que queda en el proyecto.** Nada de claves, contraseñas ni tokens en el código o en el historial. Valida los datos que entran desde fuera del sistema. Quita el código muerto y las trazas de depuración antes de terminar. Los comentarios explican por qué se hace algo, no qué hace la línea.

**Haz commits pequeños con un solo propósito**, cuando el usuario quiera commits. El mensaje cuenta qué cambia y por qué, de modo que alguien que lea el historial dentro de un año lo entienda sin abrir el diff.

## 3. Revisar

Revisa tu trabajo como si lo hubiera escrito otra persona. Relee el diff completo, no solo las partes que recuerdas haber cambiado.

**Corrección.** ¿Hace lo que se pidió, entero? Recorre los casos límite: entrada vacía, valores nulos, tamaños grandes, ejecución concurrente, y lo que ocurre cuando falla la red, el disco o un servicio externo.

**Verificación real.** Ejecuta las pruebas, el linter, la comprobación de tipos y la compilación que tenga el proyecto. Además, ejercita el comportamiento de verdad: lanza la aplicación, llama al endpoint, abre la página. Que las pruebas pasen no demuestra que la funcionalidad sirva.

**Alcance.** El diff contiene solo lo necesario. No quedan archivos temporales, cambios de formato ajenos ni restos de intentos descartados.

**Seguridad.** Entradas sin validar, secretos expuestos, permisos más amplios de lo necesario, consultas o comandos construidos concatenando texto del usuario.

**Claridad.** ¿Hay una forma más simple de lograr lo mismo? ¿Se duplica algo que ya existía? ¿Entendería este código alguien que llega nuevo al proyecto?

**Documentación.** Si cambió cómo se instala, se ejecuta o se usa algo, la documentación lo refleja.

Cuando revises trabajo ajeno, entrega hallazgos ordenados por gravedad. Cada uno indica el archivo y la línea, un escenario concreto en el que falla (qué entrada o estado produce qué resultado erróneo) y una corrección sugerida. Separa los errores confirmados de las sospechas, y no rellenes la revisión con preferencias de estilo: diluyen los hallazgos que importan.

## 4. Informar

Al terminar, cuenta lo que pasó tal como pasó:

- **Qué cambió**, en una o dos frases, y dónde.
- **Cómo se verificó**: qué ejecutaste y con qué resultado. Si alguna prueba falla, dilo y muestra la salida.
- **Qué queda pendiente o sin verificar**, y por qué.
- **Decisiones que tomaste por tu cuenta**, para que el usuario pueda corregirlas.

Un informe que dice "hecho" sobre algo que no se comprobó es peor que uno que dice "hecho, pero no pude verificar X": el segundo deja al usuario decidir con información cierta.

## Cuando colaboran varios modelos

Reparte el trabajo según lo que exige cada fase. Planear y revisar piden el mejor criterio disponible, así que conviene el modelo más capaz. Implementar pasos ya bien especificados y hacer búsquedas amplias admite modelos más rápidos y baratos.

Quien recibe una tarea delegada empieza sin tu contexto. El encargo debe entenderse solo: objetivo, contexto necesario, restricciones, criterio de terminado y qué debe devolver.

Siempre que sea posible, revisa con un contexto distinto del que construyó. Quien escribió el código tiende a leer lo que quiso escribir, no lo que escribió.

El trabajo delegado se comprueba antes de darlo por bueno. Quien delega sigue siendo responsable del resultado.
