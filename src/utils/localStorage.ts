import type { IUser, IUserSession } from "../types/IUser";

// si mas adelante hay una API, solo hay que cambiar este archivo
enum ClaveStorage {
  USUARIOS = "users",
  SESION = "userData",
}

export const getUsers = (): IUser[] => {
  const data = localStorage.getItem(ClaveStorage.USUARIOS);
  if (!data) return [];

  try {
    return JSON.parse(data) as IUser[];
  } catch {
    // si alguien rompio el json a mano, arranco de cero
    return [];
  }
};

export const saveUsers = (users: IUser[]): void => {
  localStorage.setItem(ClaveStorage.USUARIOS, JSON.stringify(users));
};

export const getSession = (): IUserSession | null => {
  const data = localStorage.getItem(ClaveStorage.SESION);
  if (!data) return null;

  try {
    return JSON.parse(data) as IUserSession;
  } catch {
    return null;
  }
};

export const saveSession = (session: IUserSession): void => {
  localStorage.setItem(ClaveStorage.SESION, JSON.stringify(session));
};

export const removeSession = (): void => {
  localStorage.removeItem(ClaveStorage.SESION);
};
