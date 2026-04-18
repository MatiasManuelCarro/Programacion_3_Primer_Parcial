import type { Product } from "../../../types/product";
import { getCart, clearCart } from "../../../utils/utils";



const loadCart = (cart: Product[]) => {
    const cartContainer = document.getElementById("cart-container") as HTMLDivElement;
    cartContainer.innerHTML = "";

    cart.forEach((product) => {
        const productCard: HTMLElement = document.createElement("article");
        productCard.classList.add("cart-products");
        productCard.innerHTML = `
        <div class="cart-img">
        <img src="/images/${product.imagen}" alt="Imagen de ${product.nombre}" />
        </div>
        <h3 class="cart-name">${product.nombre}</h3>
        <p class="cart-description">${product.descripcion}</p>
        <p class="cart-price">Precio: $${product.precio}</p>
        <div class="buttons">
        </div>
    `;
        cartContainer.appendChild(productCard);
    });
};


// Al cargar la página, renderizamos el carrito
document.addEventListener("DOMContentLoaded", () => {
    const cart = getCart();
    console.log("Carrito cargado:", cart);
    loadCart(cart);
});



// Listener para el botón "Limpiar Carrito"
document.getElementById("clear-cart")?.addEventListener("click", () => {
  clearCart();            // borra localStorage
  loadCart(getCart());    // recarga el contenedor vacío
});