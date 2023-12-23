formatMoney = (
  amount,
  currency = 'Rs.',
  decimals = 2,
  thousandsSeparator = ',',
  decimalSeperator = '.',
) => {
  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) : amount;
  debugger;
  const rupees = Math.floor(numericAmount / 100);
  const paise = numericAmount % 100;

  // formatted rupees
  const formattedRupees = rupees
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

  const formattedPaise = paise.toFixed(decimals).padStart(decimals, '0');

  return currency + formattedRupees + decimalSeperator + formattedPaise;
};
