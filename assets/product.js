const productJs = {
  product: {},
  handlizedId: '',
  setHandlizedId(id) {
    this.handlizedId = id;
  },
  setProduct(productJson) {
    this.product = productJson;
    console.log(this.product);
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
      this.changePriceUtil(
        matchedVariant.price,
        matchedVariant.compare_at_price,
      );

      // change featured image if selected variant has a featured image
      const currAltText = `Group-${matchedVariant.options[0]}`;
      this.updateImagesUtil(
        currAltText,
        matchedVariant.featured_image,
        this.product.featured_image,
      );
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
    const priceId = `#product-price-${this.handlizedId}>strong`;
    const compareAtPriceId = `#product-compare-at-price-${this.handlizedId}>strong`;

    const $price = $(priceId);
    const $compareAtPrice = $(compareAtPriceId);

    // eslint-disable-next-line no-undef
    $price.text(`${formatMoney(price)}`);

    if (compareAtPrice && compareAtPrice > price) {
      $compareAtPrice.parent().css('display', 'block');
      // eslint-disable-next-line no-undef
      $compareAtPrice.text(`${formatMoney(compareAtPrice)}`);
    } else {
      $compareAtPrice.text(``);
      $compareAtPrice.parent().css('display', 'none');
    }
  },
  updateImagesUtil(currAltText, featuredImage, produtImage) {
    const thumbContainerId = `#product-thumb-container-${this.handlizedId}`;
    const featuredImageId = `#product-featured-image-${this.handlizedId}`;

    const $thumbImages = $(`${thumbContainerId}>img`);
    const $currVariantImages = $thumbImages.filter(`[alt="${currAltText}"]`);

    $thumbImages.hide();

    if ($currVariantImages.length) {
      $currVariantImages.show();
    } else {
      $thumbImages.show();
    }

    // CHANGE FEATURED IMAGE OF CURRENT SELECTED OPTION
    if (featuredImage) {
      $(featuredImageId).attr('src', featuredImage.src);
      $($thumbImages).filter('.selected').removeClass('selected');

      // add selected CLASS to new variant thumb
      $($thumbImages)
        .eq(featuredImage.position - 1)
        .addClass('selected');
    } else {
      $(featuredImageId).attr('src', produtImage);
    }
  },
};
