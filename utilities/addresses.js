export const fetchCountries = async () => {
	try {
		const { success, data } = await this.$axios.$get('/api/all-countries');
		if (success) {
			return data
		}
		return null
	} catch (error) {
		return null
	}
}