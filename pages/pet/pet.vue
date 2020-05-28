<template>
	<view>
		<web-view src="http://116.62.47.156/static/live2d/" :webview-styles="webviewStyles" style="height: 75vh;"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
				                    progress: {
				                        color: '#FF3333'
				                    }
				                }
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
