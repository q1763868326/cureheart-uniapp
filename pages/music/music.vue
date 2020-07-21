<template>
	<view>
		
		<uni-transition :modeClass="['fade','slide-right']" :duration="400" :style="{'width':'100%','position':'fixed'}" :show="!searching">
		<view class="searchbar">
			<text class="bartitle">Music</text>
			<text class="cuIcon-search searchbt" @click="searching=true"></text>
		</view>		
		</uni-transition>
		<uni-transition :modeClass="['fade','slide-right']" :duration="400" :style="{'width':'100%'}" :show="searching">
			<view class="searchbar">
				<text class="cuIcon-search searchbt-ing"></text>
				<input v-model="searchvalue" class="searchcontent" placeholder="请输入你要搜索的歌曲名/歌手" placeholder-style="color:rgba(0,0,0,0.4)" @confirm="searchmusic" />
				<button class="cu-btn cancle" @tap="searching=false">取消</button>
			</view>		
		</uni-transition>
		<view class="searchlist" v-if="searched">
			<view style="position: absolute;top: 24rpx;left: 20rpx;width: 100%;height: 58rpx;font-size: 48rpx;line-height: 58rpx;">
				<text >搜索结果</text>
			</view>
			
			<view style="overflow-y: scroll;width: 100%;position: relative;top: 90rpx;height: 974rpx;">
				<view v-for="(item,index) in searchdata" style="margin-top: 20rpx; display: flex; align-items: center;" :key="index">
					<image style="flex: 1;width: 108rpx;height:108rpx;border-radius: 120rpx;" :src="item['imgsrc']"></image>
					<view style="flex: 5;flex-direction: column; padding-left: 20rpx;" @tap="playmusic(item,true)">
						<text style="display: block; font-size: 44rpx;">{{item["musicname"]}}</text>
						<text style="font-size: 28rpx; padding-left: 15rpx;opacity: 0.8;">{{item["singername"]}}</text>
					</view>
					<text class="cuIcon-down" style="flex: 1;font-size: 50rpx;opacity: 0.8;" @tap="getdownload(item)"></text>
					
					
				</view>
			</view>
		</view>
		<view class="player" v-show="true">
			<image :class="isplaying?'music_img':'music_img_noanimation'" :src="src"></image>
			<text class="name_music">{{currentmusic}}</text>
			<text :class="isplaying?'cuIcon-stop playbt':'cuIcon-playfill playbt'" @tap="playorstop"></text>
			<text class="cuIcon-list listbt" @tap="display"></text>
		</view>
		
		
		<view class="mask" @tap="closelist" v-if="displaylist"></view>		
		 <uni-transition :modeClass="['fade','slide-bottom']" :duration="700"  :styles="playlist" :show="displaylist">

				<view class="title">
					<text>播放列表</text>
				</view>
				<view  class="scrolllist" >
					<view class="musicitem" v-for="(item,index) in musiclist" :key="index"  >
						<text @tap="playmusic(item,false)" class="cuIcon-sound" style="color:#e40c0c; font-size: 34rpx; margin-left: 10rpx;margin-right: 10rpx;"></text>
						<text @tap="playmusic(item,false)" class="item_name">{{item["musicname"]}}</text>
						<text @tap="deleteitem(item)" class="cuIcon-close delete"></text>
					</view>
				</view>

			</uni-transition>	
		
		<uni-transition :modeClass="['fade','slide-right']" :duration="700" :styles="{'width':'100%'}" :show="isdownload">
			<view style="position: fixed; top: 250rpx;border-radius: 50rpx; width: 604rpx; height: 660rpx; left: 74rpx; background-color:#000000 ;">
				<view style="display: flex;width: 100%; height: 80rpx; padding-left: 30rpx;">
					<text style="flex:15; font-size: 38rpx; color: #FFFFFF;line-height: 80rpx;">下载列表</text>
					<text @tap="isdownload=false" class="cuIcon-close" style="flex: 1;color: #FFFFFF;line-height: 80rpx; font-size: 38rpx;margin-right: 30rpx;margin-top:1rpx;"></text>
				</view>
				<view  v-for="(item,index) in downloadlist" :key="index" style="display: flex; height: 110rpx; width: 542rpx;margin-left: 32rpx;background-color:#e52424 ; border-radius: 12px;margin-top: 22rpx;">
					<view style="flex: 5;display: flex;flex-direction: column;">
						<text style="width:100%; font-size: 38rpx;color: #FFFFFF;opacity: 0.9; margin-top: 5rpx; margin-left: 10rpx;" >{{currentdownload}}</text>
						<text style="width:100%; font-size: 22rpx;color: #FFFFFF;opacity: 1; margin-top: 10rpx; margin-left: 20rpx;" >{{item["type"]}}</text>
					</view>
					
					<button @tap="startdownload(item['downloadurl'])" style="flex:1;width: 142rpx;height: 72rpx;margin-top: 16rpx;border-radius: 20rpx;margin-right: 24rpx;line-height: 76rpx;font-size: 26rpx;">下载</button>
				</view>
			</view>
		</uni-transition>
		
		<view style="position: fixed; height: 100vh; width: 100%; display: flex;justify-content: center; align-items: center;" v-if="isloading" >
		
			<view class="inloading">
				<text class="cuIcon-loading2" style=" font-size:70rpx; font-weight: bold; line-height: 70rpx; text-align: center;"></text>
			</view>
				<text style="position: fixed;top: 48vh; font-size:40rpx; font-weight: bold; line-height: 70rpx;">正在加载</text>
		</view>
		
	</view>
