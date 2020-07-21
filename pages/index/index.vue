
<template>
	
	<view class="content">		
		<cu-custom bgColor="bg-gradual-blue" v-if="(PageCur=='chat'||PageCur=='pet')?false:true" >
		    <block slot="content">Cure-H</block>
			<block slot="right"><text class="cuIcon-scan" @tap="openscan" style="width: 70rpx; font-size: 45rpx; margin-left: 650rpx;"></text></block>
		</cu-custom>
		<!-- <music v-if="PageCur=='pet'"></music> -->
		<view v-if="PageCur=='home'" style="height: 40vh;width: 100%;display: flex;justify-content: center;margin-top: 25vh;flex-direction: column;align-items: center;justify-content: space-around;">
			<view  style=" width: 85%; text-align: center;font-size: 40rpx;height: 100rpx;background-color: #f01919;line-height: 100rpx;" @tap="openmusicplayer">Music by me</view>
			<view  style=" width: 85%; text-align: center;font-size: 40rpx;height: 100rpx;background-color: #ff557f;line-height: 100rpx;" @tap="openBzhan">B站排行榜</view>
			<view  style=" width: 85%; text-align: center;font-size: 40rpx;height: 100rpx;background-color: #87f010;line-height: 100rpx;" @tap="openqiming">无聊的起名工具</view>
			<view  style=" width: 85%; text-align: center;font-size: 40rpx;height: 100rpx;background-color: #87f010;line-height: 100rpx;" @tap="openshibie">人脸识别</view>
			<view  style=" width: 85%; text-align: center;font-size: 40rpx;height: 100rpx;background-color: #e2e506;line-height: 100rpx;" @tap="startshibie">测试识别</view>
			
		</view>
		
		<!-- <pet v-if="PageCur=='pet'"></pet> -->
		<friends v-if="PageCur=='chat'"></friends>
		<button @tap="logout" style="position: absolute;top: 80vh;left: 40%;background-color: #d2fcff;color: #5E00FF;" v-if="PageCur=='mine'"> 退出登陆 </button>
		<!-- <text>{{username}}</text> -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'../../static/tabbar/basics' + [PageCur=='home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="pet">
				<view class='cuIcon-cu-image'>
					<image :src="'../../static/tabbar/basics' + [PageCur=='pet'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">虚拟</view>
			</view>
			<view class="action" @click="NavChange" data-cur="chat">
				<view class='cuIcon-cu-image'>
					<image :src="'../../static/tabbar/component' + [PageCur == 'chat'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">聊天</view>
			</view>
			<view class="action" @click="NavChange" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<image :src="'../../static/tabbar/plugin' + [PageCur == 'mine'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">个人</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home',
				username:""
			}
		},
		onLoad() {
			// // #ifdef APP-PLUS
			//        var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
			//        this.username = currentWebview.children()
			// 	   let that = this
			//            wv = currentWebview
			// 		   that.username = wv
			// 		   that.username = ""
			//            wv.setStyle({top:150,height:300})
			//        // #endif
			const username = uni.getStorageSync("emailaddress")
			this.username = username
			if(username){
				console.log(username)
			}
			else{
				// console.log(username)
				uni.navigateTo({
					url: '../firstopen/firstopen',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
			
		},
		methods: {
				startshibie(){
					uni.navigateTo({
						url:"../startshibie/startshibie",
						fail:e=>{
							console.log(e)
						}
					})
				},
				openshibie(){
					uni.navigateTo({
						url:"../renlianshibie/renlianshibie",
						fail:e=>{
							console.log(e)
						}
					})
				},
				openBzhan(){
					uni.navigateTo({
						url:"../pet/pet"
					})
				},
				openqiming(){
					uni.navigateTo({
						url:"../qiming/qiming"
					})
				},
				logout(){
					uni.clearStorage()
					uni.redirectTo({
						url:"../firstopen/firstopen"
					})
				},
				NavChange: function(e) {
					this.PageCur = e.currentTarget.dataset.cur
				},
				openmusicplayer(){
					uni.navigateTo({
						url:"../music/music"
					})
				},
				openscan(){
					uni.scanCode({
						scanType:['qrCode'],
						success:res=>{
							var qrid = res.result
							uni.request({
								methods:"GET",
								url:"http://116.62.47.156/updateqrstate/?qrid="+qrid+"&state=1&emailaddress="+this.username,
								success: (response) => {
									console.log(response.data)
									// uni.navigateTo({
									// 	url:"../qrlogin/qrlogin?qrid="+res.result,
									// 	success: (res) => {
									// 		console.log(res)
									// 	}
									// })
									uni.navigateTo({
										url: '../qrlogin/qrlogin?qrid='+qrid,
										success: res => {},
										fail: () => {},
										complete: () => {}
									});
								}
							})
						},
						fail(res) {
							console.log(res)
						}
					})
				}
		}
	}
</script>

<style>

</style>
