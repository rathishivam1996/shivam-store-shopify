const productJs = {
  product: {},
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    // const productJsContext = this;
    // $('.product-variant-radio-group input:radio').each(function radio() {
    //   // on each radio change
    //   $(this).on('change', () => {
    //     const selectedOptions = [];
    //     $('.product-variant-radio-group input:radio:checked').each(
    //       function checkedRadio() {
    //         selectedOptions.push($(this).val());
    //       },
    //     );

    //     // find matched variant
    //     const matchedVariant = productJsContext.product.variants.find(
    //       (variant) => {
    //         let pass = true;
    //         for (let i = 0; i < selectedOptions.length; i += 1) {
    //           if (selectedOptions.indexOf(variant.options[i]) === -1) {
    //             pass = false;
    //             break;
    //           }
    //         }
    //         return pass;
    //       },
    //     );
    //   });
    // });

    const productJsContext = this;
    const radioGroup = $('.product-variant-radio-group');

    console.log(this, 'handle');
    // delegate event to radio group
    radioGroup.on('change', 'input:radio', () => {
      const selectedOptions = radioGroup
        .find('input:radio:checked')
        .map(function mapCheckedRadios() {
          console.log(this, 'jquery');
          return $(this).val();
        })
        .get();

      console.log(selectedOptions);
      console.log(this, 'test');
      const matchedVariant = productJsContext.product.variants.find((variant) =>
        selectedOptions.every(
          (option, index) => variant.options[index] === option,
        ),
      );

      console.log(matchedVariant);

      // Do something with matchedVariant
    });
  },
};
