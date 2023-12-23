const MyShopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
MyShopify.money_format = 'Rs.{{amount}}';
MyShopify.formatMoney = (amount, currency='Rs.', decimals=2, thousandsSeparator=',', decimalSeperator='.') => {
  debugger;
  console.log(amount);
  
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) / 100 : amount/100;
    console.log(numericAmount);
  
  const fixedAmount = amount.toFixed(decimals);
    console.log(fixedAmount);

  const parts = fixedAmount.split(decimalSeperator);
    console.log(parts);

  const rupees = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    console.log(rupees);

  const paise = parts[1] ? decimalSeperator + parts[1] : '';
    console.log(paise);


  return currency + rupees + paise;
}