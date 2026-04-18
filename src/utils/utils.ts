import type { Product } from "../types/product";

// Recupera el carrito desde localStorage
export const getCart = (): Product[] => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) as Product[] : [];
};

// Agrega un producto al carrito
export const addCart = (p: Product) => {
  const cart = getCart();
  cart.push(p);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Carrito actualizado:", cart);
};

export const clearCart = () => {
  localStorage.removeItem("cart"); 
  console.log("Carrito vaciado");
};