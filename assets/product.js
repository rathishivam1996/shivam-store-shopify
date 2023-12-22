// eslint-disable-next-line no-unused-vars
const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    const productJsContext = this;
    $('.product-variant-radio-group input:radio').each(function (index, elem) {
      console.log($(this));
      console.log(productJsContext);
    });
  },
};
