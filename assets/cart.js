// Shopify.money_format = "${{amount}}";

function formatShopifyMoney(cents, format) {
  if (typeof cents == "string") {
    cents = cents.replace(".", "");
  }
  var value = "";
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = format || this.money_format;

  function defaultOption(opt, def) {
    return typeof opt == "undefined" ? def : opt;
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ",");
    decimal = defaultOption(decimal, ".");

    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    var parts = number.split("."),
      dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousands),
      cents = parts[1] ? decimal + parts[1] : "";

    return dollars + cents;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
  }

  return formatString.replace(placeholderRegex, value);
}

// cart item quantity selector calls changeItemQuantity(key, quantity)
document
  .querySelectorAll(".cart-item-quantity-selector button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.parentElement.querySelector("input");
      const currValue = Number(input.value);
      const isPlus = button.classList.contains("plus");
      // using a key because we can have MULTIPLE LINE ITEMS WITH SAME VARIANT ID
      // Key is manually set as a custom attribute on <div class="cart-item"></div>
      const key = button
        .closest(".cart-item")
        .getAttribute("data-unique-line-item-key");

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

// cart-item-remove-button
document.querySelectorAll(".cart-item-remove-button").forEach((removeBtn) => {
  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const item = removeBtn.closest(".cart-item");
    const key = item.getAttribute("data-unique-line-item-key");
    axios
      .post("/cart/change.js", {
        id: key,
        quantity: 0,
      })
      .then((res) => {
        // if cart is COMPLETELY empty render empty cart message from Cart.js
        // todo - create reusable empty cart snippet
        if (res.data.items.length === 0) {
          document.querySelector("#cart_form").remove();
          const html = document.createElement("div");

          html.innerHTML = `
          <p>Hey your cart is empty!</p>
          <a class="button" href="/">Keep Shopping</a>
          `;

          document.querySelector(".cart").appendChild(html);
        } else {
          item.remove();
          const moneyFormat = document
            .querySelector(`[data-store-money-format]`)
            .getAttribute("data-store-money-format");

          const totalDiscount = formatShopifyMoney(
            res.data.total_discount,
            moneyFormat,
          );
          const totalPrice = formatShopifyMoney(
            res.data.total_price,
            moneyFormat,
          );

          document.querySelector("#cart-total-price").textContent = totalPrice;
          document.querySelector("#cart-total-discounts").textContent =
            totalDiscount;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// using a key because we can have MULTIPLE LINE ITEMS WITH SAME VARIANT ID
function changeItemQuantity(key, quantity) {
  axios
    .post("cart/change.js", {
      id: key,
      quantity,
    })
    .then((res) => {
      const moneyFormat = document
        .querySelector(`[data-store-money-format]`)
        .getAttribute("data-store-money-format");
      const item = res.data.items.find((item) => item.key === key);

      // cart
      const totalDiscount = formatShopifyMoney(
        res.data.total_discount,
        moneyFormat,
      );
      const totalPrice = formatShopifyMoney(res.data.total_price, moneyFormat);
      document.querySelector("#cart-total-price").textContent = totalPrice;
      document.querySelector("#cart-total-discounts").textContent =
        totalDiscount;

      // cart item
      const lineItemPrice = formatShopifyMoney(
        item.final_line_price,
        moneyFormat,
      );
      document.querySelector(
        `[data-unique-line-item-key="${key}"] #cart-item-line-item-price`,
      ).textContent = lineItemPrice;
    })
    .catch((err) => {
      console.log("error cart/update.js at cart.js", err);
    });
}
