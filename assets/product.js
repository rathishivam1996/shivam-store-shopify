// eslint-disable-next-line no-unused-vars
const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    console.log($(`.product-variant-options`));
    $(`.product-variant-options input[type='radio']`).each(
      function (index, elem) {
        console.log(index);
        console.log(elem);

        console.log($(this));
      },
    );
  },
};
