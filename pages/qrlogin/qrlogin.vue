<template>
	<view>
		<image src="../../static/loginbg.jpg" style="width: 100%;height: 100vh;"></image>
		<view style="position: absolute;top:48vh;display: flex;flex-direction: column;align-items: center;width: 100%;height: 13vh;justify-content: space-between;">
			<button @tap="comfirm" style="background-color: #ffffff;width: 280rpx;">确认登陆</button>
			<button @tap="cancle" style="background-color: #000000;width: 280rpx;margin-top: 40rpx;color: #FFFFFF;">取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"qrid":"",
				username:""
			}
		},
		onLoad(e) {
			const username = uni.getStorageSync("emailaddress")
			
			
			this.username = username
			this.qrid=e.qrid
		},
		methods: {
			comfirm(){
				const password = uni.getStorageSync("password")
				uni.request({
					url:"http://116.62.47.156/updateqrstate/?qrid="+this.qrid+"&state=3&emailaddress="+this.username+"&password="+password,
					method:"GET",
					success: (res) => {
						console.log(res.data)
						uni.navigateBack({
							
						})
					}
				})
			},
			cancle(){
				uni.request({
					url:"http://116.62.47.156/updateqrstate/?qrid="+this.qrid+"&state=2&emailaddress="+this.username,
					method:"GET",
					success: (res) => {
						uni.navigateBack({
							
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
