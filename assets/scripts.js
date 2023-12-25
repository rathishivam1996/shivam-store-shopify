function formatMoney(
  amount,
  currency = 'Rs.',
  decimalPoint = 2,
  thousandsSeparator = ',',
) {
  const amountInDecimal = (amount / 10 ** decimalPoint).toFixed(decimalPoint);

  const parts = amountInDecimal.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  return `${currency} ${parts.join('.')}`;
}
