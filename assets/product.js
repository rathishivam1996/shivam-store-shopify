// eslint-disable-next-line no-unused-vars
const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    document
      .querySelectorAll(`.product-variant-options input[type='radio']`)
      .forEach((radio) => {});
  },
};
