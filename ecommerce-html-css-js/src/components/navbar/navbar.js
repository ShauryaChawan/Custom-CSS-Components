export const fullNavbar = (backLink) => {

  return `
  <nav class="navbar container-fluid">
    <!-- Left -->
    <div class="left">
      <!--<a href="../../index.html">
        <img src="../../../assets/ecommerce.svg" alt="logo" />
      </a> -->
      <button class="btn back-btn" onclick="window.location.href='${backLink}'">
        <img src="../../../assets/back.svg" alt="back btn">
      </button>
    </div>

    <!-- Center -->
    <!-- <form class="center form">
      <input type="text" name="search" id="search" class="search" />
      <label for="search">
        <button class="search-btn btn bg-primary" type="submit">
          <img src="../../../assets/search.svg" alt="search-icon" />
        </button>
      </label>
    </form> -->

    <!-- Right -->
    <div class="right">
      <div class="cart_container">
        <a href="../cart/cart.html" class="cart_btn btn">
          <img src="../../../assets/cart.svg" alt="cart icon" />
          <p class="cart_counter bg-primary" id="cart_counter">0</p>
        </a>
      </div>
    </div>
  </nav>
  `;
};
