export const fetchProducts = async ($axios, params, config = {}) => {
  try {
    const query = {
      "filters": {},
      "context": {},
      "page": params.page ?? 1
    }
    if (params.sortfield) {
      query.sortField = params.sortfield;
      query.sortOrder = params.sortorder === 'asc' ? 1 : 0;
    }

    setQueryDataArray(params, 'categories', 'categories.slug', query.filters)
    setQueryDataArray(params, 'brands', 'brand.slug', query.filters)
    setQueryDataArray(params, 'products', 'slug', query.filters)
    setQueryData(params, 'product', 'name', query.filters, 'startsWith')
    setQueryData(params, 'lowest-price', 'lowest_price', query.filters, '>=')
    setQueryData(params, 'highest-price', 'highest_price', query.filters, '<=')
    setQuery(params, 'category-context', 'category', query.context)
    setQuery(params, 'brand-context', 'brand', query.context)

    const {success, data, error} = await $axios.$get(`/api/product/paginate`, {params: query, ...config});
    if (success) {
      return {
        products: data,
        fetched: true
      };
    } else {
      return {
        error,
        fetched: true
      }
    }
  } catch (error) {
    if ($axios.isCancel(error)) {
      return {
        canceled: true
      }
    }

    let message = error?.response?.data.message;
    if (!message) message = error.message;
    return {
      error: message,
      fetched: true
    }
  }
}

function setQueryDataArray(query, key, filterKey, filter, match = 'contains') {
  if (!(key in query)) return;

  const value = query[key]?.split(',').map(i => i.split(':')[0]);
  if (value?.length) filter[filterKey] = {
    value,
    "matchMode": match,
    globalFilter: true
  }
}

function setQueryData(query, key, filterKey, filter, match = 'contains') {
  if (!(key in query)) return;

  const value = query[key];
  if (value) filter[filterKey] = {
    value,
    "matchMode": match,
    globalFilter: true
  }
}

function setQuery(query, key, filterKey, filter) {
  if (!(key in query)) return;

  filter[filterKey] = `${query[key]}`.split(':')[0]
}
