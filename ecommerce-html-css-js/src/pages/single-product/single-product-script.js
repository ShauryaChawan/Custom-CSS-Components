import { fullNavbar } from "../../components/navbar/navbar.js";

const API_URL = "https://dummyjson.com/products";
const USD_TO_INR_CONVERSION_RATE = 82;

let productObj = {};

const productId = new URLSearchParams(window.location.search).get("productId");
productObj.id = parseInt(productId);

const starReview = `<img src="../../../assets/star.svg" alt="star" />`;

const reviewComponent = ({ originalDate, reviewerName, rating, comment }) => {
  const date = new Date(originalDate);

  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
  return `
	<div class="review">
		<p>
			<span class="reviewer-name">${reviewerName}</span>
			<span class="review-date">${formattedDate}</span>
		</p>
		<p>
			<strong>Rating:</strong>
			<span class="star-rating"></span>
			${rating}
		</p>
		<p class="review-text">${comment}</p>
	</div>
	`;
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const productImage = document.getElementById("product-image");
  const productTitle = document.getElementById("product-title");
  const productDescription = document.getElementById("product-description");
  const prodcutOriginalPrice = document.getElementById(
    "product-original-price"
  );
  const prodcutDiscountPercentage = document.getElementById(
    "product-discount-percentage"
  );
  const prodcutDiscountedPrice = document.getElementById(
    "product-discounted-price"
  );
  const productBrand = document.getElementById("product-brand");
  const productCategory = document.getElementById("product-category");
  const productAvailabilityStatus = document.getElementById(
    "product-availabilityStatus"
  );
  const productWeight = document.getElementById("product-weight");
  const productDepth = document.getElementById("product-depth");
  const productWidth = document.getElementById("product-width");
  const productHeight = document.getElementById("product-height");
  const productWarranty = document.getElementById("product-warranty");
  const productShipping = document.getElementById("product-shipping");
  const productReturnPolicy = document.getElementById("product-returnPolicy");
  const productStarRating = document.getElementById("product-star-rating");
  const productRating = document.getElementById("product-rating");
  const incrementBtn = document.getElementById("increment-btn");
  const decrementBtn = document.getElementById("decrement-btn");
  const trashBtn = document.getElementById("trash-btn");
  const quantityElement = document.getElementById("quantity");
  const addToCartBtn = document.getElementById("add-to-cart");
  const quantityControlsContainer = document.getElementById(
    "quantity-controls-container"
  );

  header.innerHTML = fullNavbar("../all-products/products.html");

  const cartCounter = document.getElementById("cart_counter");

  try {
    if (!productId) {
      throw ("No product ID provided in the URL.", "product-details");
    }

    const fetchData = () => {
      // console.log("hello");
      fetch(`${API_URL}/${productId}`)
        .then((response) => {
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          productImage.innerHTML = `<img src="${data.images[0]}" alt="image">`;
          productTitle.innerText = data.title;
          productDescription.innerText = data.description;

          const priceINR = (data.price * USD_TO_INR_CONVERSION_RATE).toFixed(2);

          prodcutOriginalPrice.innerText = `₹${priceINR}`;
          prodcutDiscountPercentage.innerText = `${data.discountPercentage}%`;

          const discountedPrice = (
            priceINR -
            (priceINR * data.discountPercentage) / 100
          ).toFixed(2);

          prodcutDiscountedPrice.innerText = `₹${discountedPrice}`;
          productBrand.innerText = data.brand;
          productCategory.innerText = data.category;
          productAvailabilityStatus.innerText = `${data.availabilityStatus} (${data.stock} left)`;
          productWeight.innerText = data.weight;
          productDepth.innerText = data.dimensions.depth;
          productWidth.innerText = data.dimensions.width;
          productHeight.innerText = data.dimensions.height;
          productWarranty.innerText = data.warrantyInformation;
          productShipping.innerText = data.shippingInformation;
          productReturnPolicy.innerText = data.returnPolicy;
          productRating.innerText = data.rating;

          const reviewContainer = document.querySelector(".review-container");

          data.reviews.forEach((element) => {
            reviewContainer.innerHTML += reviewComponent({
              originalDate: element.date,
              reviewerName: element.reviewerName,
              rating: element.rating,
              comment: element.comment,
            });
          });

          // updating the gloabl product object
          productObj.title = data.title;
          productObj.image = data.thumbnail;
          productObj.description = data.description;
          productObj.originalPrice = parseFloat(priceINR);
          productObj.discountedPrice = parseFloat(discountedPrice);
          productObj.discountPercentage = data.discountPercentage;
          productObj.brand = data.brand;

          // console.log(productObj)

          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          const productInCart = cart.find((item) => item.id === parseInt(productId));

          if (productInCart) {
            quantity = productInCart.quantity;
            console.log("quantity updated: " + quantity);
            quantityElement.textContent = quantity;
            quantityControlsContainer.style.display = "flex";
            addToCartBtn.style.display = "none";

            if (quantity >= 4) {
              incrementBtn.disabled = true;
              incrementBtn.cursor = "not-allowed";
              // incrementBtn.style.cursor = "not-allowed";
            } else {
              incrementBtn.disabled = false;
            }
          } else {
            quantityControlsContainer.style.display = "none";
            addToCartBtn.style.display = "block";
          }

          updateNavCartCounter();
        })
        .catch((error) => {
          console.error(
            "Error fetching and displaying product details:",
            error
          );
          throw "Failed to load product details. Please try again later.";
        });
    };

    fetchData();

    let quantity = 0;
    const maxQuantity = 4;

    const updateNavCartCounter = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartCounter.textContent = cart.length;
    };

    const addToCart = (product) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateNavCartCounter();
    };

    const updateQuantity = (operation) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const productIndex = cart.findIndex(
        (item) => item.id === parseInt(productId)
      );

      if (cart[productIndex].quantity < maxQuantity >= 4) {
        incrementBtn.disabled = true;
      } else {
        incrementBtn.disabled = false;
      }

      if (productIndex !== -1) {
        if (
          operation === "increment" &&
          cart[productIndex].quantity < maxQuantity
        ) {
          cart[productIndex].quantity++;
          quantity = cart[productIndex].quantity;
        } else if (operation === "decrement") {
          cart[productIndex].quantity--;
          quantity = cart[productIndex].quantity;

          if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
            quantityControlsContainer.style.display = "none";
            addToCartBtn.style.display = "block";
          }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateNavCartCounter();
        quantityElement.textContent = quantity;
      }
    };

    addToCartBtn.addEventListener("click", () => {
      productObj.quantity = ++quantity;
      quantityElement.textContent = quantity;
      quantityControlsContainer.style.display = "flex";
      addToCartBtn.style.display = "none";

      addToCart(productObj);
    });

    incrementBtn.addEventListener("click", () => {
      if (quantity < maxQuantity) {
        updateQuantity("increment");
      }

      if (quantity >= 4) {
        incrementBtn.disabled = true;
      } else {
        incrementBtn.disabled = false;
      }
    });

    decrementBtn.addEventListener("click", () => {
      if (quantity > 0) {
        updateQuantity("decrement");
      }
    });
  } catch (err) {
    console.error(err);
  }
});
