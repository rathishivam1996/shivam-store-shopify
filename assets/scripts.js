/**
 * Shopify price is in the format 55160, where last two digits are the fractional part i.e. 551.60
 *  @param {string|number} price - The unformatted price in the format 55160
 * @returns {string} the formatted price in the INR format i.e ₹551.60 or ₹55,168.79
 * If the fractional part is "00" then this removes the fractional part.
 * */
// eslint-disable-next-line no-unused-vars
function formatShopifyPriceToINR(price) {
  const integerPart = price.toString().slice(0, -2);
  const fractionalPart = price.toString().slice(-2);

  // format integral part to INR format
  let indianFormatedPrice = `Rs. ${parseInt(integerPart, 10).toLocaleString(
    'en-IN',
    { maximumFractionDigits: 0 },
  )}`;

  // append fractional part
  indianFormatedPrice =
    fractionalPart === '00'
      ? indianFormatedPrice
      : `${indianFormatedPrice}.${fractionalPart}`;

  return indianFormatedPrice;
}
