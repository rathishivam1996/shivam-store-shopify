// eslint-disable-next-line no-unused-vars
function storeToLocalStorage(key, value) {
  localStorage.setItem(key, value);
  console.log(`Saved stored key=${key} value=${value}`);
}

// eslint-disable-next-line no-unused-vars
function getFromLocalStorage(key) {
  const item = localStorage.getItem(key);
  console.log(`Fetched stored key=${key} value=${item}`);
  return item;
}

// eslint-disable-next-line no-unused-vars
function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

// eslint-disable-next-line no-unused-vars
function clearLocalStorage() {
  localStorage.clear();
}

function addOrUpdateObject(productsArray, maxSize, recentlyViewed) {
  const copy = [...productsArray];
  // Check if the array already contains an object with the specified productHandle
  const existingIndex = copy.findIndex(
    (obj) => obj.productHandle === recentlyViewed.productHandle,
  );

  // If the object doesn't exist, add a new one to the front
  if (existingIndex === -1) {
    // If the array is full, remove the last item
    if (copy.length === maxSize) {
      copy.pop();
    }

    // Add the new object to the front
    copy.unshift(recentlyViewed);
  } else if (existingIndex !== 0) {
    // If the existing object is not at the front, move it to the front
    const existingObject = copy.splice(existingIndex, 1)[0];
    copy.unshift(existingObject);
  }
  return copy;
}

// eslint-disable-next-line no-unused-vars
function saveRecentlyViewedToLocalStorage(key, recentlyViewed) {
  const prevArr = JSON.parse(getFromLocalStorage(key)) || [];

  const newArr = addOrUpdateObject(prevArr, 4, recentlyViewed);

  storeToLocalStorage(key, JSON.stringify(newArr));
}

// eslint-disable-next-line no-unused-vars
async function fetchAllRecentlyViewedProducts(arr) {
  const urls = [];

  for (let i = 0; i < arr.length; i += 1) {
    urls.push(
      `${window.Shopify.routes.root}products/${arr[i].productHandle}.js`,
    );
  }
  try {
    // eslint-disable-next-line no-undef
    const responses = await axios.all(urls.map((url) => axios.get(url)));
    return responses.map((res) => res.data);
  } catch (axiosErr) {
    console.log(axiosErr);
  }
  return undefined;
}

const product = '';

const discountAmount = product.compare_at_price - product.price;
const discountPercentage = (discountAmount / product.compareAtPrice) * 100;

const productCard = `
<div class="p-0 d_cent">
<div class="product-card mx-1 mx-md-3 ">
  <a href="product.url">
    <div class="product-image p-0">
      <img
        loading="lazy"
        class="img-fluid asp34"
        src="${product.featuredImage}"
        alt="${product.title}"
        title="${product.title}"
        width="292"
        height="390"
      >
    </div>
  </a>
  <div class="product-details">
    <div>
      <p class="mb-0 product-brand">${product.vendor}</p>
      <p class="mb-0 product-title">${product.title}</p>
    </div>
    <div
      class="ssw-widget-avg-rate-listing ssw-stars ssw-stars-large ssw-hide"
      data-rate="0"
      tabindex="0"
      aria-label="Review listing, rating is: 0"
    >
      <i class="ssw-icon-star-empty"></i>
      <span class="ssw-review-count" tabindex="0" aria-label=" 0"> (0) </span>
    </div>
    <div>
      <div class="product-price mb-0">
        <span>
          <span class="selling-price">${product.price}</span>
          <span class="old-price">
            ${product.compare_at_price} > ${product.price} ? ${product.compare_at_price} : no_offer }
          </span>
          
          <span class="discount">
            {{ product.compare_at_price }} > {{ product.price }} ? {{ discount_percentage }} : no_offer }
          </span>
        </span>
      </div>
      <div class="shades"></div>
    </div>

    <a href="{{ product.url }}">
      <button class="select-shade">Add To Bag</button>
    </a>
  </div>
</div>
</div>
`;
