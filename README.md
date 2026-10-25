# Food Store: TypeScript y Autenticación

Trabajo integrador de Programación III. Es la continuación del TP de JavaScript: la tienda ahora está hecha con **TypeScript + Vite** y tiene registro, login y protección de rutas según el rol del usuario (`admin` o `client`), usando `localStorage` como base de datos.

La estructura de carpetas sigue la del repositorio base [chiro45/proteger_rutas](https://github.com/chiro45/proteger_rutas).

**Página publicada:** https://pinini777.github.io/FoodStore/

## Instalación

Necesitás tener [Node.js](https://nodejs.org) instalado (yo usé la versión 24).

1. Clonar el repositorio y entrar a la carpeta:

   ```bash
   git clone https://github.com/Pinini777/FoodStore.git
   cd FoodStore
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Levantar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir la URL que aparece en la terminal (normalmente `http://localhost:5173`). La página principal te manda sola al login.

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Revisa los tipos con `tsc` y genera la versión final en `dist/` |
| `npm run preview` | Sirve la carpeta `dist/` para probar el build (en `http://localhost:4173/FoodStore/`) |
| `npm run deploy` | Hace el build y lo sube a la rama `gh-pages` (GitHub Pages) |

> Hay que abrirlo con Vite (`npm run dev` o `npm run preview`). Si abrís los `.html` con doble clic no funciona, porque el navegador no entiende TypeScript.

### GitHub Pages

En GitHub Pages la página no queda en la raíz sino en `/FoodStore/`. Por eso en `vite.config.ts` la `base` es `/FoodStore/` para el build y `/` para desarrollo, y las rutas que se arman desde TypeScript usan `import.meta.env.BASE_URL`.

## Usuarios de prueba

| Rol | Email | Contraseña |
|---|---|---|
| admin | `admin@foodstore.com` | `admin1234` |
| client | el que crees en la página de registro | |

El registro no tiene selector de rol, así que todos los usuarios nuevos son `client`. Para poder entrar al panel, la primera vez que se abre la página se crea solo el usuario admin de arriba.

## Cómo funciona

### Registro (`src/pages/auth/registro/`)

- Pide email, contraseña y repetir contraseña.
- Valida que las contraseñas coincidan, que tengan al menos 8 caracteres y que el email **no esté registrado** (no permite duplicados).
- Guarda el usuario en el array de la clave `"users"` del `localStorage`, con rol `client`.
- Después te manda al login con el email ya cargado.

### Login (`src/pages/auth/login/`)

- Busca en `"users"` un usuario con ese email y esa contraseña.
- Si existe, guarda la sesión en la clave `"userData"` y te manda a tu home: admin al panel y client a la tienda.
- Si no existe, muestra "Email o contraseña incorrectos".

### Protección de rutas (`src/main.ts`)

`main.ts` se carga en **todas** las páginas, antes que el script propio de cada una. La función `protegerRuta()` se fija en qué carpeta está la página:

| Página | Sin sesión | Con rol client | Con rol admin |
|---|---|---|---|
| `/pages/auth/` (login y registro) | Puede entrar | Va a la tienda | Va al panel |
| `/pages/client/` (tienda) | Va al login | Puede entrar | Puede entrar |
| `/pages/admin/` (panel) | Va al login | **Va a la tienda** | Puede entrar |
| `/` (index) | Va al login | Va a la tienda | Va al panel |

Para que no se pueda saltear:

- Las páginas arrancan ocultas (clase `cargando`) y solo se muestran cuando el guard las aprueba, así no se ve el contenido aunque sea un instante.
- El rol se toma del array `"users"` y no de `"userData"`. Si alguien cambia `"role": "admin"` a mano en el `localStorage`, igual no entra al panel.
- Como corre cada vez que se carga una página, recargar no saltea la protección. También vuelve a chequear si se vuelve con el botón "Atrás" después de cerrar sesión, o si se cierra sesión en otra pestaña.

**Cerrar sesión** borra `"userData"` y vuelve al login.

### Datos en localStorage

```text
users     -> IUser[]        (email, password, role)
userData  -> IUserSession   (email, role, loggedIn)
```

Todo el acceso al `localStorage` está en `src/utils/localStorage.ts`. Si más adelante hay una API, solo hay que cambiar ese archivo.

## Estructura

```text
TP_PinoEzequiel_FoodStore/
├── index.html                  redirige según la sesión
├── public/assets/img/          logo, dibujos (SVG) y fotos de los productos
├── src/
│   ├── main.ts                 guard de rutas
│   ├── data/productos.ts       categorías y productos
│   ├── pages/
│   │   ├── auth/login/         login.html + login.ts
│   │   ├── auth/registro/      registro.html + registro.ts
│   │   ├── admin/home/         panel de administración
│   │   └── client/home/        catálogo de productos
│   ├── styles/                 styles.css y login.css
│   ├── types/                  IUser, Rol, IProducto, Categoria, IResultado
│   └── utils/
│       ├── auth.ts             registro, login, logout y usuario logueado
│       ├── localStorage.ts     leer y guardar en localStorage
│       └── navigate.ts         rutas y redirecciones
├── tsconfig.json
└── vite.config.ts
```

## TypeScript

- `tsconfig.json` tiene `strict: true` y no se usa `any` en ningún archivo.
- `Rol` es `"client" | "admin"` y `Categoria` es la lista de categorías posibles, así no se puede escribir una que no exista.
- `IUser`, `IUserSession`, `IProducto` e `IResultado` definen la forma de cada dato.
- Los elementos del DOM están tipados (`HTMLFormElement`, `HTMLInputElement`, etc.).

## Otras cosas

- **Tienda:** las categorías y el buscador filtran los productos. El link "Panel Admin" solo aparece si el usuario es admin.
- **Panel admin:** la tabla se arma desde los datos. "Guardar Producto" agrega una fila y "Eliminar" la saca. Por ahora no se guarda: al recargar vuelve a como estaba.
- **Seguridad:** guardar usuarios y contraseñas en el `localStorage` no es seguro, cualquiera los puede ver desde las herramientas del navegador. Está hecho así porque lo pide el TP; en un proyecto real la validación va en el backend.
- **Fuentes e imágenes:** Fraunces y Nunito de Google Fonts. Las fotos son de Unsplash.
