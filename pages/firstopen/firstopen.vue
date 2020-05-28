<template>
	<view>
	 <view class="bg">
		 <image :src="src" class="logo"></image>
		 <text class="text">Cure-H</text>
	 </view>
	 <view style="height: 10vh;display: flex; align-items: center;">
		 <button class="cu-btn lg shadow login" @tap="login">LOG IN</button>
		 <button class="cu-btn lg shadow register" @tap="regist">REGISTER</button>
	 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:"../../static/logo-firstopen.jpg"
			}
		},
		methods: {
			login(){
				uni.navigateTo({
					url: '../login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			regist(){
				uni.navigateTo({
					url:"../register/register"
				})
			}
		}
	}
</script>

<style>
	
	.text{
		position: absolute;
		width: 350rpx;
		height: 108rpx;
		left: 255rpx;
		top: 478rpx;
		
		font-family: Comfortaa;
		font-style: normal;
		font-weight: normal;
		font-size: 96rpx;
		line-height: 108rpx;
		/* identical to box height */
		
		display: flex;
		align-items: center;
		text-align: center;
		letter-spacing: -0.015em;
		
		color: #000000;
	}
	.logo{
		position: absolute;
		width: 76rpx;
		height: 76rpx;
		left: 160rpx;
		top: 496rpx;
	}
	.bg{
		background: url(../../static/firstopen.jpg);
		background-repeat: space;
		background-size: 100% 100%;
		background-origin: content-box ;
		height: 90vh;
		
	}
	.register{
		flex: 1;
		margin-left: 18rpx;
		border-radius: 6px;
		background-color: #000000; 
		color: white;
		font-family: Roboto;
		font-style: normal;
		font-weight: 900;
		font-size: 13px;
		line-height: 15px;
		display: flex;
		align-items: center;
		text-align: center;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.login{
		flex: 1;
		font-family: Roboto;
		font-style: normal;
		font-weight: 900;
		font-size: 13px;
		line-height: 15px;
		display: flex;
		align-items: center;
		text-align: center;
		letter-spacing: 0.04em;
		text-transform: uppercase;	
		color: #000000;
		background: #FFFFFF;
		border: 2px solid #000000;
		box-sizing: border-box;
		border-radius: 6px;
	}
</style>
