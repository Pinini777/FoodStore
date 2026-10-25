import type { IUser, IUserSession } from "../types/IUser";

// si mas adelante hay una API, solo hay que cambiar este archivo
const CLAVE_USUARIOS = "users";
const CLAVE_SESION = "userData";

export const getUsers = (): IUser[] => {
  const data = localStorage.getItem(CLAVE_USUARIOS);
  if (!data) return [];

  try {
    return JSON.parse(data) as IUser[];
  } catch {
    // si alguien rompio el json a mano, arranco de cero
    return [];
  }
};

export const saveUsers = (users: IUser[]): void => {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(users));
};

export const getSession = (): IUserSession | null => {
  const data = localStorage.getItem(CLAVE_SESION);
  if (!data) return null;

  try {
    return JSON.parse(data) as IUserSession;
  } catch {
    return null;
  }
};

export const saveSession = (session: IUserSession): void => {
  localStorage.setItem(CLAVE_SESION, JSON.stringify(session));
};

export const removeSession = (): void => {
  localStorage.removeItem(CLAVE_SESION);
};
