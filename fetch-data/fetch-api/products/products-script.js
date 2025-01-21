import { showLoading, showError } from "./utils.js";

// API: https://dummyjson.com/docs
const API_URL = "https://dummyjson.com/products";

document.addEventListener("DOMContentLoaded", () => {
  const fetchDataFetchAPI = () => {
    showLoading("product-cards");

    fetch(API_URL)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const products = data.products.slice(0, 6);
        const productCards = document.getElementById("product-cards");

        productCards.innerHTML = "";

        products.forEach((product) => {
          const card = document.createElement("div");
          card.className = "col-md-4 mb-4";

          card.innerHTML = `
            <div class="card h-100">
              <img src="${
                product.thumbnail || "https://via.placeholder.com/150"
              }" class="card-img-top" alt="Image of ${product.title}">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <a href="./single-product.html?productId=${
                  product.id
                }" class="btn btn-primary">Know More</a>
              </div>
            </div>
          `;

          productCards.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error fetching and displaying products:", error);
        showError(
          "Failed to load products. Please try again later.",
          "product-cards"
        );
      });
  };

  fetchDataFetchAPI();
});
