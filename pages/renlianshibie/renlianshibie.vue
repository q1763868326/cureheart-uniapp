<template>
	<view>
		<image :src="snapshotpicture" mode="aspectFit" style="width: 100%;height: 50vh;"></image>
		<text>{{snapshotpicture}}</text>
		<button @tap="captureImage">开始拍照</button>
		<button @tap="upload">上传</button>
	</view>
</template>

<script>
	import "./socket.io.js"
	export default {
	        data(){
				return{
				snapshotpicture:"../../static/logo.png"
	        }
			},
			onLoad() {
				console.log(io('http://127.0.0.1:8000'))
			};
			methods:{
				onReady(){
				
					document.addEventListener( "plusready", onPlusReady, false );
				},
				onPlusReady() {
					console.log("plusready");
				},
				captureImage(){
					console.log(io('http://127.0.0.1:8000'))
					var cmr = plus.camera.getCamera();
					console.log(cmr.supportedImageResolutions)
					console.log(cmr.supportedImageFormats)
					var res = cmr.supportedImageResolutions[7];
					var fmt = cmr.supportedImageFormats[0];
					console.log("Resolution: "+res+", Format: "+fmt);
					cmr.captureImage( path=>{
							console.log( "Capture image success: " + path );  
							this.snapshotpicture = path
						},
						function( error ) {
							console.log( "Capture image failed: " + error.message );
						},
						{resolution:res,format:fmt}
					);
				},
				upload(){
					console.log("upload")
					uni.uploadFile({
						url:"https://127.0.0.1:8000/upload/",
						files:[{"url":this.snapshotpicture}],
						success:res=>{
							console.log(res)
						},
						failed:e=>{
							console.log(e)
						},
					}
					)
				}
				
				
			}
	    }
</script>

<style>

</style>
