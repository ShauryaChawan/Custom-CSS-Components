import { fullNavbar } from "../../components/navbar/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");

  header.innerHTML = fullNavbar("../all-products/products.html");

  const cartCounter = document.getElementById("cart_counter");

  const updateNavCartCounter = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCounter.textContent = cart.length;
  };

  const fetchCategoriesData = () => {};

  updateNavCartCounter();
  fetchCategoriesData();
});
