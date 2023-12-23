function formatMoney(amount) {
  const formattedAmount = (amount / 100).toFixed(2);
  return `Rs. ${formattedAmount}`;
}
