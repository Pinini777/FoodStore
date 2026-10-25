import type { Categoria } from "../../../types/Categoria";
import type { IProducto } from "../../../types/IProducto";
import { categorias, productos } from "../../../data/productos";
import { getUsuarioLogueado, logout } from "../../../utils/auth";

const tbody = document.getElementById("tabla-productos-body") as HTMLTableSectionElement;
const form = document.getElementById("form-producto") as HTMLFormElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const inputPrecio = document.getElementById("precio") as HTMLInputElement;
const inputStock = document.getElementById("stock") as HTMLInputElement;
const selectCategoria = document.getElementById("categoria") as HTMLSelectElement;
const inputDescripcion = document.getElementById("descripcion") as HTMLTextAreaElement;
const mensajeForm = document.getElementById("mensaje-form") as HTMLParagraphElement;
const usuarioActual = document.getElementById("usuario-actual") as HTMLParagraphElement;
const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;

// copia de los productos para poder agregar y borrar sin tocar data
// (todavia no se guarda en ningun lado, al recargar vuelve a como estaba)
const inventario: IProducto[] = [...productos];

const claseStock = (stock: number): string => {
  if (stock === 0) return "stock stock-agotado";
  if (stock <= 5) return "stock stock-bajo";
  return "stock";
};

const crearFila = (producto: IProducto): HTMLTableRowElement => {
  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td class="num">${producto.id}</td>
    <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50" height="50"></td>
    <td>${producto.nombre}</td>
    <td>${producto.categoria}</td>
    <td class="num">$${producto.precio}</td>
    <td class="centro"><span class="${claseStock(producto.stock)}">${producto.stock}</span></td>
    <td class="acciones">
      <a href="#" class="link-editar">Editar</a> |
      <a href="#" class="link-peligro">Eliminar</a>
    </td>
  `;

  const linkEditar = fila.querySelector(".link-editar") as HTMLAnchorElement;
  linkEditar.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    alert("La edición de productos todavía no está disponible.");
  });

  const linkEliminar = fila.querySelector(".link-peligro") as HTMLAnchorElement;
  linkEliminar.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    if (!confirm(`¿Eliminar "${producto.nombre}"?`)) return;

    const posicion = inventario.findIndex((p) => p.id === producto.id);
    inventario.splice(posicion, 1);
    cargarTabla();
  });

  return fila;
};

const cargarTabla = (): void => {
  tbody.innerHTML = "";
  inventario.forEach((producto) => {
    tbody.appendChild(crearFila(producto));
  });
};

const cargarOpcionesCategoria = (): void => {
  categorias.forEach((categoria) => {
    const opcion = document.createElement("option");
    opcion.value = categoria;
    opcion.textContent = categoria;
    selectCategoria.appendChild(opcion);
  });
};

const siguienteId = (): number => {
  const ids = inventario.map((p) => p.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const nuevoProducto: IProducto = {
    id: siguienteId(),
    nombre: inputNombre.value.trim(),
    descripcion: inputDescripcion.value.trim(),
    precio: Number(inputPrecio.value),
    // un producto nuevo no tiene foto todavia, uso el logo
    imagen: `${import.meta.env.BASE_URL}assets/img/logo.svg`,
    sticker: `${import.meta.env.BASE_URL}assets/img/logo.svg`,
    categoria: selectCategoria.value as Categoria,
    stock: Number(inputStock.value),
  };

  inventario.push(nuevoProducto);
  cargarTabla();
  form.reset();
  mensajeForm.textContent = `Se agregó "${nuevoProducto.nombre}" a la tabla.`;
});

const mostrarUsuario = (): void => {
  const usuario = getUsuarioLogueado();
  if (usuario) usuarioActual.textContent = `Hola, ${usuario.email}`;
};

buttonLogout.addEventListener("click", () => {
  logout();
});

mostrarUsuario();
cargarOpcionesCategoria();
cargarTabla();
