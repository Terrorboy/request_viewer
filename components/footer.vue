<template>
	<!-- footer { -->
		<footer class="footer">
			<div class="container">
				<div class="row align-items-center flex-row-reverse">
					<div class="col-12 col-lg-auto mt-3 mt-lg-0 text-center">
						Copyright {{year}} <a href="/">{{env.site_name}}</a>. All right reserved. Designed by <a href="https://tabler.github.io/" target="_blank">tabler</a>.
					</div>
				</div>
			</div>
		</footer>
	<!-- footer } -->
</template>
<script>
	export default {
		data() {
			return {
				env: this.$nuxt.context.env,
				year: new Date().getFullYear()
			}
		}
	}
</script>