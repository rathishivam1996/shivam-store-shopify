const productJs = {
  product: {},
  handlizedId: '',
  setHandlizedId(id) {
    this.handlizedId = id;
  },
  setProduct(productJson) {
    this.product = productJson;
    console.log(this.product, 'product');
  },
  handleVariantChange() {
    console.log({{product.selected_or_first_available_variant | json}});
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

      console.log(matchedVariant, 'matchedVariant');
      // change prices
      $(`#product-price-${this.handlizedId} > strong`).text(
        // eslint-disable-next-line no-undef
        `${formatMoney(matchedVariant.price)}`,
      );
      const $compareAtPrice = $(
        `#product-compare-at-price-${this.handlizedId} > strong`,
      );
      if (
        matchedVariant.compare_at_price &&
        matchedVariant.compare_at_price > matchedVariant.price
      ) {
        $compareAtPrice.parent().css('display', 'block');
        // eslint-disable-next-line no-undef
        $compareAtPrice.text(`${formatMoney(matchedVariant.compare_at_price)}`);
      } else {
        $compareAtPrice.text(``);
        $compareAtPrice.parent().css('display', 'none');
      }

      // change featured image if selected variant has a featured image
      // const defaultAltText = 
      if (matchedVariant.featured_image) {
        $(`#product-featured-image-${this.handlizedId}`).attr(
          'src',
          matchedVariant.featured_image.src,
        );
        // remove thumb selector for prev variant
        $(
          `#product-thumb-container-${this.handlizedId}>img.selected`,
        ).removeClass('selected');

        console.log($(`#product-thumb-container-${this.handlizedId}>img`));
        $(`#product-thumb-container-${this.handlizedId}>img`).hide();

        // add selected to new variant thumb
        $(`#product-thumb-container-${this.handlizedId}>img`)
          .eq(matchedVariant.featured_image.position - 1)
          .addClass('selected');
        // document
        //   .querySelector('.product-thumb-container>img.selected')
        //   .classList.remove('selected');

        // document
        //   .querySelectorAll('.product-thumb-container>img')
        //   [matchedVariant.featured_image.position - 1].classList.add(
        //     'selected',
        //   );
      }
    });
  },
};
