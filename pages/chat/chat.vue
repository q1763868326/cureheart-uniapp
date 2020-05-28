<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText" @tap="closeInterval">返回</block><block slot="content">{{username_other}}</block></cu-custom>
		<view class="cu-chat chatpage" ref="chatlist">
			<view :class="item['from']==emailaddress?'cu-item self':'cu-item'" v-for="(item,index) in messagelist" :key="index">
				<view v-if="item['from']==emailaddress?false:true" class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="main">
					<view class="content shadow" style="word-wrap: break-word;word-break: normal;display: flex;">
						<text>{{item["content"]}}</text>
					</view>
				</view>	
				<view v-if="item['from']==emailaddress?true:false" class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">{{item['date']}}</view>
			</view>
			
		</view>
		
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur" v-model="message" @confirm="sendmessage"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @tap="sendmessage">send</button>
		</view>
		<view id="bottom"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username_other:"",
				emailaddress:"",
				emailaddress_other:"",
				InputBottom: 0,
				messagelist:[
					
				],
				message:"",
				timer:null,
				first:true,
				count:0,
				start:true
			}
		},
		onLoad(e) {
			this.username_other=e.username_other
			this.emailaddress_other=e.emailaddress_other
			console.log(this.username_other)
			this.emailaddress = uni.getStorageSync("emailaddress")
			this.getmessage()
		},
		onShow() {
			var that = this;
			this.timer=setInterval(
			function(){
				that.getmessage()
			}
			,1000)
		},
		onUnload() {
			console.log("stop")
			clearInterval(this.timer)
		},
		onHide() {
			console.log("stop")
			clearInterval(this.timer)
		},
		onBackPress() {
			console.log("stop")
			clearInterval(this.timer)
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			sendmessage(){
				if(this.message.trim()==""){
					return
				}
				uni.request({
					url:"http://116.62.47.156/sendmessage/",
					method:"POST",
					data:{
						'from':this.emailaddress,'to':this.emailaddress_other,'content':this.message,"date":new Date().getTime()
					},
					success: (response) => {
						if(response.data=="ok"){
							this.getmessage()
							this.start=true
						}
					}
				})
			},
			closeInterval(){
				clearInterval(this.timer)
			},
			getmessage(){
				var that = this;
				if(this.start){
					uni.request({
						url: 'http://116.62.47.156/getmessage/',
						method: 'POST',
						data: {
							'from':this.emailaddress,'to':this.emailaddress_other
						},
						success: res => {
							var update = false;
							if(res.data["data"].length>this.messagelist.length){
								update = true;
								this.count=0;
							}
							else{
								update=false;
								this.count+=1;
								if(this.count>60){
									this.start=false;
									this.count=0;
								}
							}
							this.messagelist = res.data["data"]
							if(update){
								console.log("update")
								this.gotobuttom()
							}
						},
						fail: () => {},
						complete: () => {
							
						}
					});
				}
				else{
					this.count+=1
					if(this.count>30){
						this.start=true;
						this.count=0;
					}
				}
				if(that.first){
					console.log("first")
					that.gotobuttom()
					that.first=false
				}
			},
			gotobuttom(){
				this.message=""
				document.getElementById('bottom').scrollIntoView();
			}
		}
	}
</script>

<style>
	.chatpage{
	  padding-bottom: 100upx;
	}
	#bottom{
		width: 100%;
		height: 90rpx;
		margin-top: 90rpx;
	}
</style>
