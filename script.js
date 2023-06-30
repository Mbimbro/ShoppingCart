// Get all the "Add to Cart" buttons
var addToCartButtons = document.getElementsByClassName("add-to-cart");

// Get the cart items, total price, and checkout button elements
var cartItemsElement = document.querySelector(".cart-items");
var totalPriceElement = document.querySelector(".total-price");
var checkoutButton = document.querySelector(".checkout");

// Initialize the cart items array and total price
var cartItems = [];
var totalPrice = 0;

// Add click event listeners to the "Add to Cart" buttons
for (var i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", addToCartClicked);
}

// Add to Cart click event handler
function addToCartClicked(event) {
  var button = event.target;
  var product = button.parentNode;
  var title = product.querySelector("h3").innerText;
  var price = parseFloat(product.querySelector("p").innerText.slice(1));
  var imageSrc = product.querySelector("img").src;

  addItemToCart(title, price, imageSrc);
}

// Add item to the cart
function addItemToCart(title, price, imageSrc) {
  var existingItem = cartItems.find(function (item) {
    return item.title === title;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    var item = { title: title, price: price, imageSrc: imageSrc, quantity: 1 };
    cartItems.push(item);
  }

  totalPrice += price;
  renderCart();
}

// Remove item from the cart
function removeItem(index) {
  var removedItem = cartItems.splice(index, 1)[0];
  totalPrice -= removedItem.price;
  renderCart();
}

// Render the cart items and total price
function renderCart() {
  cartItemsElement.innerHTML = "";
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var li = document.createElement("li");
    li.className = "cart-item";
    var image = document.createElement("img");
    image.src = item.imageSrc;
    image.alt = item.title;
    var details = document.createElement("div");
    details.className = "cart-item-details";
    var title = document.createElement("h4");
    title.innerText = item.title;
    var price = document.createElement("p");
    price.innerText = "$" + item.price;
    var quantity = document.createElement("span");
    quantity.innerText = "Quantity: " + item.quantity;
    var removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.addEventListener("click", removeItem.bind(null, i));

    details.appendChild(title);
    details.appendChild(price);
    details.appendChild(quantity);
    li.appendChild(image);
    li.appendChild(details);
    li.appendChild(removeButton);
    cartItemsElement.appendChild(li);
  }
  totalPriceElement.innerText = "Total: $" + totalPrice.toFixed(2);
  checkoutButton.disabled = cartItems.length === 0;
}

// Checkout button click event handler
checkoutButton.addEventListener("click", checkoutClicked);

// Checkout click event handler
function checkoutClicked() {
  if (cartItems.length > 0) {
    alert("Thank you for your purchase!");
    cartItems = [];
    totalPrice = 0;
    renderCart();
  } else {
    alert("Your cart is empty!");
  }
}

// Initial rendering of the cart
renderCart();
