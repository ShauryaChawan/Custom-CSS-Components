import { fullNavbar } from "../../components/navbar/navbar.js";
import { productCardComponent } from "../../constants.js";

const API_URL = "https://dummyjson.com/products";
const USD_TO_INR_CONVERSION_RATE = 82;

let currentPage = 1;
const itemsPerPage = 6;
let totalPages = 0;


document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const productWrapper = document.querySelector(".products-wrapper");
  const paginationWrapper = document.getElementById("pagination-wrapper");

  header.innerHTML = fullNavbar("../../index.html");
  const cartCounter = document.getElementById("cart_counter");

  const fetchData = () => {
    fetch(
      `${API_URL}/?limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        totalPages = Math.ceil(data.total / itemsPerPage);
        const products = data.products;

        productWrapper.innerHTML = "";
        products.forEach((product) => {
          const priceInINR = (
            product.price * USD_TO_INR_CONVERSION_RATE
          ).toFixed(2);
          const productCardHTML = productCardComponent({
            id: product.id,
            src: product.thumbnail,
            title: product.title,
            description: product.description,
            price: priceInINR,
            discount: product.discountPercentage,
            availabilityStatus: product.availabilityStatus,
          });
          productWrapper.innerHTML += productCardHTML;
        });

        renderPagination();
      })
      .catch((error) => {
        console.error("Error fetching and displaying products:", error);
      });
  };

  const renderPagination = () => {
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-container";
  
    // First Page Button
    const firstButton = document.createElement("button");
    firstButton.innerHTML = "&laquo;";
    firstButton.disabled = currentPage === 1;
    firstButton.onclick = () => handlePageChange(1);
    paginationContainer.appendChild(firstButton);
  
    // Previous Page Button
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "&lt;";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => handlePageChange(currentPage - 1);
    paginationContainer.appendChild(prevButton);
  
    // Calculate the range of pages to display
    const pageLimit = 5;
    let startPage = Math.max(2, currentPage - Math.floor(pageLimit / 2));
    let endPage = Math.min(totalPages - 1, startPage + pageLimit - 1);
  
    // Ensure first and last page are always shown
    paginationContainer.appendChild(createPageButton(1));
  
    if (startPage > 2) {
      paginationContainer.appendChild(createEllipsis());
    }
  
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      paginationContainer.appendChild(createPageButton(i));
    }
  
    if (endPage < totalPages - 1) {
      paginationContainer.appendChild(createEllipsis());
    }
  
    // Always show last page
    if (endPage <= totalPages - 1) {
      paginationContainer.appendChild(createPageButton(totalPages));
    }
  
    // Next Page Button
    const nextButton = document.createElement("button");
    nextButton.innerHTML = "&gt;";
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => handlePageChange(currentPage + 1);
    paginationContainer.appendChild(nextButton);
  
    // Last Page Button
    const lastButton = document.createElement("button");
    lastButton.innerHTML = "&raquo;";
    lastButton.disabled = currentPage === totalPages;
    lastButton.onclick = () => handlePageChange(totalPages);
    paginationContainer.appendChild(lastButton);
  
    // Clear previous pagination and append new one
    const existingPaginationContainer = document.querySelector(
      ".pagination-container"
    );
    if (existingPaginationContainer) {
      existingPaginationContainer.remove();
    }
  
    paginationWrapper.appendChild(paginationContainer);
  };
  
  // Helper function to create a page button
  const createPageButton = (page) => {
    const pageButton = document.createElement("button");
    pageButton.innerText = page;
    pageButton.className = currentPage === page ? "active" : "";
    pageButton.onclick = () => handlePageChange(page);
  
    return pageButton;
  };
  
  // Helper function to create an ellipsis element
  const createEllipsis = () => {
    const ellipsisSpan = document.createElement("span");
    ellipsisSpan.innerText = "...";
    return ellipsisSpan;
  };
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      fetchData();
    }
  };
  

  const updateNavCartCounter = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCounter.textContent = cart.length ? cart.length : 0;
  };

  fetchData();
  updateNavCartCounter();
});
