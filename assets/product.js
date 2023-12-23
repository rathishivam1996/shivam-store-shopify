const productJs = {
  product: {},
  handlizedId: '',
  setHandlizedId(id) {
    this.handlizedId = id;
  },
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange() {
    // const productJsContext = this;
    const radioGroup = $(`#product-variant-radio-group-${this.handlizedId}`);

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
      const url = new URL(window.location.href);
      url.searchParams.set('variant', matchedVariant.id);
      if (window.history.replaceState) {
        window.history.replaceState(null, this.product.title, url.toString());
      } else {
        // change location.href => reloads page!!!
        window.location.href = url.toString();
      }

      console.log(matchedVariant, "matchedVariant");
      // change prices
      $(`#product-price-${this.handlizedId}`).text(`Price: ${matchedVariant.price}`);
      const $compareAtPrice = $(`#product-compare-at-price-${this.handlizedId}`);
      if (matchedVariant.compare_at_price && matchedVariant.compare_at_price > matchedVariant.price) {
        $compareAtPrice.css("display", "block");
        $compareAtPrice.text(`Compare At Price: ${matchedVariant.compare_at_price}`);
      } else {
        $compareAtPrice.text(``);
        $compareAtPrice.css("display", "none");
      }
    });
  },
};
