// import type { Product } from "../types/product";

// Recupera el carrito desde localStorage
// export const getCart = (): Product[] => {
//   const data = localStorage.getItem("cart");
//   return data ? JSON.parse(data) as Product[] : [];
// };


// Recupera el carrito desde localStorage
// export const getCart = (): Map<number, number> => {
//   const data = localStorage.getItem("cart");
//   if (!data) return new Map();

//   // JSON no soporta Map directamente, así que lo guardamos como array de pares
//   const entries: [number, number][] = JSON.parse(data);
//   return new Map(entries);
// };

//Crea el map -> producto.id, cantidad
// const cartMap = new Map<number, number>();


// export const getCart = (): Record<number, number> => {
//   return JSON.parse(localStorage.getItem("cart") || "{}");
// };

// export const addCart = (p: Product) => {
//   const cart = getCart();

//   let currentAmount: number;

//   // Si el producto ya existe en el carrito
//   if (cart[p.id] !== undefined) {
//     currentAmount = cart[p.id];
//     console.log(`DEBUG: Producto con id=${p.id} ya estaba en el carrito con cantidad=${currentAmount}`);
//   } else {
//     currentAmount = 0;
//     console.log(`DEBUG: Producto con id=${p.id} no estaba en el carrito, inicializando en cantidad=0`);
//   }

//   // Actualizamos la cantidad sumando 1
//   cart[p.id] = currentAmount + 1;
//   console.log(`DEBUG: Producto con id=${p.id} actualizado a cantidad=${cart[p.id]}`);

//   // Guardamos en localStorage
//   localStorage.setItem("cart", JSON.stringify(cart));
//   console.log("DEBUG: Carrito guardado en localStorage:", cart);
// };


// export const clearCart = () => {
//   localStorage.removeItem("cart");
//   console.log("DEBUG: Carrito eliminado de localStorage (clave 'cart' borrada)");
// };



