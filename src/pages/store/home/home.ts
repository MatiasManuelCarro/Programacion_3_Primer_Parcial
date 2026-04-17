import type { Product } from "../../../types/product";
import type { ICategory } from "../../../types/category";
import { getCategories, getProducts, PRODUCTS } from "../../../data/data";


const cargarCategorias = () => {
    const categoriesList = document.getElementById("categories-list") as HTMLUListElement;

    const categories = getCategories();
    categories.forEach((category) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${category.nombre}</a>`;
        li.classList.add("categories");
        categoriesList.appendChild(li);
    })

};

cargarCategorias();

const cargarProductos = () => {
    const productsContainer = document.getElementById("products-container") as HTMLDivElement;

    const products = getProducts();

    products.forEach((PRODUCTS) => {
        const productsCard: HTMLElement = document.createElement("div");
        productsCard.classList.add("featured-products");
        productsCard.innerHTML = `
        <img src="/images/${PRODUCTS.imagen}" alt="Imagen de ${PRODUCTS.nombre}" />
        <p class=product-category>${PRODUCTS.categorias.map(c => c.nombre)}</p>
        <h3 class=product-name>${PRODUCTS.nombre}</h3>
        <p class=product-description>${PRODUCTS.descripcion}</p>
        <p class=product-price>Precio: $${PRODUCTS.precio}</p>
        <div class="buttons">
        <button class=btn-details data-id="${PRODUCTS.id}">Ver Detalles</button>
        <button class=btn-cart data-id="${PRODUCTS.id}">Agregar al Carrito</button></div>
        `
        productsContainer.appendChild(productsCard);
    });

}

cargarProductos();

// REVISAR!
const searchProduct = document.getElementById("searchProduct") as HTMLInputElement;

searchProduct.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement;
    const search = target.value.toLowerCase();

    const searchResult = getProducts().filter((p) =>
        p.nombre.toLowerCase().includes(search) ||
        p.descripcion.toLowerCase().includes(search) ||
        p.categorias.some(c => c.nombre.toLowerCase().includes(search))
    );
});



