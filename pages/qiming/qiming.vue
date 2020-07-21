<template>
	<view>
	<view>
		<view class="title">
			<text class="cuIcon-back" style="margin-left: 20rpx;font-size: 1rem;" @tap="back"></text>
		</view>
		<view style="position: absolute;top:1vh;left: 32%;color: white;font-size: 1rem;">
			无聊的起名工具
		</view>
	</view>
		<view class="main">
			<view style="display: flex;">
				<text style="font-size: 1rem;">姓氏：</text>
				<input @confirm="getname" :placeholder-class="placeholderstyle" v-model="lastname" style="width: 270rpx; text-align: center; font-size: 1rem;border-bottom: 4rpx solid #000000;box-sizing: border-box;" placeholder="请输入你的姓氏"/>
			</view>
			<button @tap="getname" class="cu-btn round bg-gradual-purple shadow" style="font-size: 1rem;width: 200rpx; margin-top: 10rpx;">生成</button>
		</view>
		<uni-transition :modeClass="['fade','slide-right']" :duration="200" :styles="{'width':'100%'}" :show="created">
			<view class="result" style="font-size: 1.5rem;text-align: center;margin-top: 5vh;">
				参考姓名：<text style="color: #4ac6ff;">{{name}}</text>
			</view>	
		</uni-transition>
	</view>
</template>

<script>
	import uniTransition from "@/components/uni-transition/uni-transition.vue"
	export default {
		components:{uniTransition},
		data() {
			return {
				lastname:"",
				name:"",
				created:false,
				placeholderstyle:"",
			};
		},
		methods:{
			back(){
				uni.navigateBack({
					
				})
			},
			getname(){
				this.created = false
				uni.request({
					url:"http://116.62.47.156:8000/getname",
					method:"POST",
					data:{
						"lastname":this.lastname
					},
					success: (res) => {
						if(res.data=="error"){
							this.placeholderstyle="placeholder"
						}
						else if(res.data==null){
							this.created = true
							this.name = "无"
						}
						else{
							var index = Math.floor(Math.random()*res.data.length)	
								this.name = res.data[index]["studentname"]
								this.created = true
							this.placeholderstyle = ""
						}
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
.placeholder
	color red
.title
	background-color #39B54A;
	color white
	height 5vh
	font-size 1rem
	line-height 5vh
.main
	display flex
	justify-content: space-around;
	margin-top 30vh
	flex-direction column
	align-items center
	height 20vh



</style>
