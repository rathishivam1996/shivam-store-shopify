const Shopify = Shopify || {};

// Money format handler
Shopify.money_format = '${{amount}}';

Shopify.formatMoney = (cents, format) => {
  let modifiedCents = cents;

  if (typeof modifiedCents === 'string') {
    modifiedCents = modifiedCents.replace('.', '');
  }

  const defaultOption = (opt, def) => (typeof opt === 'undefined' ? def : opt);

  const formatWithDelimiters = (number, precision, thousands, decimal) => {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal = defaultOption(decimal, '.');

    if (Number.isNaN(number) || number == null) {
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
    const formatString = format || Shopify.money_format;

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        return formatWithDelimiters(modifiedCents, 2);
      case 'amount_no_decimals':
        return formatWithDelimiters(modifiedCents, 0);
      case 'amount_with_comma_separator':
        return formatWithDelimiters(modifiedCents, 2, '.', ',');
      case 'amount_no_decimals_with_comma_separator':
        return formatWithDelimiters(modifiedCents, 0, '.', ',');
      default:
        return '';
    }
  })();

  return format.replace(/\{\{\s*(\w+)\s*\}\}/, value);
};
