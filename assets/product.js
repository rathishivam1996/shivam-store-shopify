const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    // const productJsContext = this;
    const radioGroup = $('.product-variant-radio-group');

    // delegate event to radio group
    radioGroup.on('change', 'input:radio', () => {
      const selectedOptions = radioGroup
        .find('input:radio:checked')
        .map(function mapCheckedRadios() {
          return $(this).val();
        })
        .get();

      const matchedVariant = this.product.variants.find((variant) =>
        selectedOptions.every(
          (option, index) => variant.options[index] === option,
        ),
      );

      // Do something with matchedVariant
      
    });
  },
};
