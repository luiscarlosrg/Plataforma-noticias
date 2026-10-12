# NovaNews

Portal de noticias construido como aplicación de una sola página (SPA) con Angular. Permite consultar noticias y categorías, ver el detalle de una noticia, guardar favoritos y administrar noticias en el navegador.

## Stack

- Angular 20 con componentes standalone y Angular Router.
- TypeScript 5.9.
- Tailwind CSS 4.
- RxJS y `HttpClient` para cargar los archivos JSON iniciales.
- `localStorage` para conservar noticias y favoritos en el navegador.
- GitHub Actions y GitHub Pages para compilar y publicar la aplicación.

## Requisitos

- Node.js 20.19 o posterior.
- npm.

## Instalación y desarrollo

Instala las dependencias:

```bash
npm ci
```

Inicia el servidor de desarrollo:

```bash
npm start
```

Angular CLI mostrará la dirección local, normalmente `http://localhost:4200/`.

Comandos disponibles:

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo de Angular. |
| `npm run build` | Genera la compilación de producción en `dist/plataforma-noticias/browser`. |
| `npm run watch` | Vuelve a compilar en modo desarrollo cuando detecta cambios. |
| `npm run dev:css` | Regenera `css/output.css` a partir de `css/input.css` y observa cambios de estilos. |

Si cambias clases de Tailwind, ejecuta `npm run dev:css` mientras desarrollas y conserva el CSS generado actualizado.

## Estructura del proyecto

```text
src/
  app/
    pages/                 Componentes de cada vista/ruta
    app.component.ts       Estructura compartida: navegación y pie de página
    app.routes.ts           Configuración de rutas
    models.ts               Tipos de noticia y categoría
    news-card.component.ts  Tarjeta reutilizable de noticia
    news.service.ts         Carga, creación, eliminación y favoritos
  index.html                Documento HTML raíz de Angular
  main.ts                   Punto de entrada y configuración de proveedores
data/
  noticias.json             Noticias iniciales
  categorias.json           Categorías iniciales
css/
  input.css                 Entrada de Tailwind CSS
  output.css                Hoja de estilos usada por Angular
image/                      Imágenes y favicon
.github/workflows/
  deploy.yml                Compilación y publicación en GitHub Pages
angular.json                Configuración de build, activos y estilos
package.json                Dependencias y comandos npm
```

## Arquitectura y rutas

La aplicación se inicia desde `src/main.ts`, que configura `HttpClient` y el router. `AppComponent` mantiene el encabezado, los enlaces de navegación, el pie de página y el `RouterOutlet`, donde Angular muestra la página activa.

Las rutas están definidas en `src/app/app.routes.ts`:

| Ruta | Vista |
| --- | --- |
| `/` | Inicio y noticias destacadas |
| `/noticias` | Crear y eliminar noticias |
| `/categorias` | Listado de categorías |
| `/categoria/:categoria` | Noticias filtradas por categoría |
| `/favoritos` | Noticias guardadas como favoritas |
| `/contacto` | Formulario de contacto |
| `/noticia/:id` | Detalle de una noticia |

Los componentes de página están en `src/app/pages/`. `NewsCardComponent` comparte la presentación de las noticias entre inicio, favoritos, filtro por categoría y gestión.

## Flujo de datos y persistencia

`NewsService` concentra la lectura y modificación de datos:

1. **Noticias:** al solicitar noticias, primero lee la clave `noticias` de `localStorage`. Si todavía no existe, carga `data/noticias.json`, guarda ese contenido en el navegador y lo devuelve.
2. **Categorías:** carga `data/categorias.json` mediante `HttpClient`.
3. **Crear noticia:** calcula un identificador nuevo, agrega la noticia y guarda la lista en `localStorage`.
4. **Eliminar noticia:** quita la noticia de la lista y también elimina su identificador de favoritos.
5. **Favoritos:** los identificadores se guardan en la clave `favoritos`; el servicio permite consultar y alternar el estado de favorito.

Los datos guardados son locales al navegador y al origen del sitio. No hay una API ni una base de datos compartida: otro usuario o navegador no verá los cambios. Para reiniciar los datos iniciales, elimina las claves `noticias` y `favoritos` del almacenamiento local del sitio.

El formulario de contacto valida los campos y presenta una confirmación en pantalla, pero no envía mensajes a un servidor.

## Compilación

```bash
npm run build
```

La salida de producción se genera en `dist/plataforma-noticias/browser`. Angular aplica optimizaciones de producción y nombres con hash a los archivos compilados.

## Publicación en GitHub Pages

El workflow `.github/workflows/deploy.yml` se ejecuta al hacer `push` a `main` y también puede iniciarse manualmente desde la pestaña **Actions**. Instala dependencias con `npm ci`, compila usando el nombre del repositorio como base URL, crea un `404.html` para respaldar rutas de la SPA y publica el resultado con GitHub Pages.

Configuración inicial del repositorio:

1. En GitHub, abre **Settings → Pages**.
2. Selecciona **GitHub Actions** como *Build and deployment source*.
3. Fusiona los cambios en `main` o ejecuta manualmente el workflow.
4. Consulta el resultado y la URL del sitio en **Actions** o en **Settings → Pages**.
