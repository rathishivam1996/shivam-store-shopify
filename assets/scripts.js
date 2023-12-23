const MyShopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
MyShopify.money_format = 'Rs.{{amount}}';
MyShopify.formatMoney = (amount, currency='Rs.', decimals=2, thousandsSeparator=',', decimalSeperator='.') => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) / 100 : amount/100;
  debugger;
  const fixedAmount = amount.toFixed(numericAmount);
  const parts = fixedAmount.split(decimalSeperator);
  const rupees = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  const paise = parts[1] ? decimalSeperator + parts[1] : '';

  return currency + rupees + paise;
}