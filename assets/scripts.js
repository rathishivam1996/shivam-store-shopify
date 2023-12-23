const MyShopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
MyShopify.money_format = '${{amount}}';
MyShopify.formatMoney = (cents, format) => {
  let modifiedCents = cents;
  if (typeof modifiedCents === 'string') {
    modifiedCents = modifiedCents.replace('.', '');
  }
  let value = '';
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || this.money_format;

  function defaultOption(opt, def) {
    return typeof opt === 'undefined' ? def : opt;
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal = defaultOption(decimal, '.');

    if (Number.isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    const parts = number.split('.');
    const dollars = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      `$1${thousands}`,
    );
    const newCents = parts[1] ? decimal + parts[1] : '';

    return dollars + newCents;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(modifiedCents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(modifiedCents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(modifiedCents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(modifiedCents, 0, '.', ',');
      break;
    default:
      return '';
  }

  return formatString.replace(placeholderRegex, value);
};
