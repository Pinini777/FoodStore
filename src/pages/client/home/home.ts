import type { Categoria } from "../../../types/Categoria";
import type { IProducto } from "../../../types/IProducto";
import { Rol } from "../../../types/Rol";
import { categorias, productos } from "../../../data/productos";
import { getUsuarioLogueado, logout } from "../../../utils/auth";

const listaCategorias = document.getElementById("lista-categorias") as HTMLUListElement;
const contenedorProductos = document.getElementById("contenedor-productos") as HTMLElement;
const tituloProductos = document.getElementById("titulo-productos") as HTMLHeadingElement;
const sinResultados = document.getElementById("sin-resultados") as HTMLParagraphElement;
const formBusqueda = document.getElementById("form-busqueda") as HTMLFormElement;
const inputBusqueda = document.getElementById("input-busqueda") as HTMLInputElement;
const usuarioActual = document.getElementById("usuario-actual") as HTMLParagraphElement;
const itemAdmin = document.getElementById("item-admin") as HTMLLIElement;
const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;

// "Todas" no es una categoria, por eso el filtro puede ser una Categoria o "Todas"
let categoriaActual: Categoria | "Todas" = "Todas";

const crearCardProducto = (producto: IProducto): HTMLElement => {
  const article = document.createElement("article");
  article.classList.add("producto-card");

  article.innerHTML = `
    <div class="producto-media">
      <img class="producto-foto" src="${producto.imagen}" alt="${producto.nombre}">
      <img class="producto-sticker" src="${producto.sticker}" alt="">
    </div>
    <div class="producto-body">
      <span class="producto-categoria">${producto.categoria}</span>
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p class="producto-precio">Precio: <strong>$${producto.precio.toFixed(2)}</strong></p>
      <div class="producto-acciones">
        <button type="button" class="btn btn-secundario">Ver Detalles</button>
        <button type="button" class="btn btn-agregar">Agregar al Carrito</button>
      </div>
    </div>
  `;

  const botonAgregar = article.querySelector(".btn-agregar") as HTMLButtonElement;
  botonAgregar.addEventListener("click", () => {
    alert(`Agregaste "${producto.nombre}" al carrito`);
  });

  return article;
};

const cargarProductos = (lista: IProducto[]): void => {
  contenedorProductos.innerHTML = "";
  lista.forEach((producto) => {
    contenedorProductos.appendChild(crearCardProducto(producto));
  });
  sinResultados.classList.toggle("oculto", lista.length > 0);
};

// aplica la categoria elegida y lo que se escribio en el buscador
const filtrarProductos = (): void => {
  const texto = inputBusqueda.value.trim().toLowerCase();

  const filtrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActual === "Todas" || producto.categoria === categoriaActual;
    const coincideTexto = producto.nombre.toLowerCase().includes(texto);
    return coincideCategoria && coincideTexto;
  });

  tituloProductos.textContent =
    categoriaActual === "Todas" ? "Productos Destacados" : categoriaActual;
  cargarProductos(filtrados);
};

const crearItemCategoria = (nombre: Categoria | "Todas"): HTMLLIElement => {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = nombre;
  if (nombre === categoriaActual) link.classList.add("activa");

  link.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    categoriaActual = nombre;
    listaCategorias.querySelectorAll("a").forEach((a) => a.classList.remove("activa"));
    link.classList.add("activa");
    filtrarProductos();
  });

  item.appendChild(link);
  return item;
};

const cargarCategorias = (): void => {
  listaCategorias.appendChild(crearItemCategoria("Todas"));
  categorias.forEach((categoria) => {
    listaCategorias.appendChild(crearItemCategoria(categoria));
  });
};

const mostrarUsuario = (): void => {
  const usuario = getUsuarioLogueado();
  if (!usuario) return;

  usuarioActual.textContent = `Hola, ${usuario.email}`;
  // el link al panel solo lo ve el admin
  itemAdmin.classList.toggle("oculto", usuario.role !== Rol.ADMIN);
};

formBusqueda.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  filtrarProductos();
});

inputBusqueda.addEventListener("input", filtrarProductos);

buttonLogout.addEventListener("click", () => {
  logout();
});

mostrarUsuario();
cargarCategorias();
cargarProductos(productos);
