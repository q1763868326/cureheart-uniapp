<template>
	<view>
		<view class="title">
			<text>Chats</text>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in userlist" :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" @click="openchat(item)">
				<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
				<view class="content">
					<view class="text-grey">{{item.username}}</view>
					<view class="text-gray text-sm">{{item.emailaddress}}</view>
						<!-- <text class="cuIcon-infofill text-red  margin-right-xs"></text> -->
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{item["disread_newdate"]}}</view>
					<view :class="item['disread_count']>0?'cu-tag round bg-red sm':'cu-tag  round bg'" style="text-align: center;padding-top: 3rpx; font-size: 1rpx;">{{item["disread_count"]>0?item["disread_count"]:""}}</view>
				</view>
				<view class="move">
					<view class="bg-grey">置顶</view>
					<view class="bg-red">删除</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				emailaddress:"",
				modalName: null,
				userlist:[],
				timer:null
			}
		},
		mounted() {
			this.getuserlist()
			var that = this
			this.timer = setInterval(function(){
				that.getuserlist()
			},5000)
		},
		activated() {
			this.emailaddress = uni.getStorageSync("emailaddress")
			uni.request({
				url:"http://116.62.47.156/getuserlist/",
				data:{"emailaddress":this.emailaddress},
				method:"POST",
				success:res=> {
					this.userlist = res.data["data"]
					
				},
				})
		},
		onShow() {
			
		},
		onBackPress() {
			console.log("back")
		},
		methods: {
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			openchat(e){
				uni.navigateTo({
					url:"../chat/chat?emailaddress_other="+e.emailaddress+'&'+"username_other="+e.username
				})
			},
			getuserlist(){
				this.emailaddress = uni.getStorageSync("emailaddress")
				uni.request({
					url:"http://116.62.47.156/getuserlist/",
					data:{"emailaddress":this.emailaddress},
					method:"POST",
					success:res=> {
						this.userlist = res.data["data"]
						
					},
					})
			}
		}
	}
</script>

<style>
	.title{
		background: #FFFFFF;
		box-shadow: 0px 1rpx 0px rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(56rpx);
		width: 100%;
		height: 88rpx;
		font-family: KoHo;
		font-style: normal;
		font-weight: normal;
		font-size: 28px;
		line-height: 22px;
		/* identical to box height, or 79% */
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		letter-spacing: -0.408px;
		
		color: #000000;

	}
	.bg{		
		background-color: rgba(255, 255, 255,0);
	}
</style>
