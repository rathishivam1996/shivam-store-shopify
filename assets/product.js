// eslint-disable-next-line no-unused-vars
const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    console.log();
    $(`.product-variant-options input[type='radio']`).each(
      function (index, elem) {
        console.log($(this));
      },
    );
  },
};
