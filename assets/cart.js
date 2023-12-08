document.querySelectorAll("cart-item-quantity-selector").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    const currValue = Number(input.value);
    const isPlus = button.classList.contains("plus");
    // using a key because we can have MULTIPLE LINE ITEMS WITH SAME VARIANT ID
    // Key is manually set as a custom attribute on <div class="cart-item"></div>
    const key = button.closest(".cart-item").getAttribute("data-key");

    if (isPlus) {
      const newValue = currValue + 1;
      input.value = newValue;
      changeItemQuantity(key, newValue);
    } else if (currValue > 1) {
      const newValue = currValue - 1;
      input.value = newValue;
      changeItemQuantity(key, newValue);
    }
  });
});

// using a key because we can have MULTIPLE LINE ITEMS WITH SAME VARIANT ID
function changeItemQuantity(key, quantity) {
    
}
