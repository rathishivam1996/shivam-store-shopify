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

      // change url of the product page without refreshing page
      // const url = new URL(window.location.href);
      // url.searchParams.set('variant', matchedVariant.id);
      // if (window.history.replaceState) {
      //   window.history.replaceState(null, this.product.title, url.toString());
      // }else { // change location.href => reloads page!!!
      //   window.location.href = url.toString();
      // }

      console.log(matchedVariant);
    });
  },
};
