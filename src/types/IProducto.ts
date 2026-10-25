import type { Categoria } from "./Categoria";

export interface IProducto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string; // foto del producto
  sticker: string; // dibujito que va en la esquina
  categoria: Categoria;
  stock: number;
}
