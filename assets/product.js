// eslint-disable-next-line no-unused-vars
const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    const productJsContext = this;
    $('.product-variant-radio-group input:radio').each(function radio() {
      // on each radio change
      $(this).on('change', () => {
        const selectedOptions = [];
        $('.product-variant-radio-group input:radio:checked').each(
          function checkedRadio() {
            selectedOptions.push($(this).val());
          },
        );

        // find matched variant
        const matchedVariant = productJsContext.product.variants.find(
          (variant) => {
            let pass = true;
            for (let i = 0; i < selectedOptions.length; i += 1) {
              if (selectedOptions.indexOf(variant.options[i]) === -1) {
                pass = false;
                break;
              }
            }
            return pass;
          },
        );
        console.log(matchedVariant);
      });
    });
  },
};
