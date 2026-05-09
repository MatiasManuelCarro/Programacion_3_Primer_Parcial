import type { CartItem } from "../types/cartItem";
import type { Product } from "../types/product";

// localStorage.removeItem("cart");

//funciones del carrito
export const getCart = (): CartItem[] => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) as CartItem[] : [];
};

// export const getCartCount = (product: Product): number => {
//     const cart = getCart();
//     const amount = cart.find(p => p.product.id === product.id)
//     if (amount && amount.quantity >= 1){
//         return amount.quantity
//     } else {
//         return 0; //si existe en el carrito devuelve 0
//     }
// }


export const getCartCount = (): number => {
    const cart = getCart();
    let count = 0;

    for (const item of cart) {
        count += item.quantity;
    }

    return count;
}

export const addToCart = (product: Product): void => { //deberia no necesitar ningun parametro 
    const cart = getCart();
    const exists = cart.find(p => p.product.id === product.id)

    if (exists) {
        exists.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }

    saveCart(cart);
}

export const minusOneCart = (product: Product): void => {
    const cart = getCart();
    const exists = cart.find(p => p.product.id === product.id)

    if (exists && exists.quantity > 1) {
        exists.quantity--;
    }

    saveCart(cart);
}

export const deleteProduct = (product: Product): void => {
    const cart = getCart();
    const exists = cart.find(p => p.product.id === product.id)
    if (exists) {
        const newCart = cart.filter(p => p.product.id !== product.id);
        saveCart(newCart);
    }
}

const saveCart = (cart: CartItem[]): void => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
    localStorage.removeItem("cart");
    console.log("Carrito eliminado de localStorage");
};
