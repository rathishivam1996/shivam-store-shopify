// eslint-disable-next-line no-unused-vars
const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    $(".product-variant-radio-group input:radio").each(function (index, radio) {
      $(this).on("change", function () {
        const selectedOptions = [];
        $(".product-variant-radio-group input:radio:checked").each(function (index, nativeRadio) {
          selectedOptions.push($(this).val());
        });
        
      });
    });
  },
};
