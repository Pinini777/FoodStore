import type { Rol } from "./Rol";

// usuario tal como se guarda en la "base de datos" (clave "users")
export interface IUser {
  email: string;
  password: string;
  role: Rol;
}

// lo que se guarda en "userData" cuando alguien inicia sesion
// (no guardo la contraseña en la sesion)
export interface IUserSession {
  email: string;
  role: Rol;
  loggedIn: boolean;
}
