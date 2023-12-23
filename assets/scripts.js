const MyShopify = Shopify || {};

// Money format handler
MyShopify.money_format = '${{amount}}';

MyShopify.formatMoney = (cents, format) => {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }

  const defaultOption = (opt, def) => (typeof opt === 'undefined' ? def : opt);

  const formatWithDelimiters = (number, precision, thousands, decimal) => {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    const parts = number.split('.'),
      dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
      cents = parts[1] ? decimal + parts[1] : '';

    return dollars + cents;
  };

  const value = (() => {
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || MyShopify.money_format;

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        return formatWithDelimiters(cents, 2);
      case 'amount_no_decimals':
        return formatWithDelimiters(cents, 0);
      case 'amount_with_comma_separator':
        return formatWithDelimiters(cents, 2, '.', ',');
      case 'amount_no_decimals_with_comma_separator':
        return formatWithDelimiters(cents, 0, '.', ',');
      default:
        return '';
    }
  })();

  return format.replace(/\{\{\s*(\w+)\s*\}\}/, value);
};

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
