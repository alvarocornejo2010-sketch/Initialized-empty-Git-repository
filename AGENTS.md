# Instrucciones para modelos y agentes

## Cómo trabajar

El manual de trabajo (planear, construir, revisar e informar) está en `skills/planear-construir-revisar/SKILL.md`. Léelo antes de empezar cualquier tarea de más de un paso y síguelo, incluidos los archivos de apoyo que indique para la tarea.

Ese archivo es la única copia del manual. Si hay que cambiar cómo se trabaja, se cambia allí.

## Sobre este proyecto

Este repositorio contiene el código fuente de la skill `planear-construir-revisar`. Todo el contenido está escrito en español.

- `skills/planear-construir-revisar/SKILL.md`: el manual. Su cabecera (`name` y `description`) decide cuándo se activa la skill.
- `references/`: guías que se leen solo según el tipo de tarea (web, Python y datos, trabajo sin código).
- `assets/`: plantillas de plan, revisión e informe.
- `evals/`: tareas de prueba, una carpeta por caso, con sus archivos de entrada y sus criterios de calificación. No forman parte de la skill instalada.

La copia instalada en la cuenta de Claude no se actualiza sola. Después de cambiar la skill hay que volver a empaquetarla en un archivo `.skill` e instalarla de nuevo.
