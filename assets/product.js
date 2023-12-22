// eslint-disable-next-line no-unused-vars
const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    $(".product-variant-radio-group input:radio").each(function (index, radio) {
      // on each radio change
      $(this).on("change", function () {
        const selectedOptions = [];
        $(".product-variant-radio-group input:radio:checked").each(function (index, nativeRadio) {
          selectedOptions.push($(this).val());
        });

        // find matched variant
        const matchedVariant = product.variants.find((variant) => {
          let pass = true;
             for (let i=0; i<selectedOptions.length; i+=1) {
               if(selectedOptions.indexOf(variant.options[i]) === -1) {
                 pass = false;
                 break;
               }
             }
             return pass;
        });
      });
    });
  },
};
