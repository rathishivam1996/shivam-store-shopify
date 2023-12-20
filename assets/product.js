function handleVariantChange(product) {
  console.log(product, 'productJson');

  $('.product-variant-radio-input input:radio').forEach((radio) => {
    console.log(radio, 'input radio');
  });
}
