// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const suggestionsContainer = document.getElementById(
  'header-search-suggestions-container',
);

function suggestionItem(text, url, styledText) {
  return `<div>
            <p>${text}</p>
            <a href=${url}>${url}</a>
            <p>${styledText}</p>
          </div>`;
}

function displayQueries(queries) {
  suggestionsContainer.innerHTML = `
  <h1>Did You Mean?</h1>
  `;

  const ul = document.createElement('ul');
  ul.id = 'suggestions';
  queries.forEach((query) => {
    const { text, url } = query;
    const styledText = query.styled_text;
    const li = document.createElement('li');

    const item = suggestionItem(text, url, styledText);
    li.innerHTML = item;
    ul.appendChild(li);
  });
  suggestionsContainer.appendChild(ul);
}

function diplayStaticQueries() {
  suggestionsContainer.innerHTML = `
  <h1>Treanding Searches</h1>
  <p>L.A. Girl</p>
  <p>Lamel</p>
  <p>Carbon Theory</p>
  <p>Blush</p>
  `;
}

function isStrNullOrEmptyOrBlank(str) {
  return str === null || str === undefined || str.trim() === '';
}

const searchInputChangeHandler = debounce((e) => {
  const searchTerm = e.target.value;
  if (isStrNullOrEmptyOrBlank(searchTerm)) {
    diplayStaticQueries();
  } else {
    const searchConfig = {
      params: {
        q: e.target.value,
        resources: {
          type: 'query,product,collection,page',
          limit: 5,
          limit_scope: 'each',
          options: {
            fields:
              'author,body,product_type,tag,title,variants.barcode,variants.sku,variants.title,vendor',
            unavailable_products: 'last',
          },
        },
      },
    };
    // eslint-disable-next-line no-undef
    axios
      .get(`search/suggest.json`, searchConfig)
      .then((res) => {
        const { results } = res.data.resources;
        const { queries } = results;
        if (queries.length === 0) {
          diplayStaticQueries();
        } else {
          displayQueries(queries);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}, 500);

// eslint-disable-next-line no-unused-vars
const searchForm = document.getElementById('header-search-form');
const searchInput = document.getElementById('result-q');
searchInput.addEventListener('input', searchInputChangeHandler);

// eslint-disable-next-line no-undef
// axios.interceptors.request.use((request) => {
//   console.log('Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });
