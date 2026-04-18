import type { Product } from "../../../types/product";
// import type { ICategory } from "../../../types/category";
import { getCategories, getProducts } from "../../../data/data";
import { addCart} from "../../../utils/utils";

const products = getProducts();
const categories = getCategories();
const productsContainer = document.getElementById("products-container") as HTMLDivElement;
const cartMessage = document.getElementById("cart-message") as HTMLParagraphElement;
const modal = document.getElementById("modal") as HTMLDivElement;
const closeCart = document.getElementById("close-cart") as HTMLButtonElement;


document.addEventListener("DOMContentLoaded", () => {
    loadProducts(products);
});

const loadCategories = () => {
    const categoriesList = document.getElementById("categories-list") as HTMLUListElement;

    const categories = getCategories();
    categories.forEach((category) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${category.nombre}</a>`;
        li.classList.add("categories");
        categoriesList.appendChild(li);
    })
};

loadCategories();

//carga las tarjetas de productos
const loadProducts = (products: Product[]) => {
    const productsContainer = document.getElementById("products-container") as HTMLDivElement;
    productsContainer.innerHTML = "";

    products.forEach((products) => {
        const productsCard: HTMLElement = document.createElement("div");
        productsCard.classList.add("featured-products");
        productsCard.innerHTML = `
        <div class="featured-img">
        <img src="/images/${products.imagen}" alt="Imagen de ${products.nombre}" /></div>
        <p class=product-category>${products.categorias.map(c => c.nombre)}</p>
        <h3 class=product-name>${products.nombre}</h3>
        <p class=product-description>${products.descripcion}</p>
        <p class=product-price>Precio: $${products.precio}</p>
        <div class="buttons">
        <button class=btn-details data-id="${products.id}">Ver Detalles</button>
        <button class=btn-cart data-id="${products.id}">Agregar al Carrito</button></div>
        `
        productsContainer.appendChild(productsCard);
    });

}

//busqueda por nombre 
const inputSearch = document.getElementById("searchProduct") as HTMLInputElement
const searchNotification = document.getElementById("searchNotification") as HTMLElement;

inputSearch.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const search = target.value.toLowerCase();

    const searchResults = products.filter((product) => {
        return product.nombre.toLowerCase().includes(search);
    });
    loadProducts(searchResults);

    //Muestra u oculta el contador de producos encontrados
    if (search === "") {
        searchNotification.style.display = "none";
    } else if (searchResults.length > 0) {
        searchNotification.style.display = "block";
        searchNotification.textContent = `Se encontraron ${searchResults.length} productos`;
    } else {
        searchNotification.textContent = "No hay productos con ese nombre";
    }

});


//Filtrar por categorias
const btnCategories = document.querySelectorAll<HTMLButtonElement>(".categories");

btnCategories.forEach((btn) => {
    btn.addEventListener("click", () => {
        //limpia el input de busqueda de texto primero
        inputSearch.value = "";
        const selectedCategory = btn.textContent?.trim();
        if (selectedCategory === "Ver todas las Categorias") {
            loadProducts(products);
        } else {
            //busca categoria por nombre
            const findCategory = categories.find(
                (category) => category.nombre.toLowerCase() === selectedCategory?.toLowerCase()
            );

            console.log("Categoria clickeada", findCategory)
            // Filtrar los prodcutos por categoria
            const filterProduct = products.filter((product) =>
                product.categorias.some((c) => c.id === findCategory?.id)
            );

            loadProducts(filterProduct);
        }
    });
});




//Evento de click en agregar al carrito (modal)
productsContainer.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && target.classList.contains("btn-cart")) {
        const idProduct = target.dataset.id;;
        const product = products.find((p) => p.id === Number(idProduct));

        if (product) {
            cartMessage.textContent = `Se agrega al carrito: ${product.nombre}`;
            modal.style.display = "block";      
                addCart(product);    
        }
    }
});

// export const getCart = (): Product[] => {
//   const data = localStorage.getItem("cart");
//   return data ? JSON.parse(data) as Product[] : [];
// };

// const addCart = (p: Product) => {
//     const cart= getCart();
//     cart.push(p);  
//     localStorage.setItem("cart", JSON.stringify(cart));
//     console.log("Carrito actualizado:", cart);
// }

//funciones que cierran el modal del carrito
closeCart.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault()
    modal.style.display = "none";
    cartMessage.textContent = "";
    })

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        cartMessage.textContent ="";
    }
}