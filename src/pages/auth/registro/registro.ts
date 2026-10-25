import { registrarUsuario } from "../../../utils/auth";
import { RUTAS } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const inputConfirmar = document.getElementById("confirmar") as HTMLInputElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

const mostrarError = (texto: string): void => {
  mensaje.textContent = texto;
  mensaje.className = "mensaje mensaje-error";
};

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  if (inputPassword.value !== inputConfirmar.value) {
    mostrarError("Las contraseñas no coinciden.");
    inputConfirmar.focus();
    return;
  }

  const resultado = registrarUsuario(inputEmail.value, inputPassword.value);

  if (!resultado.ok) {
    mostrarError(resultado.mensaje);
    return;
  }

  // lo mando al login con el email ya cargado
  const email = encodeURIComponent(inputEmail.value.trim().toLowerCase());
  window.location.href = `${RUTAS.login}?registrado=${email}`;
});
