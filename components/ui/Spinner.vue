<template>
	<div class="loader" :class="{ 'viewport': viewport }">
		<span
        role="status"
        class="spinner-border text-primary"
        style="width: 6rem; height: 6rem;"
    >
      <span class="sr-only">Spinning</span>
    </span>
	</div>
</template>

<script>
export default {
	props: {
		viewport: {
			type: Boolean
		}
	}
}
</script>

<style lang="scss" scoped>
.loader {
	&.viewport {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: rgba(#fff, 0.5);
	}
}
</style>
