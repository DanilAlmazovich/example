export const fetchProduct = async ({ $axios, params, i18n }) => {
	try {
		const { success, data, error } = await $axios.$get(`/api/product/details/${params.slug}`, {
			headers: {
				...$axios.defaults.headers,
				'Accept-Language': i18n.locale,
			}
		});
		if (success) {
			return {
				product: data,
				fetched: true
			};
		} else {
			return {
				error,
				fetched: true
			}
		}
	} catch (error) {
		// const { message } = error.response.data;
		return {
			product: null,
			// error: message,
			fetched: true
		}
	}
}