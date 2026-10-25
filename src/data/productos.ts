// datos de la tienda (despues esto se va a reemplazar por una API)
import type { Categoria } from "../types/Categoria";
import type { IProducto } from "../types/IProducto";

export const categorias: Categoria[] = [
  "Hamburguesas",
  "Pizzas",
  "Papas Fritas",
  "Bebidas",
  "Postres",
];

// las imagenes estan en /public. Les agrego BASE_URL para que anden
// tambien en GitHub Pages (ahi la pagina esta en /FoodStore/)
const IMG = `${import.meta.env.BASE_URL}assets/img`;

export const productos: IProducto[] = [
  {
    id: 1,
    nombre: "Hamburguesa Triple",
    descripcion: "Hamburguesa triple smash con mucho cheddar.",
    precio: 15000,
    imagen: `${IMG}/fotos/hamburguesa.jpg`,
    sticker: `${IMG}/hamburguesa.svg`,
    categoria: "Hamburguesas",
    stock: 12,
  },
  {
    id: 2,
    nombre: "Pizza Muzzarella",
    descripcion: "Salsa de tomate casera y muzzarella abundante.",
    precio: 14000,
    imagen: `${IMG}/fotos/pizza.jpg`,
    sticker: `${IMG}/pizza.svg`,
    categoria: "Pizzas",
    stock: 5,
  },
  {
    id: 3,
    nombre: "Papas con Cheddar",
    descripcion: "Papas rústicas bañadas en cheddar fundido y verdeo.",
    precio: 11000,
    imagen: `${IMG}/fotos/papas.jpg`,
    sticker: `${IMG}/papas.svg`,
    categoria: "Papas Fritas",
    stock: 0,
  },
  {
    id: 4,
    nombre: "Gaseosa Cola",
    descripcion: "Vaso grande de 500 ml, bien helada y con mucho hielo.",
    precio: 10000,
    imagen: `${IMG}/fotos/gaseosa.jpg`,
    sticker: `${IMG}/gaseosa.svg`,
    categoria: "Bebidas",
    stock: 40,
  },
  {
    id: 5,
    nombre: "Malteada Cookies",
    descripcion: "Batido de vainilla con galletitas, crema y salsa de chocolate.",
    precio: 12500,
    imagen: `${IMG}/fotos/malteada.jpg`,
    sticker: `${IMG}/malteada.svg`,
    categoria: "Bebidas",
    stock: 15,
  },
  {
    id: 6,
    nombre: "Dona Glaseada",
    descripcion: "Torre de donas con glaseado de chocolate y granas de colores.",
    precio: 10500,
    imagen: `${IMG}/fotos/dona.jpg`,
    sticker: `${IMG}/dona.svg`,
    categoria: "Postres",
    stock: 24,
  },
];
