document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const userMenu = document.getElementById("userMenu");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const cartIcon = document.getElementById("cartIcon");
  const logoutLink = document.getElementById("logoutLink");

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    loginLink.classList.add("d-none");
    registerLink.classList.add("d-none");
    userMenu.classList.remove("d-none");
    cartIcon.classList.remove("d-none");
    usernameDisplay.textContent = user.username;
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload();
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload();
  });

  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.reload();
  });

  const cartItemsElement = document.getElementById("cartItems");
  const checkoutButton = document.getElementById("checkoutButton");

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsElement.innerHTML = "";

    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      cartItem.innerHTML = `
        <div>
          <h5>${item.name}</h5>
          <p>قیمت: ${item.price} تومان</p>
          <p>تعداد: 
            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)">+</button>
          </p>
        </div>
        <button class="btn btn-danger" onclick="removeItem(${index})">حذف</button>
      `;
      cartItemsElement.appendChild(cartItem);
    });

    if (cart.length === 0) {
      cartItemsElement.innerHTML =
        '<p class="text-center">سبد خرید شما خالی است.</p>';
    }
  }

  window.updateQuantity = (index, change) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity + change > 0) {
      cart[index].quantity += change;
    } else {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  window.removeItem = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  checkoutButton.addEventListener("click", () => {
    alert("پرداخت انجام شد!");
    localStorage.removeItem("cart");
    renderCart();
  });

  renderCart();
});
