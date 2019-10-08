<template>
	<div>
		<!-- header { -->
			<div class="header py-4">
				<div class="container">
					<div class="d-flex">
						<a v-bind:href="env.site_url" class="header-brand">
							{{env.site_name}}
						</a>
						<div class="d-flex order-lg-2 ml-auto"></div>
						<a href="#" class="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
							<span class="header-toggler-icon"></span>
						</a>
					</div>
				</div>
			</div>
		<!-- header } -->

		<!-- header menu { -->
			<div class="header collapse d-lg-flex p-0" id="headerMenuCollapse">
				<div class="container">
					<div class="row align-items-center">

						<!-- menu list { -->
							<div class="col-lg order-lg-first">
								<ul class="nav nav-tabs border-0 flex-column flex-lg-row">
									<li class="nav-item">
										<a v-bind:href="env.site_url" class="nav-link">
											<i class="fe fe-home"></i>
											Home
										</a>
									</li>
									<li class="nav-item">
										<router-link to="/" class="nav-link">
											<i class="fe fe-activity"></i>
											Request Viewer
										</router-link>
									</li>
								</ul>
							</div>
						<!-- menu list } -->
					</div>
				</div>
			</div>
		<!-- header menu } -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				env: this.$nuxt.context.env
			}
		}
	}
</script>