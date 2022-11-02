<template>
	<main class="main">
		<div
			class="login-page bg-image  pt-3 pb-3"
			style="background-color: #fff"
		>
			<div class="container">
				<div class="form-box">
					<div class="tab-content ">
						<FormImage />
						<slot />
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { mapState } from 'vuex';
import FormImage from '~/components/auth/FormImage';

export default {
	components: {
		FormImage,
	},
	computed: {
		...mapState({
			loading: state => state.loading
		})
	}
};
</script>