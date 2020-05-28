<template>
	<view style="background: url(../../static/loginbg.jpg); background-repeat: no-repeat;background-size: 100% 100%; height: 100vh; width: 100vh;">
		<view>
			<text class="title">Regist</text>
			<input class="input1" style="top: 342rpx;" placeholder="Username" placeholder-class="placeholder" v-model="username" confirm-type="next"/>
			<input class="input2" style="top: 474rpx;" placeholder="Email Address" placeholder-class="placeholder" v-model="emailaddress" confirm-type="next"/>
			<input class="input3" style="top: 610rpx;" placeholder="Password" placeholder-class="placeholder" password="true" v-model="password1" confirm-type="next"/>
			<input class="input4" style="top: 746rpx;" placeholder="Password Again" placeholder-class="placeholder" v-model="password2" password="true"/>
			<button class="registbt cu-btn shadow" style="top:912rpx ;" @tap="regist">Regist</button>
			<button class="backlogbt cu-btn shadow" style="top: 1060rpx;" @tap="backtolog">Back To Login</button>
		</view>
		<uni-popup ref="tips" type="message">
		<uni-popup-message  type="error" :message="text_tips" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="success" type="message">
		<uni-popup-message  type="success" message="注册成功" :duration="2000"></uni-popup-message>
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
				username:"",
				emailaddress:"",
				password1:"",
				password2:"",
				text_tips:""
			}
		},
		onLoad() {
			
		},
		methods: {
			regist(){
				this.validate()
			},
			validate(){
				if(this.username==""){
					this.text_tips="用户名不能为空！"
					this.$refs.tips.open();
					return;
				}
				var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
						if(reg.test(this.emailaddress)){
							
						}else{
							this.text_tips="请输入正确的邮箱地址！"
							this.$refs.tips.open();
							return;
						}
				if(this.password1.length<6){
					this.text_tips="密码长度需>=6,请重新输入！"
					this.$refs.tips.open();
					return;
				}
				if(this.password1!=this.password2){
					this.text_tips="两次输入密码不一致!请重新确认！"
					this.$refs.tips.open();
					return
				}
				uni.request({
					url: 'http://116.62.47.156/chregistuser/',
					method: 'POST',
					data: {
						"username":this.username,
						"emailaddress":this.emailaddress,
						"password":this.$md5(this.password1)
					},
					success: res => {
						if(res.data=="ok")
							this.$refs.success.open();
						if(res.data=="exist")
							this.text_tips="该邮箱已注册，请登录！"
							this.$refs.tips.open()
					},
					fail: () => {},
					complete: () => {}
				});
				
			},
			backtolog(){
				uni.navigateTo({
					url: '../login/login'
				});
			}
		}
	}
</script>

<style>
	@font-face {
		font-family:KoHo;
		src: url("../../static/koho/KoHo-Medium.ttf");
	}
	.registbt{
		position: absolute;
		width: 478rpx;
		height: 118rpx;
		left: 136rpx;
		background: #40EE47;
		border-radius: 56rpx;
		font-family: KoHo;
		font-style: normal;
		font-weight: normal;
		font-size: 55rpx;
		line-height: 62rpx;
		/* identical to box height */
		justify-content: center;
		display: flex;
		align-items: center;
		text-align: center;
		
		color: #000000;
	}
	.backlogbt{
		position: absolute;
		width: 478rpx;
		height: 118rpx;
		left: 136rpx;
		background: #3D86F3;
		border-radius: 56rpx;
		font-family: KoHo;
		font-style: normal;
		font-weight: normal;
		font-size: 55rpx;
		line-height: 62rpx;
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
	.input3{
		position: absolute;
		width: 616rpx;
		height: 86rpx;
		left: 62rpx;
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
	.input4{
		position: absolute;
		width: 616rpx;
		height: 86rpx;
		left: 62rpx;
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
