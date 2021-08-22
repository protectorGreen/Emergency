<template>
	<view class="content">
		<view class="content left-content col-content">
			<view style="display: flex;" class="top-content col-content col-center">
				<uni-label v-show="showPhone">手机号:{{phoneNo}}</uni-label>
				<uni-label v-show="showUser">用户:{{userName}}</uni-label>
			</view>
			<view class="center-content">
				<text>{{counter}}</text>
			</view>
			<view @click="counter +=1" class="bottom-content" style="background-color: #f7f7f7;">
				<uni-button @click="testGo">指挥部1111</uni-button>
				<uni-button @click="counter +=1">推演</uni-button>
				<uni-button @click="counter +=1">消息</uni-button>
				<uni-button @click="">我</uni-button>
				<!-- <view>指挥部</view>
				<view>推演</view>
				<view>消息</view>
				<view>我</view> -->
			</view>
		</view>
		<!-- <view class="right-content">
			rightContent
		</view> -->
	</view>

</template>

<script>
	var dataer = require("./../../common/datas.js");
	export default {
		data() {
			console.log("index setData()");
			return {
				showPhone: true,
				phoneNo: "12111113",
				showUser: true,
				userName: "testUser",
				counter: 0,
			}
		},
		onInit() {
			//console.log(dataer);
			//console.log("index onINit");
		},
		onLoad() {
			let member = dataer.getMember();
			//member = null;
			if (!member) {
				uni.navigateTo({
					url: "../login/login"
				})
			}
		},
		methods: {
			testGo: function() {
				// uni.showModal({
				// 	content:"testabc"
				// })
				uni.reLaunch({
					url: "./mydata/mydata"
				})
			}
		}
	}
</script>

<style>
	uni-button {
		background-color: transparent;
		position: unset;
	}
</style>