</template>

<script>
	import uniTransition from "@/components/uni-transition/uni-transition.vue"
	export default {
		name:'music',
		components:{uniTransition},
		data() {
			return {
				currentdownload:"",
				isloading:false,
				isdownload:false,
				downloadlist:[],
				searched:false,
				searchdata:[],
				searchvalue:"",
				searching:false,
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
					'bottom':'0',
					'width': '100%',
					'height': '50vh',
					'background-color': 'white',
					'border-radius': '36rpx',
					'border': '6rpx solid #222'
				},
				timer_update:null
			}
		},
		onLoad() {
			// uni.clearStorage()
			uni.getStorage({
				key:"musiclist",
				success: (res) => {
					this.musiclist=res.data
				},
				fail: () => {
					uni.request({
						url:"http://116.62.47.156/getmusiclist/",
						method:"GET",
						success: (res) => {
							this.musiclist=res.data['data']
						}
					})
				}
			})
			
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = false;
			this.innerAudioContext.src = this.currentmusic;
			this.innerAudioContext.volume = 1 
			var that = this;
			this.innerAudioContext.onEnded(function(){
				let item = that.musiclist[Math.floor(Math.random()*(that.musiclist.length))]
				that.innerAudioContext.src = item["src"]
				that.currentmusic = item["musicname"]
				that.playmusic(item,false,false)
			})
			
		},
		methods: {
			deleteitem(item){
				var index = this.musiclist.indexOf(item)
				var delete_item = this.musiclist.splice(index,1)
				uni.setStorageSync("musiclist",this.musiclist)
			},
			startdownload(url){
				console.log(url)
				window.location=url
			},
			getdownload(item){
				this.isloading=true
				uni.request({
					url: 'http://116.62.47.156/getdownload/',
					method: 'POST',
					data: {
						"songmid":item["songmid"],
						"strMediaMid":item["strMediaMid"],
						"type":item["type"]
					},
					success: res => {
	
						this.currentdownload = item["musicname"]
						this.downloadlist = res.data["data"]
						this.isdownload=true
						this.isloading=false
					},
					fail: () => {},
					complete: () => {}
				});
			},
			searchmusic(){
				if(this.searchvalue==""){
					return
				}
				this.isloading=true
				uni.request({
					url:"http://116.62.47.156/searchmusic?searchvalue="+this.searchvalue,
					success: (res) => {
						this.searchdata = res.data["data"]
						this.searched=true
						this.searchvalue=""
						this.isloading=false
					}
				})
			},
			async playmusic(item,issearch,isupdate=false){
				
				// item["src"]="http://116.62.47.156/static"
				// item["songmid"]=""
				if(item["imgsrc"]){
					this.src = item["imgsrc"]
				}
				else{
					this.src = "../../static/music_img.jpg"
				}
				this.innerAudioContext.src = item["src"]
				this.currentmusic = item["musicname"]
				await new Promise((resolve,reject)=>{
					this.innerAudioContext.stop()
					this.innerAudioContext.play()
					console.log(this.innerAudioContext.src)
					resolve("start play")
				}) 
				if(issearch){
					console.log(this.musiclist)
					var existindex=this.musiclist.findIndex((listitem)=>listitem["songmid"]===item["songmid"])
					console.log(existindex)
					if(existindex>-1){
						this.musiclist.splice(existindex,1)
					}
					this.musiclist.unshift(item)
				}
				else{
					if(!isupdate){
						this.timer_update=setTimeout(()=>{
							if(this.innerAudioContext.currentTime==0)
								this.playmusic(item,false,true)
							else
								clearTimeout(this.timer_update)
						},3000)
					}	
					// console.log(this.innerAudioContext.duration<0.5)
					// #ifdef APP-PLUS||H5
						if(isupdate){
							console.log("app music src update")
							var updateindex=this.musiclist.indexOf(item)
							await new Promise((resolve, reject) => {
								uni.request({
								method:"POST",
								url:"http://116.62.47.156/getdownload/",
								data:{
									"songmid":item["songmid"],
									"strMediaMid":item["strMediaMid"],
									"type":item["type"]
								},
								success: (res) => {
									if(res.data["data"][0]["downloadurl"]){
										item["src"] = res.data["data"][0]["downloadurl"]
										this.musiclist[updateindex]["src"] =  res.data["data"][0]["downloadurl"]
										console.log(item["src"])
										this.innerAudioContext.src = item["src"]
										this.currentmusic = item["musicname"]
										this.innerAudioContext.play()
									}
									else{
										console.log("can not to update")
									}
									uni.setStorageSync("musiclist",this.musiclist)
									resolve("ok")
								},
								complete: () => {
									console.log("update ok 0")
								},
								fail: () => {
									clearTimeout(this.timer_update)
								}
							})
							})
							console.log("update ok")
						}
						
					// #endif
				// 	// #ifdef H5
				// 	    var canplay = false
				// 	    uni.request({
				// 	    	url:this.innerAudioContext.src,
				// 	    	method:"GET",
				// 	    	success: (res) => {
				// 	    		canplay = true
				// 	    		console.log(res.data)
				// 	    	},
				// 	    	fail: () => {
				// 	    		canplay = false
				// 	    	},
				// 	    	complete: () => {
				// 	    		if(!canplay){
				// 	    			console.log(canplay)
				// 	    			var updateindex=this.musiclist.indexOf(item)
				// 	    			uni.request({
				// 	    				method:"POST",
				// 	    				url:"http://116.62.47.156/getdownload/",
				// 	    				data:{
				// 	    					"songmid":item["songmid"],
				// 	    					"strMediaMid":item["strMediaMid"],
				// 	    					"type":item["type"]
				// 	    				},
				// 	    				success: (res) => {
				// 	    					if(res.data["data"][0]["downloadurl"]){
				// 	    						item["src"] = res.data["data"][0]["downloadurl"]
				// 	    						this.musiclist[updateindex]["src"] =  res.data["data"][0]["downloadurl"]
				// 	    						console.log(item["src"])
				// 	    						this.innerAudioContext.src = item["src"]
				// 	    						this.currentmusic = item["musicname"]
				// 	    						this.innerAudioContext.play()
				// 	    					}
				// 	    					else{
				// 	    						console.log("can not to update")
				// 	    					}
				// 	    				}
				// 	    			})
				// 	    		}
				// 	    		uni.setStorageSync("musiclist",this.musiclist)
				// 	    	}
				// 	    })
					    
				// 	// #endif
				
					
				}
				
				
				this.displaylist=false
				this.isplaying=true
				uni.setStorageSync("musiclist",this.musiclist)
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
					setTimeout(()=>{
						if(this.innerAudioContext.currentTime==0)
							this.playmusic(item,false,true)
					},2000)
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
	@keyframes xuanzhuan{
		0%{ transform: rotate(0deg);}
		100%{ transform: rotate(360deg);}
	}
	.inloading{
		flex:1;
		margin-bottom: 21vh;
		text-align: center;
		width: 100%;
		height: 70rpx;
		animation: spin 2s linear infinite;
	}
	.searchlist{
		position: absolute;
		top: 100rpx;
		width: 100%;
		height: 1098rpx;
	}
	.cancle{
		position: absolute;
		top: 25rpx;
		left: 610rpx;
		width: 125rpx;
		  height: 56rpx;
		  overflow: visible;
		  background-color: rgba(255, 255, 255, 0.76);
		  border-radius: 78rpx;
	}
	.searchcontent{
		width: 440rpx;
		 height: 38rpx;
		 overflow: visible;
		 font-family: "Inter", sans-serif;
		 color: #000000;
		 font-size: 16px;
		 position: absolute;
		top: 29rpx;
		left: 120rpx;
		line-height: 64rpx;
		font-size: 32rpx;
		color: rgba(0,0,0,0.8);
	}
	.searchbt-ing{
		width: 64rpx;
		height: 64rpx;
		position: absolute;
		top: 20rpx;
		bottom: 20rpx;
		right: 26rpx;
		left: 30rpx;
		line-height: 64rpx;
		font-size: 50rpx;
		color: rgba(0,0,0,0.3);
	}
	.searchbt{
		width: 64rpx;
		height: 64rpx;
		position: absolute;
		top: 20rpx;
		bottom: 20rpx;
		right: 30rpx;
		left: 660rpx;
		line-height: 64rpx;
		font-size: 50rpx;
		color: rgba(0,0,0,0.3);
	}
	.bartitle{
		  position: absolute;
		  top:12rpx;
		  bottom: 14rpx;
		  left: 306rpx;
		  right: 296rpx;
		  width: 148rpx;
		  height: 70rpx;
		  overflow: visible;
		  font-family: "undefined", serif;
		  color: #ffffff;
		  font-size: 58rpx;
		  letter-spacing: NaNpx;
		  line-height: 1.2;
	}
	.searchbar{
		width: 100%;
		height: 100rpx;
		background-color: #f01919;

	} 
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
		  position: fixed;
		  width: 750rpx;
		  height: 50vh;
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
		bottom: 0rpx;
		width: 100%;
	    height: 50vh;
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
