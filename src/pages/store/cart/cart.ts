import type { Product } from "../../../types/product";
import { getCart, clearCart } from "../home/home";
import { getProducts } from "../../../data/data";


export const updateCartQuantity = (id: number, newAmount: number) => {
    const cart = getCart();

    if (newAmount <= 0) {
        delete cart[id]; //en 0 se elimina 
    } else {
        cart[id] = newAmount;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};


const loadCart = (cart: Record<number, number>) => {
    const cartContainer = document.getElementById("cart-container") as HTMLDivElement;
    const cartEmptyMessage = document.getElementById("cart-empty") as HTMLElement;
    cartContainer.innerHTML = "";

    let total = 0;
    //obtiene los productos
    const products: Product[] = getProducts();

    // chequea si cart esta vacio -> muestra el mensaje
    if (Object.keys(cart).length === 0) {
        console.log("lenght del object", Object.keys(cart).length)
        cartEmptyMessage.style.display = "block";
    } else {
        cartEmptyMessage.style.display = "none";
    }

    for (const [idStr, amount] of Object.entries(cart)) {
        const id = Number(idStr);
        const product: Product | undefined = products.find(p => p.id === id);
        if (product === undefined) continue; //si es indefinido salta esta iteracion


        //calculo de subtotal y total
        const subTotal = product.precio * amount;
        total += subTotal;

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
        handleMinus(product);
    });

    plusLink.addEventListener("click", (e) => {
        e.preventDefault();
        handlePlus(product);
    });

    deleteBtn.addEventListener("click", () => {
        handleDelete(product);
    });
}

//handlers de botones
function handleMinus(product: Product) {
    const currentAmount = getCart()[product.id];
    if (currentAmount > 1) {
        updateCartQuantity(product.id, currentAmount - 1);
        loadCart(getCart());
    }
}

function handlePlus(product: Product) {
    const currentAmount = getCart()[product.id];
    console.log("Debug cantidad", currentAmount, "stock:", product.stock);
    if (currentAmount < product.stock) {
        updateCartQuantity(product.id, currentAmount + 1);
        loadCart(getCart());
    }
}

function handleDelete(product: Product) {
    updateCartQuantity(product.id, 0);
    loadCart(getCart());
}


document.addEventListener("DOMContentLoaded", () => {
    const cart = getCart();
    console.log("Carrito cargado:", cart);
    loadCart(cart);
});


document.getElementById("clear-cart")?.addEventListener("click", () => {
    clearCart();            
    loadCart(getCart());    
});

