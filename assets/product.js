const productJs = {
  product: {},
  handlizedId: '',
  setHandlizedId(id) {
    this.handlizedId = id;
  },
  setProduct(productJson) {
    this.product = productJson;
  },
  handleVariantChange(defaultVariant) {
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
      this.updatePageUrlUtil(matchedVariant.id);

      // change prices
      debugger;
      this.changePriceUtil(matchedVariant.price, matchedVariant.compareAtPrice);

      // change featured image if selected variant has a featured image
      const currAltText = `Group-${matchedVariant.options[0]}`;
      this.updateImagesUtil(currAltText, matchedVariant.featured_image);
    });
  },
  updatePageUrlUtil(matchedVariantId) {
    const url = new URL(window.location.href);
    url.searchParams.set('variant', matchedVariantId);
    if (window.history.replaceState) {
      window.history.replaceState(null, this.product.title, url.toString());
    } else {
      // change location.href => reloads page!!!
      window.location.href = url.toString();
    }
  },
  changePriceUtil(price, compareAtPrice) {
    $(`#product-price-${this.handlizedId} > strong`).text(
      // eslint-disable-next-line no-undef
      `${formatMoney(price)}`,
    );
    const $compareAtPrice = $(
      `#product-compare-at-price-${this.handlizedId} > strong`,
    );
    if (compareAtPrice && compareAtPrice > price) {
      $compareAtPrice.parent().css('display', 'block');
      // eslint-disable-next-line no-undef
      $compareAtPrice.text(`${formatMoney(compareAtPrice)}`);
    } else {
      $compareAtPrice.text(``);
      $compareAtPrice.parent().css('display', 'none');
    }
  },
  updateImagesUtil(currAltText, featuredImage) {
    // hide all images
    $(`#product-thumb-container-${this.handlizedId}>img`).hide();
    const $currAltImgs = $(
      `#product-thumb-container-${this.handlizedId}>img[alt="${currAltText}"]`,
    );
    if ($currAltImgs.length) {
      // show images with alt tag = curr selected variant
      $currAltImgs.show();
    } else {
      // show all images as a fail safe
      $(`#product-thumb-container-${this.handlizedId}>img`).show();
    }

    if (featuredImage) {
      $(`#product-featured-image-${this.handlizedId}`).attr(
        'src',
        featuredImage.src,
      );
      // remove thumb selector for prev variant
      $(
        `#product-thumb-container-${this.handlizedId}>img.selected`,
      ).removeClass('selected');

      // add selected to new variant thumb
      $(`#product-thumb-container-${this.handlizedId}>img`)
        .eq(featuredImage.position - 1)
        .addClass('selected');
    }
  },
};
