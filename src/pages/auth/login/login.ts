import { getUsuarioLogueado, iniciarSesion } from "../../../utils/auth";
import { homePorRol } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

const mostrarMensaje = (texto: string, tipo: "error" | "exito"): void => {
  mensaje.textContent = texto;
  mensaje.className = `mensaje mensaje-${tipo}`;
};

// si viene del registro, aviso que la cuenta se creo y completo el email
const params = new URLSearchParams(window.location.search);
const emailRegistrado = params.get("registrado");
if (emailRegistrado) {
  mostrarMensaje("Cuenta creada. Ya podés iniciar sesión.", "exito");
  inputEmail.value = emailRegistrado;
  inputPassword.focus();
}

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const resultado = iniciarSesion(inputEmail.value, inputPassword.value);

  if (!resultado.ok) {
    mostrarMensaje(resultado.mensaje, "error");
    inputPassword.value = "";
    inputPassword.focus();
    return;
  }

  const usuario = getUsuarioLogueado();
  if (usuario) {
    window.location.href = homePorRol(usuario.role);
  }
});
