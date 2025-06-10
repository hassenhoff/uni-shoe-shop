document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cartIcon");
  const cartCount = document.getElementById("cartCount");
  const mainImage = document.getElementById("mainImage");
  const imageSlider = document.getElementById("imageSlider");
  const addToCartButton = document.getElementById("addToCartButton");
  const commentText = document.getElementById("commentText");
  const submitCommentButton = document.getElementById("submitCommentButton");
  const commentList = document.getElementById("commentList");

  const images = [
    "https://m.media-amazon.com/images/I/717auo0vQRL._AC_SX695_.jpg",
    "https://m.media-amazon.com/images/I/71UmaUtzPWL._AC_SX695_.jpg",
    "https://m.media-amazon.com/images/I/71U9faXb8eL._AC_SX695_.jpg",
    "https://m.media-amazon.com/images/I/71UbDeYayNL._AC_SX695_.jpg",
    "https://m.media-amazon.com/images/I/61BoXcvkxUL._AC_SX695_.jpg",
  ];
  const productName = document.getElementById("productName").textContent;
  const productPrice = parseInt(
    document
      .getElementById("productPrice")
      .textContent.replace("قیمت: ", "")
      .replace(" تومان", "")
  );

  // SLIDER
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("img-thumbnail", "me-2", "mb-2");
    img.style.cursor = "pointer";
    img.style.width = "100px";
    img.style.height = "100px";
    img.addEventListener("click", () => {
      mainImage.src = src;
    });
    imageSlider.appendChild(img);
  });

  // CART
  const loadCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
  };

  loadCartCount();

  addToCartButton.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.name === productName);

    if (productIndex > -1) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartCount();
  });

  // COMMENTS
  const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    commentList.innerHTML = "";
    comments.forEach((comment) => {
      const commentItem = document.createElement("div");
      commentItem.classList.add("list-group-item");
      commentItem.textContent = comment;
      commentList.appendChild(commentItem);
    });
  };

  loadComments();

  submitCommentButton.addEventListener("click", () => {
    const comment = commentText.value.trim();

    if (comment) {
      const comments = JSON.parse(localStorage.getItem("comments")) || [];
      comments.push(comment);
      localStorage.setItem("comments", JSON.stringify(comments));
      loadComments();
      commentText.value = "";
    }
  });
});
