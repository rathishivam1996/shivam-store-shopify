// eslint-disable-next-line no-unused-vars
const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    $('.product-variant-radio-group input:radio').each((index, elem) => {
      console.log(this);
      console.log($(this));
    });
  },
};
