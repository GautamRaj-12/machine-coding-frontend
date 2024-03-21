import { getProducts } from "./api.js"

const productContainer = document.querySelector('.products-container');
const pagination = document.querySelector('.pagination-buttons-numbers')

// displaying products with pagination
const displayProducts = async () => {
    let page = 1;
    try {
        const products = await getProducts();
        const totalPages = products.length / 10;

        products.slice(page * 10 - 10, page * 10).forEach((product) => {
            const indProdContainer = document.createElement('div');
            const prodTitle = document.createElement("h2");
            prodTitle.textContent = product.title;
            indProdContainer.appendChild(prodTitle);

            const prodImage = document.createElement("img")
            prodImage.src = `${product.thumbnail}`
            prodImage.alt = `${product.title}`
            indProdContainer.appendChild(prodImage);

            productContainer.appendChild(indProdContainer);
        });
        for (let i = 1; i <= totalPages; i++) {
            const pageSpan = document.createElement('span');
            pageSpan.textContent = i;
            pagination.appendChild(pageSpan);
            pageSpan.addEventListener('click', () => {
                page = i;
                console.log(page)
            })
        }
    } catch (error) {
        console.log("Error: ", error)
    }
}
displayProducts();
