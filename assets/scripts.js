function formatMoney(amount, currency='Rs.') {
  const formattedAmount = (amount / 100).toFixed(2);
  return `Rs. ${formattedAmount}`;
}
