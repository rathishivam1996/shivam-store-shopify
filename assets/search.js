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

const headerSearchSuggestions = document.getElementById(
  'header-search-suggestions',
);

function searchSuggestionItem({ text, url, styledText }) {
  return `
  <p>${text}</p>
  <a href=${url}>${url}</a>
  <p>${styledText}</p>
  `;
}

const searchInputChangeHandler = debounce((e) => {
  const searchTerm = e.target.value;
  const searchConfig = {
    params: {
      q: searchTerm,
      resources: {
        type: 'query,product,collection,page',
        limit: 5,
        limit_scope: 'each',
        options: {
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

      for (let i = 0; i < queries.length; i += 1) {
        const query = queries[i];
        const { text, url } = query;
        const styledText = query.styled_text;
        headerSearchSuggestions.appendChild(
          searchSuggestionItem(text, url, styledText),
        );
      }
    })
    .catch((err) => {
      console.error(err);
    });
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
