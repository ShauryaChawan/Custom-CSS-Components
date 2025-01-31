import { fullNavbar } from "../../components/navbar/navbar.js";
import {
  citiesAndStates,
  cartItemComponent,
  paymentSummaryItemComponent,
} from "../../constants.js";

document.addEventListener("DOMContentLoaded", () => {
  // Cart Setction
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const emptyMessageElement = document.getElementById("empty-message");
  const header = document.getElementById("header");
  const cartTotalItems = document.getElementById("cart-total-items");
  const rowElement = document.querySelector(".row");
  const userDetailsSection = document.getElementById(
    "container-fluid user-details"
  );
  const cartSection = document.getElementById("cart-section");
  const proceedToBuyBtn = document.getElementById("proceed-to-buy-btn");

  // User Details Section
  const areYouTheReceiverCheckbox = document.getElementById(
    "are-you-the-receiver"
  );
  const changeContactNumberCheckbox = document.getElementById(
    "change-contact-number"
  );
  const receiverNameInput = document.getElementById("receiver-name-inp");
  const receiverNumberInput = document.getElementById("receiver-number-inp");
  const receiverEmailInput = document.getElementById("receiver-email-inp");
  const useDefaultAddressCheckbox = document.getElementById(
    "use-default-address"
  );
  const addressInput = document.getElementById("address-inp");
  const stateSelect = document.getElementById("state-select");
  const citySelect = document.getElementById("city-select");
  const pincodeInput = document.getElementById("pincode-inp");
  const stateDropdown = document.getElementById("state-select");
  const cityDropdown = document.getElementById("city-select");
  const userDetailsSubmitBtn = document.getElementById(
    "user-details-submit-btn"
  );

  // Order Summary Section
  const orderSummarySection = document.getElementById("order-summary");
  const displayYourNameOnBillLbl = document.getElementById(
    "display-your-name-on-bill"
  );
  const displayYourNameOnBillInp = document.getElementById(
    "display-your-name-on-bill-inp"
  );

  const osReceiverDetails = document.getElementById("os-receiver-details");
  const osUserName = document.getElementById("os-user-name");
  const osUserNumber = document.getElementById("os-user-number");
  const osUserEmail = document.getElementById("os-user-email");
  const osReceiverName = document.getElementById("os-receiver-name");
  const osReceiverNumber = document.getElementById("os-receiver-number");
  const osReceiverEmail = document.getElementById("os-receiver-email");
  const osAddress = document.getElementById("os-address");
  const osAddressState = document.getElementById("os-address-state");
  const osAddressCity = document.getElementById("os-address-city");
  const osAddressPincode = document.getElementById("os-address-pincode");
  // const paymentSummaryItems = document.getElementById("payment-summary-items");
  const psTotalItems = document.getElementById("ps-total-items");
  const psTotalDiscount = document.getElementById("ps-total-discount");
  const psSubTotal = document.getElementById("ps-sub-total");
  const psShippingCost = document.getElementById("ps-shipping-cost");
  const psTotalCost = document.getElementById("ps-total-cost");
  const placeOrderBtn = document.getElementById("place-order-btn");

  // Importing header
  header.innerHTML = fullNavbar("../all-products/products.html");
  const cartCounter = document.getElementById("cart_counter");

  // ========== Common Functions ==========

  const fetchFromLocalStorage = (data) => {
    return JSON.parse(localStorage.getItem(data)) || [];
  };

  const storeInLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  const totalItemsInCart = () => {
    let totalItems = 0;
    const cart = fetchFromLocalStorage("cart");
    cart.forEach((product) => {
      totalItems += product.quantity;
    });

    return totalItems;
  };

  const totalDiscountInCart = () => {
    let totalDiscount = 0;
    const cart = fetchFromLocalStorage("cart");
    cart.forEach((product) => {
      totalDiscount += product.discountPercentage;
    });

    return totalDiscount.toFixed(2);
  };

  const subTotalOfCart = () => {
    let subTotal = 0;
    const cart = fetchFromLocalStorage("cart");
    cart.forEach((product) => {
      subTotal += product.discountedPrice;
    });

    return subTotal.toFixed(2);
  };

  // ========== Cart Page ==========

  const updateTotalPrice = (cart) => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].discountedPrice * cart[i].quantity;
    }
    cartTotalElement.innerHTML = `<b>Total:</b>  ₹${totalPrice.toFixed(2)}`;
  };

  const renderCart = () => {
    const cart = fetchFromLocalStorage("cart");

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      emptyMessageElement.style.display = "block";
      cartTotalElement.style.display = "none";
      rowElement.style.display = "none";
      return;
    }

    emptyMessageElement.style.display = "none";
    cartTotalElement.style.display = "block";

    cart.forEach((product) => {
      // console.log(product);
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      cartItem.innerHTML = cartItemComponent(product);

      cartItemsContainer.appendChild(cartItem);
      const incrementBtn = cartItem.querySelector("#increment-btn");
      const decrementBtn = cartItem.querySelector("#decrement-btn");
      // const deleteBtn = cartItem.querySelector("#delete-btn");

      if (product.quantity >= 4) {
        incrementBtn.disabled = true;
      } else {
        incrementBtn.disabled = false;
      }

      incrementBtn.addEventListener("click", () => {
        updateQuantity(product.id, "increment");
        totalItemsInCart();
      });

      decrementBtn.addEventListener("click", () => {
        updateQuantity(product.id, "decrement");
        totalItemsInCart();
      });

      const productDescription = document.getElementById("product-description");
      productDescription.addEventListener("click", () => {
        window.location.href = `../single-product-page/single-product.html/?productId=${product.id}`;
      });
    });

    updateTotalPrice(cart);
		cartTotalItems.innerHTML = `<b>Total items:</b> ${totalItemsInCart()}`;
  };

  const updateQuantity = (productId, operation) => {
    const cart = fetchFromLocalStorage("cart");
    const productIndex = cart.findIndex((product) => product.id === productId);
    const maxQuantity = 4;

    if (productIndex !== -1) {
      if (operation === "increment") {
        if (cart[productIndex].quantity < maxQuantity) {
          cart[productIndex].quantity++;
        }
      } else if (operation === "decrement") {
        cart[productIndex].quantity--;

        if (cart[productIndex].quantity === 0) {
          cart.splice(productIndex, 1);
        }
      } else if (operation === "delete") {
        cart.splice(productIndex, 1);
      }
      storeInLocalStorage("cart", cart);
      // localStorage.setItem("cart", JSON.stringify(cart));

      renderCart();
    }
    updateNavCartCounter();
  };

  const updateNavCartCounter = () => {
    const cart = fetchFromLocalStorage("cart");
    cartCounter.textContent = cart.length;
  };

  proceedToBuyBtn.addEventListener("click", () => {
    cartSection.style.display = "none";
    userDetailsSection.style.display = "block";

    userDetailsSectionFunction();
  });

  // ========== User Details Section ==========

  const userDetailsSectionFunction = () => {
    const user = {
      name: "John Doe",
      contact: 1234567890,
      email: "johndoe@example.com",
    };

    const address = {
      address:
        "101/B1, Runwal Estate, Behind R Mall, Dhokali Pada, Thane West, Thane, Maharashtra, India - 400607",
      state: "Maharashtra",
      city: "Thane",
      pincode: 400607,
    };

    storeInLocalStorage("user", user);
    // localStorage.setItem("user", JSON.stringify(user));
    storeInLocalStorage("address", address);
    // localStorage.setItem("address", JSON.stringify(address));

    // Fetch user object and populate input fields
    const storedUser = fetchFromLocalStorage("user");
    const storedAddress = fetchFromLocalStorage("address");
    receiverNameInput.value = storedUser.name;
    receiverNumberInput.value = storedUser.contact;
    receiverEmailInput.value = storedUser.email;

    // Apply default checkbox states and disable inputs accordingly
    areYouTheReceiverCheckbox.checked = true;
    changeContactNumberCheckbox.checked = false;
    changeContactNumberCheckbox.disabled = false;
    toggleReceiverDetails(true);

    // Set the default address values
    addressInput.value = storedAddress.address;
    stateDropdown.innerHTML = `<option value="${storedAddress.state}" disabled selected>${storedAddress.state}</option>`;
    cityDropdown.innerHTML = `<option value="${storedAddress.city}" disabled selected>${storedAddress.city}</option>`;
    pincodeInput.value = storedAddress.pincode;

    // Disable the input fields and dropdowns
    addressInput.disabled = true;
    stateSelect.disabled = true;
    citySelect.disabled = true;
    pincodeInput.disabled = true;
  };

  const toggleReceiverDetails = (isReceiver) => {
    const isChangeContactChecked = changeContactNumberCheckbox.checked;

    if (isReceiver) {
      changeContactNumberCheckbox.disabled = false;

      if (isChangeContactChecked) {
        // Enable only the contact number field
        receiverNameInput.disabled = true;
        receiverEmailInput.disabled = true;
        receiverNumberInput.disabled = false;
      } else {
        // Disable all inputs
        receiverNameInput.disabled = true;
        receiverEmailInput.disabled = true;
        receiverNumberInput.disabled = true;
      }
    } else {
      // Disable "Change contact number?" and enable all fields
      changeContactNumberCheckbox.disabled = true;
      receiverNameInput.disabled = false;
      receiverEmailInput.disabled = false;
      receiverNumberInput.disabled = false;
    }
  };

  areYouTheReceiverCheckbox.addEventListener("change", () => {
    toggleReceiverDetails(areYouTheReceiverCheckbox.checked);
  });

  changeContactNumberCheckbox.addEventListener("change", () => {
    toggleReceiverDetails(areYouTheReceiverCheckbox.checked);
  });

  useDefaultAddressCheckbox.addEventListener("change", () => {
    const storedAddress = fetchFromLocalStorage("address");

    if (useDefaultAddressCheckbox.checked) {
      addressInput.disabled = true;
      stateSelect.disabled = true;
      citySelect.disabled = true;
      pincodeInput.disabled = true;

      addressInput.value = storedAddress.address;
      stateDropdown.innerHTML = `<option value="${storedAddress.state}" disabled selected>${storedAddress.state}</option>`;
      cityDropdown.innerHTML = `<option value="${storedAddress.city}" disabled selected>${storedAddress.city}</option>`;
      pincodeInput.value = storedAddress.pincode;
    } else {
      addressInput.disabled = false;
      stateSelect.disabled = false;
      citySelect.disabled = false;
      pincodeInput.disabled = false;

      stateDropdown.addEventListener("change", populateCities);

      populateStateDropdown();
    }
  });

  const populateStateDropdown = () => {
    stateDropdown.innerHTML = `<option value="" disabled selected>Select State</option>`;

    for (const state in citiesAndStates) {
      const option = document.createElement("option");
      option.value = state.toLowerCase();
      option.textContent = state;
      stateDropdown.appendChild(option);
    }
    cityDropdown.disabled = true;
    cityDropdown.innerHTML = `<option value="" disabled selected>Select City</option>`;
  };

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  const populateCities = () => {
    const selectedState = titleCase(stateDropdown.value);
    if (selectedState) {
      // Enable city dropdown and populate cities for the selected state
      cityDropdown.disabled = false;
      cityDropdown.innerHTML = `<option value="" disabled selected>Select City</option>`;
      citiesAndStates[selectedState].forEach((city) => {
        const option = document.createElement("option");
        option.value = city.toLowerCase();
        option.textContent = city;
        cityDropdown.appendChild(option);
      });
    } else {
      // If no state is selected, reset the city dropdown
      cityDropdown.disabled = true;
      cityDropdown.innerHTML = `<option value="" disabled selected>Select City</option>`;
    }
  };

  const handleUserDetailsSubmit = () => {
    const storedUser = fetchFromLocalStorage("user");
    const storedAddress = fetchFromLocalStorage("address");

    if (!areYouTheReceiverCheckbox.checked) {
      const newReceiver = {
        name: receiverNameInput.value.trim(),
        contact: receiverNumberInput.value.trim(),
        email: receiverEmailInput.value.trim(),
      };

      const isReceiverDataModified = () => {
        return (
          storedUser.name !== newReceiver.name ||
          storedUser.contact != newReceiver.contact ||
          storedUser.email !== newReceiver.email
        );
      };

      if (isReceiverDataModified()) {
        storeInLocalStorage("receiver", newReceiver);
      } else {
        console.log("no new user created");
      }
    } else {
      console.log("no new user");
    }

    if (
      areYouTheReceiverCheckbox.checked &&
      changeContactNumberCheckbox.checked
    ) {
      if (storedUser.contact != receiverNumberInput.value.trim()) {
        let updatedUser = { ...storedUser };
        updatedUser.contact = receiverNumberInput.value.trim();
        storeInLocalStorage("user", updatedUser);
      }
    }

    if (!useDefaultAddressCheckbox.checked) {
      const updatedAddress = {
        address: addressInput.value.trim(),
        state: stateSelect.value.trim(),
        city: citySelect.value.trim(),
        pincode: parseInt(pincodeInput.value.trim(), 10),
      };

      const isAddressDataModified = () => {
        return (
          storedAddress.address !== updatedAddress.address ||
          (updatedAddress.state !== "" &&
            storedAddress.state !== updatedAddress.state) ||
          (updatedAddress.city !== "" &&
            storedAddress.city !== updatedAddress.city) ||
          storedAddress.pincode != updatedAddress.pincode
        );
      };

      if (isAddressDataModified()) {
        storeInLocalStorage("address", updatedAddress);
        console.log("Address updated in local storage:", updatedAddress);
      }
    }
  };

  userDetailsSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleUserDetailsSubmit();

    orderSummarySection.style.display = "block";
    userDetailsSection.style.display = "none";

    orderSummarySectionOnoad();
  });

  // ========== Order Summary ========

  const orderSummarySectionOnoad = () => {
    const storedReceiver = fetchFromLocalStorage("receiver");
    const storedUser = fetchFromLocalStorage("user");
    const storedAddress = fetchFromLocalStorage("address");
    const storedCart = fetchFromLocalStorage("cart");

    if (storedReceiver.length == 0) {
      displayYourNameOnBillLbl.style.display = "none";
      osReceiverDetails.style.display = "none";
    } else {
      osReceiverName.innerText = storedReceiver.name;
      osReceiverNumber.innerText = storedReceiver.contact;
      osReceiverEmail.innerText = storedReceiver.email;
    }

    osUserName.innerText = storedUser.name;
    osUserNumber.innerText = storedUser.contact;
    osUserEmail.innerText = storedUser.email;

    osAddress.innerText = storedAddress.address;
    osAddressState.innerText = storedAddress.state;
    osAddressCity.innerText = storedAddress.city;
    osAddressPincode.innerText = storedAddress.pincode;

    psTotalItems.innerText = totalItemsInCart();
    psTotalDiscount.innerText = totalDiscountInCart();
    psSubTotal.innerText = subTotalOfCart();
    const totalShippingCost = 100;
    psShippingCost.innerText = totalShippingCost;
    psTotalCost.innerText = `${
      parseFloat(subTotalOfCart()) + totalShippingCost
    }`;
  };

  renderCart();
  updateNavCartCounter();
});
