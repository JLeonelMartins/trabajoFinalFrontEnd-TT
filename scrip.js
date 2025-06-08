let cart = [];
let cartVisible = false;

function addToCart(product, price) {
  cart.push({ product, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.product} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total;
  cartCount.textContent = cart.length;
}

document.getElementById("cart-toggle").addEventListener("click", () => {
  cartVisible = !cartVisible;
  document.getElementById("cart").classList.toggle("hidden", !cartVisible);
});
