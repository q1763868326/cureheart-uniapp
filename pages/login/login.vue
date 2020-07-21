<template>
	<view style="background: url(../../static/loginbg.jpg); background-repeat: no-repeat;background-size: 100% 100%; height: 100vh; width: 100vh;">
		<text class="title">Login</text>
		<input class="input1" placeholder="Email Address" placeholder-class="placeholder" v-model="emailaddress" confirm-type="next"/>
		<input class="input2" placeholder="Password" placeholder-class="placeholder"  password="true" v-model="password" @confirm="login"/>
		<button class="loginbt cu-btn shadow" @tap="login">Login</button>
		<button class="registerbt cu-btn shadow" @tap="regist">Register</button>
		<uni-popup ref="tips" type="message">
		<uni-popup-message  type="error" message="邮箱或密码错误,请重新输入!" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import UniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	
	
	export default {
		components:{
			uniPopup,
			uniPopupDialog,
			UniPopupMessage
		},
		data() {
			return {
				emailaddress:"",
				password:""
			}
		},
		methods: {
			login(){
				var that = this;
				uni.request({
					url: 'http://116.62.47.156/chloginuser/',
					method: 'POST',
					data: {
						"emailaddress":this.emailaddress,
						"password":this.$md5(this.password)
					},
					success: res => {
						if(res.data=="ok"){
							uni.setStorageSync("emailaddress",that.emailaddress)
							uni.setStorageSync("password",that.$md5(that.password))
							uni.reLaunch({
								url:"../index/index"
							})
						}
						else{
							this.$refs.tips.open()
						}
					},
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
	@font-face {
		font-family:KoHo;
		src: url("../../static/koho/KoHo-Medium.ttf");
	}
	.loginbt{
		position: absolute;
		width: 478rpx;
		height: 118rpx;
		left: 136rpx;
		top: 618rpx;
		background: #40EE47;
		border-radius: 56rpx;
		font-family: KoHo;
		font-style: normal;
		font-weight: normal;
		font-size: 66rpx;
		line-height: 86rpx;
		/* identical to box height */
		justify-content: center;
		display: flex;
		align-items: center;
		text-align: center;
		
		color: #000000;
	}
	.registerbt{
		position: absolute;
		width: 478rpx;
		height: 118rpx;
		left: 136rpx;
		top: 784rpx;
		background: #3D86F3;
		border-radius: 56rpx;
		font-family: KoHo;
		font-style: normal;
		font-weight: normal;
		font-size: 66rpx;
		line-height: 86rpx;
		/* identical to box height */
		justify-content: center;
		display: flex;
		align-items: center;
		text-align: center;
		
		color: #000000;
	}
	.placeholder{
		font-family: KoHo;
		font-style: normal;
		font-weight: normal;
		font-size: 41.25rpx;
		line-height: 54rpx;
		/* identical to box height */
		display: flex;
		align-items: center;
		
		color: rgba(0, 0, 0, 0.38);
	}
	.input1{
		position: absolute;
		width: 616rpx;
		height: 86rpx;
		left: 58rpx;
		top: 360rpx;
		
		border: 6rpx solid #000000;
		box-sizing: border-box;
		
		font-family: KoHo;
		font-style: normal;
		font-weight: normal;
		font-size: 41.25rpx;
		line-height: 54rpx;
		padding-left: 32rpx;
		/* identical to box height */
		display: flex;
		align-items: center;
	}
	.input2{
		position: absolute;
		width: 616rpx;
		height: 86rpx;
		left: 62rpx;
		top: 496rpx;
		border: 6rpx solid #000000;
		box-sizing: border-box;
		
		font-family: KoHo;
		font-style: normal;
		font-weight: normal;
		font-size: 41.25rpx;
		line-height: 54rpx;
		padding-left: 32rpx;
		/* identical to box height */
		display: flex;
		align-items: center;
	}
	.title{
		position: absolute;
		width: 516rpx;
		height: 182rpx;
		left: 116rpx;
		top: 100rpx;
		
		font-family: KoHo;
		font-style: normal;
		font-weight: normal;
		font-size: 150rpx;
		line-height: 194rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		
		color: #211D1D;

	}
</style>
