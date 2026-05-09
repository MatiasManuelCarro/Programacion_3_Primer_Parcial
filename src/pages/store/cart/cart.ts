import type { Product } from "../../../types/product";
import { getProducts } from "../../../data/data";
import { getCart, clearCart, minusOneCart, addToCart, deleteProduct, getCartCount } from "../../../utils/localStorage";

// export const updateCartQuantity = (id: number, newAmount: number) => {
//     const cart = getCart();

//     if (newAmount <= 0) {
//         delete cart[id]; //en 0 se elimina 
//     } else {
//         cart[id] = newAmount;
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
// };


const loadCart = () => {
    const cartContainer = document.getElementById("cart-container") as HTMLDivElement;
    const cartEmptyMessage = document.getElementById("cart-message") as HTMLElement;
    cartContainer.innerHTML = "";

    let total = 0;
    //obtiene el cart
    const cart = getCart();

    // chequea si cart esta vacio -> muestra el mensaje
    if (Object.keys(cart).length === 0) {
        cartEmptyMessage.innerHTML = "No hay ningun producto en el carrito."
        cartEmptyMessage.style.display = "block";
    } else {
        cartEmptyMessage.innerHTML = `Total de productos en el carrito: <span class="cart-count">${getCartCount()}</span>`
        cartEmptyMessage.style.display = "block";
    }

    for (const item of cart) {
        const product = item.product; //extrae el producto
        const amount = item.quantity; //extrae la cantidad

        //calculo de subtotal y total
        const subTotal = product.precio * amount;
        total += subTotal;

        if (!product) continue;

        //renderizado del producto
        const productCard: HTMLElement = document.createElement("article");
        productCard.classList.add("cart-products");
        productCard.innerHTML = `
        <div class="cart-img">
        <img src="/images/${product.imagen}" alt="Imagen de ${product.nombre}" />
        </div>
        <h3 class="cart-name">${product.nombre}</h3>
        <p class="cart-description">${product.descripcion}</p>
        <p class="cart-price">Precio: $${product.precio}</p>
        <p class="cart-amount">
        <a href="#" class="link-amount minus" data-id="${product.id}">-</a>
        Cantidad: ${amount}
        <a href="#" class="link-amount plus" data-id="${product.id}">+</a>
        </p>
        <p class="cart-subtotal">Subtotal: $${subTotal}</p>
        <div class="buttons">
        <button class="btn-cart delete" data-id="${product.id}">Eliminar</button>
        </div>
    `;
        cartContainer.appendChild(productCard);

        //carga los listeners de botones
        cartListeners(productCard, product, amount);
    }

    // Actualizar el total
    const summary = document.querySelector(".cart-summary h3");
    if (summary) {
        summary.textContent = `Total: $${total}`;
    }

};


function cartListeners(productCard: HTMLElement, product: Product, amount: number) {
    const minusLink = productCard.querySelector(".link-amount.minus") as HTMLAnchorElement;
    const plusLink = productCard.querySelector(".link-amount.plus") as HTMLAnchorElement;
    const deleteBtn = productCard.querySelector(".btn-cart.delete") as HTMLButtonElement;

    // Bloqueo visual de botones
    if (amount >= product.stock) {
        plusLink.style.color = "var(--color-borde)";
        plusLink.style.cursor = "default";
    } else if (amount === 1) {
        minusLink.style.color = "var(--color-borde)";
        minusLink.style.cursor = "default";
    }

    // Listeners
    minusLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (amount > 1) { //desactiva la funcion del boton si es 1
            minusOneCart(product);
            loadCart();
        }
    });

    plusLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (amount < product.stock) { //desactiva la funcion del boton si ya alcanzo el limite de stock
            addToCart(product);
            loadCart();
        }
    });

    deleteBtn.addEventListener("click", () => {
        deleteProduct(product);
        loadCart();
    });

}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});


document.getElementById("clear-cart")?.addEventListener("click", () => {
    clearCart();
    loadCart();
});

