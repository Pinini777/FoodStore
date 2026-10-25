// "guard": se carga en todas las paginas y decide si el usuario puede verla o no
import { Rol } from "./types/Rol";
import { crearAdminInicial, getUsuarioLogueado } from "./utils/auth";
import { navigate, homePorRol, RUTAS } from "./utils/navigate";

// que rol hace falta segun la carpeta de la pagina.
// null = pagina publica (login y registro)
const rolNecesario = (ruta: string): Rol | null => {
  if (ruta.includes("/pages/admin/")) return Rol.ADMIN;
  if (ruta.includes("/pages/client/")) return Rol.CLIENT;
  return null;
};

// las paginas arrancan ocultas (clase "cargando") para que no se vea
// el contenido antes de chequear la sesion
const mostrarPagina = (): void => {
  document.body.classList.remove("cargando");
};

export const protegerRuta = (): void => {
  const ruta = window.location.pathname;
  const usuario = getUsuarioLogueado();
  const esPaginaAuth = ruta.includes("/pages/auth/");

  // login y registro: si ya tiene sesion lo mando a su home
  if (esPaginaAuth) {
    if (usuario) {
      navigate(homePorRol(usuario.role));
      return;
    }
    mostrarPagina();
    return;
  }

  // el resto de las paginas necesitan sesion
  if (!usuario) {
    navigate(RUTAS.login);
    return;
  }

  const rol = rolNecesario(ruta);

  // index.html (la raiz) no tiene contenido, solo redirige
  if (rol === null) {
    navigate(homePorRol(usuario.role));
    return;
  }

  // un client no puede entrar a /admin/, lo mando a su zona.
  // el admin si puede ver la tienda
  if (rol === Rol.ADMIN && usuario.role !== Rol.ADMIN) {
    navigate(RUTAS.clientHome);
    return;
  }

  mostrarPagina();
};

crearAdminInicial();
protegerRuta();

// si vuelve con el boton "atras" despues de cerrar sesion, el navegador puede
// mostrar la pagina guardada en cache sin volver a correr el script
window.addEventListener("pageshow", (e: PageTransitionEvent) => {
  if (e.persisted) protegerRuta();
});

// si cierra sesion en otra pestaña, esta tambien se entera
window.addEventListener("storage", () => {
  protegerRuta();
});
