import type { IUser, IUserSession } from "../types/IUser";
import type { IResultado } from "../types/IResultado";
import {
  getUsers,
  saveUsers,
  getSession,
  saveSession,
  removeSession,
} from "./localStorage";
import { navigate, RUTAS } from "./navigate";

// como el registro no tiene selector de rol, todos los que se registran son "client".
// este admin se crea solo la primera vez para poder entrar al panel
const ADMIN_INICIAL: IUser = {
  email: "admin@foodstore.com",
  password: "admin1234",
  role: "admin",
};

export const crearAdminInicial = (): void => {
  const users = getUsers();
  const hayAdmin = users.some((user) => user.role === "admin");

  if (!hayAdmin) {
    users.push(ADMIN_INICIAL);
    saveUsers(users);
  }
};

const normalizarEmail = (email: string): string => email.trim().toLowerCase();

export const registrarUsuario = (email: string, password: string): IResultado => {
  const emailLimpio = normalizarEmail(email);
  const users = getUsers();

  if (!emailLimpio || !password) {
    return { ok: false, mensaje: "Completá el email y la contraseña." };
  }

  if (password.length < 8) {
    return { ok: false, mensaje: "La contraseña tiene que tener al menos 8 caracteres." };
  }

  const yaExiste = users.some((user) => user.email === emailLimpio);
  if (yaExiste) {
    return { ok: false, mensaje: "Ya hay una cuenta registrada con ese email." };
  }

  const nuevoUsuario: IUser = {
    email: emailLimpio,
    password: password,
    role: "client",
  };

  users.push(nuevoUsuario);
  saveUsers(users);

  return { ok: true, mensaje: "Cuenta creada. Ya podés iniciar sesión." };
};

export const iniciarSesion = (email: string, password: string): IResultado => {
  const emailLimpio = normalizarEmail(email);
  const usuario = getUsers().find(
    (user) => user.email === emailLimpio && user.password === password
  );

  if (!usuario) {
    return { ok: false, mensaje: "Email o contraseña incorrectos." };
  }

  const session: IUserSession = {
    email: usuario.email,
    role: usuario.role,
    loggedIn: true,
  };
  saveSession(session);

  return { ok: true, mensaje: "" };
};

// devuelve el usuario logueado o null.
// el rol lo saco de "users" y no de "userData", asi no alcanza con
// cambiar el rol a mano en el localStorage para entrar al admin
export const getUsuarioLogueado = (): IUserSession | null => {
  const session = getSession();
  if (!session || !session.loggedIn) return null;

  const usuario = getUsers().find((user) => user.email === session.email);
  if (!usuario) {
    removeSession();
    return null;
  }

  return { email: usuario.email, role: usuario.role, loggedIn: true };
};

export const logout = (): void => {
  removeSession();
  navigate(RUTAS.login);
};
