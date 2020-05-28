<template>
	
	<view class="content">		
		<cu-custom bgColor="bg-gradual-blue" v-if="PageCur=='chat'?false:true">
		    <block slot="content">Cure-H</block>
		</cu-custom>
		<pet v-if="PageCur=='pet'"></pet>
		<friends v-if="PageCur=='chat'"></friends>
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
				PageCur: 'home'
			}
		},
		onLoad() {
			const username = uni.getStorageSync("emailaddress")
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
				NavChange: function(e) {
					this.PageCur = e.currentTarget.dataset.cur
				}
		}
	}
</script>

<style>

</style>
