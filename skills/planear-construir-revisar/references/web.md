# Web: JavaScript, TypeScript, React y Next.js

## Antes de cambiar nada

**Los scripts de `package.json` dicen cómo se verifica este proyecto.** Lee qué scripts existen (`lint`, `test`, `typecheck`, `build`) y usa esos, no los que supones.

**El lockfile dice qué gestor de paquetes usar.** `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json` o `bun.lock`. Usar otro gestor crea un segundo lockfile y versiones distintas de las que el equipo tiene instaladas.

**Mira las versiones instaladas antes de escribir contra una API.** Next.js y React cambian entre versiones mayores. Comprueba la versión en `package.json` y, si dudas de cómo funciona algo en esa versión, consulta su documentación en lugar de fiarte de la memoria.

**En Next.js, identifica el enrutador.** Una carpeta `app/` indica App Router; `pages/` indica Pages Router. Las convenciones de datos, rutas y componentes son distintas y no se mezclan dentro de una misma ruta.

## Al construir

**Componentes de servidor por defecto.** Añade `'use client'` solo donde haga falta estado, efectos o APIs del navegador, y lo más abajo posible en el árbol. Cada componente de cliente aumenta el JavaScript que descarga el usuario.

**Los secretos se quedan en el servidor.** El acceso a base de datos y las claves viven en código de servidor. Una variable de entorno con prefijo `NEXT_PUBLIC_` acaba en el navegador de cualquier visitante.

**Los route handlers y las server actions son puntos de entrada públicos.** Valida su entrada y comprueba permisos igual que en cualquier API, aunque solo los llame tu propia interfaz.

**No silencies al compilador.** `any`, `@ts-ignore` o `as` para acallar un error de tipos equivalen a desactivar una prueba que falla. Corrige el tipo.

**Cubre todos los estados de la interfaz**: cargando, vacío, error y con datos. El camino feliz es solo uno de los cuatro.

**Accesibilidad básica**: elementos semánticos (`button` para acciones, `a` para navegar), etiquetas en los campos de formulario y uso completo con teclado.

## Verificar

1. Comprobación de tipos, linter y pruebas, con los scripts del proyecto.
2. **Compilación de producción.** Detecta errores que el modo desarrollo deja pasar: tipos en la frontera entre servidor y cliente, fallos de prerenderizado, importaciones que solo existen en el servidor.
3. **Abre la página y usa lo que cambiaste.** Mira la consola del navegador: errores, avisos de hidratación, peticiones fallidas. Si el cambio es visual, compruébalo también en ancho de móvil.
4. Para un endpoint: llámalo con entrada válida, con entrada inválida y sin autenticación.

Si no puedes abrir un navegador en este entorno, dilo en el informe. No presentes como verificado un cambio visual que no has visto.

## En la revisión, busca además

- Texto del usuario insertado como HTML (`dangerouslySetInnerHTML`, `innerHTML`).
- Efectos con dependencias incompletas o sin función de limpieza.
- `key` ausente o basada en el índice en listas que se reordenan.
- Peticiones en cascada que podrían hacerse en paralelo, o la misma petición repetida en varios componentes.
- Una biblioteca pesada importada en un componente de cliente para un uso pequeño.
