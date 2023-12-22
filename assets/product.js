// eslint-disable-next-line no-unused-vars
const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    $('.product-variant-radio-group input:radio').each(function radio() {
      console.log(this);
    });
  },
};
