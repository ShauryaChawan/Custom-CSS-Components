import { showLoading, showError } from "./utils.js";

const API_URL = "https://dummyjson.com/products";

document.addEventListener("DOMContentLoaded", () => {
  const productDetailsContainer = document.getElementById("product-details");
  
  showLoading("product-details");

  const productId = new URLSearchParams(window.location.search).get(
    "productId"
  );

  if (!productId) {
    showError("No product ID provided in the URL.", "product-details");
    return;
  } else {
    console.log(productId);
  }

  const singleProduct = (productId) => {
    fetch(`${API_URL}/${productId}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((productData) => {
        productDetailsContainer.innerHTML = `
        
        <!-- Product Card -->
        <div class="row d-flex align-items-stretch">
        <!-- Product Image Column -->
        <div class="col-md-4">
        <div class="card shadow-sm h-100">
        <img id="product-image" class="img-fluid rounded mx-auto d-block my-3" alt="Product Image" />
        </div>
        </div>
        
        <!-- Product Info Column -->
        <div class="col-md-8">
          <div class="card p-4 shadow-sm h-100">
              <h2 id="product-title" class="text-center mb-4"></h2>
              <h4 class="mb-3">Product Description</h4>
              <p id="product-description" class="mb-3"></p>
              <p><strong>Price:</strong> $<span id="product-price"></span></p>
              <p><strong>Category:</strong> <span id="product-category"></span></p>

              <!-- Add to Cart Button -->
              <button class="btn btn-success btn-lg mt-3" id="addToCart">Add to Cart</button>
            </div>
          </div>
        </div>
        `;

        const productTitle = document.getElementById("product-title");
        const productImage = document.getElementById("product-image");
        const productDescription = document.getElementById(
          "product-description"
        );
        const productPrice = document.getElementById("product-price");
        const productCategory = document.getElementById("product-category");
        const goToBack = document.getElementById("goToBack");
        const addToCart = document.getElementById("addToCart");

        if (
          !productTitle ||
          !productImage ||
          !productDescription ||
          !productPrice ||
          !productCategory
        ) {
          throw new Error("One or more product detail elements are missing.");
        }

        productTitle.textContent = productData.title;
        productImage.src =
          productData.thumbnail || "https://via.placeholder.com/150";
        productDescription.textContent = productData.description;
        productPrice.textContent = productData.price;
        productCategory.textContent = productData.category;

        goToBack.addEventListener("click", () => {
          window.location.href = "./products.html";
        });

        addToCart.addEventListener("click", () => {
          alert("Product added to cart!");
        });
      })
      .catch((error) => {
        console.error("Error fetching and displaying product details:", error);
        showError(
          "Failed to load product details. Please try again later.",
          "product-details"
        );
      });
  };

  singleProduct(productId);
});
