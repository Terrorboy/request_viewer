<template>
	<div class="page">
	    <div class="page-main">
			<headerTemplate />
			<nuxt />
			<footerTemplate />
		</div>
	</div>
</template>

<script>
	import headerTemplate from '~/components/header.vue'
	import footerTemplate from '~/components/footer.vue'
	export default {
		components: {
			headerTemplate,
			footerTemplate
		}
	}
</script>