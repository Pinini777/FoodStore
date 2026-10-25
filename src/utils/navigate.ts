import type { Rol } from "../types/Rol";

// BASE_URL es "/" en desarrollo y "/FoodStore/" en GitHub Pages (ver vite.config.ts)
const BASE = import.meta.env.BASE_URL;

export const RUTAS = {
  login: `${BASE}src/pages/auth/login/login.html`,
  registro: `${BASE}src/pages/auth/registro/registro.html`,
  adminHome: `${BASE}src/pages/admin/home/home.html`,
  clientHome: `${BASE}src/pages/client/home/home.html`,
};

// uso replace para que el boton "atras" no vuelva a la pagina de la que me echaron
export const navigate = (ruta: string): void => {
  window.location.replace(ruta);
};

export const homePorRol = (rol: Rol): string => {
  return rol === "admin" ? RUTAS.adminHome : RUTAS.clientHome;
};
