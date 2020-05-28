<template>
	<view>
					
		<view class="player" v-show="true">
			<image :class="isplaying?'music_img':'music_img_noanimation'" :src="src"></image>
			<text class="name_music">{{currentmusic}}</text>
			<text :class="isplaying?'cuIcon-stop playbt':'cuIcon-playfill playbt'" @tap="playorstop"></text>
			<text class="cuIcon-list listbt" @tap="display"></text>
		</view>
		
		<view class="mask" @tap="closelist"></view>
		 <uni-transition :modeClass="['fade','slide-bottom']" :duration="700" :show="displaylist" :styles="playlist">
			<!-- <uni-transition :modeClass="['fade','slide-bottom']" duration="700" :show="!displaylist" :styles="{'width':'100%','height':'100vh'}" @tap="display"> -->
			
			<!-- <view class="playlist" v-if="displaylist"> -->
				<view class="title">
					<text>播放列表</text>
				</view>
				<view  class="scrolllist" >
					<view class="musicitem" v-for="(item,index) in musiclist" :key="index" @tap="playmusic(item)">
						<text class="cuIcon-sound" style="color:#e40c0c; font-size: 34rpx; margin-left: 10rpx;margin-right: 10rpx;"></text>
						<text class="item_name">{{item["musicname"]}}</text>
						<text class="cuIcon-close delete"></text>
					</view>
				</view>
			<!-- </view> -->
			</uni-transition>		
		<!-- </uni-transition>		 -->		
	</view>
</template>

<script>
	import uniTransition from "@/components/uni-transition/uni-transition.vue"
	export default {
		components:{uniTransition},
		data() {
			return {
				timer:null,
				animation:null,
				animationData: {},
				src:"../../static/music_img.jpg",
				isplaying:false,
				displaylist:false,
				innerAudioContext:null,
				musiclist:[],
				currentmusic:"",
				playlist:{
					'overflow': 'hidden',
					'position': 'absolute',
					'top':'650rpx',
					'width': '100%',
					'height': '685rpx',
					'background-color': 'white',
					'border-radius': '36rpx',
					'border': '6rpx solid #222'
				}
			}
		},
		onLoad() {
			uni.request({
				url:"http://116.62.47.156/getmusiclist/",
				method:"GET",
				success: (res) => {
					this.musiclist=res.data['data']
				}
			})
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = false;
			this.innerAudioContext.src = this.currentmusic;
			this.innerAudioContext.volume = 0.8
			var that = this;
			this.innerAudioContext.onEnded(function(){
				let item = that.musiclist[Math.floor(Math.random()*(that.musiclist.length))]
				that.innerAudioContext.src = item["src"]
				that.currentmusic = item["musicname"]
				that.innerAudioContext.play()
			})
		},
		methods: {
			playmusic(item){
				this.innerAudioContext.stop()
				this.innerAudioContext.src = item["src"]
				this.currentmusic = item["musicname"]
				this.innerAudioContext.play()
				this.displaylist=false
				this.isplaying=true
			},
			playorstop(){
				var that = this
				if(!this.innerAudioContext.src){
					var item = this.musiclist[Math.floor(Math.random()*(this.musiclist.length))]
					this.innerAudioContext.src = item["src"]
					this.currentmusic = item["musicname"]
				}
				this.isplaying=!this.isplaying
				if(this.isplaying){
				    this.innerAudioContext.play()
					this.playanimation()
					this.timer = setInterval(function(){
						that.playanimation()
					}.bind(this),5000)
				}
				else{
					this.innerAudioContext.pause()
				}
			},
			display(){
				this.displaylist=true		
			},
			closelist(){
				this.displaylist=false
			
			},
			playanimation(){
				this.animation = uni.createAnimation({
				     duration: 5000,
				       timingFunction: 'linear',
				   })
				   
				   this.animationData = this.animation.rotate(360).step().export()
			}
		}
	}
</script>

<style>
	 
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
	 
		100% {
			transform: rotate(360deg);
		}
	}
	.music_img{
		position: absolute;
		top: 16rpx;
		bottom: 14rpx;
		right: 610rpx;
		left: 18rpx;
		width: 106rpx;
		height: 106rpx;
		border-radius: 418rpx;
		animation: spin 5s linear infinite;
	}
	.music_img_noanimation{
		position: absolute;
		top: 16rpx;
		bottom: 14rpx;
		right: 610rpx;
		left: 18rpx;
		width: 106rpx;
		height: 106rpx;
		border-radius: 418rpx;
	}
	.mask{
		  width: 750rpx;
		  height: 643rpx;
		  background-color: rgba(0, 153, 255, 0);
	}
	.delete{
		width: 100%;
		text-align: end;
		line-height: 68rpx;
		font-size: 34rpx;
		flex: 1;
		margin-right: 25rpx;
	}
	.cuIcon-stop{
		font-weight: bold;
	}
	.item_name{
		  overflow: scroll;
		  font-family: "HelveticaNeue-CondensedBlack", sans-serif;
		  color: #e40c0c;
		  flex: 10;
		  font-size: 34rpx;
		  letter-spacing: 0px;
		  line-height: 68rpx;
		  text-align: left;
		  
	}
	.title{
		  width: 750rpx;
		  height: 98rpx;
		  background-color: white;
		  border: 2rpx solid #222;
		  overflow: visible;
		  font-family: "Inter", sans-serif;
		  color: #a39000;
		  font-size: 38rpx;
		  letter-spacing: 0rpx;
		  line-height: 98rpx;
		  padding-left: 24rpx;
		  margin-bottom: 5rpx;
	}
	.scrolllist{
		width: 100%;
		height: 100%;
		overflow: scroll;
		background-color: white;
	}
	.musicitem{
		  width: 750rpx;
		  height: 68rpx;
		  display: flex;
		  align-items: center;
		  margin-bottom: 20rpx;
		  background-color: rgba(0, 153, 255, 0.5);
	}
	.playlist{
		overflow: hidden;
		position: absolute;
		top:650rpx;
		width: 100%;
	    height: 685rpx;
	    background-color: white;
	    border-radius: 36rpx;
	    border: 6rpx solid #222;
	}
	.player{
		 width: 100%;
		  height: 136rpx;
		  position: absolute;
		  bottom: 0;
		  background-color: #141415;
	}
	.playbt{
		color: #F00000;
		position: absolute;
		top:28rpx;
		bottom: 28rpx;
		left: 526rpx;
		right: 144rpx;
		text-align: center;
		font-size: 80rpx;
	}
	.listbt{
		color: #0A74FF;
		position: absolute;
		text-align: center;
		line-height: 100%;
		line-height: 80rpx;
		font-size: 55rpx;
		padding-top: 3rpx;
		top:28rpx;
		bottom: 28rpx;
		left: 642rpx;
		right: 28rpx;
	}
	.name_music{
		position: absolute;
		top: 25rpx;
		bottom: 54rpx;
		left: 175rpx;
		right: 354rpx;
		width: 300rpx;
		height: 80%;
		overflow-wrap: break-word;
		overflow: hidden;
		opacity: 0.73;
		font-family: "Inter", sans-serif;
		color: rgba(255, 255, 255, 0.93);
		font-size: 30rpx;
	}
</style>
