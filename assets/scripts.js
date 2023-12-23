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

    const rupees = Math.floor(numericAmount / 100);
  const cents = numericAmount % 100;
  
  // formatted rupees
  const formattedRupees = rupees.tofixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

  const formattedPaise = paise.toFixed(decimals).padStart(decimals + 1, '0');

  return currency + formattedRupees + decimalSeperator + formattedPaise;
}