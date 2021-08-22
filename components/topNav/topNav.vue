<template>
	<view style="height: 50px; display:flex;flex-direction: row;width: 100%;background-color: rgb(248, 248, 248);">
		<view @click="backTo" class="icon-item">
			<uni-icons :type="icontype" :color="'#8f8f94'" size="25" />
		</view>
		<view style="width:85%">
			<div style="text-align: center;line-height: 50px;">{{title}}</div>
		</view>
		<view>
			<button @click="save">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "topNav",
		props: {
			title: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				icontype: "arrowleft"
			};
		},
		methods: {
			backTo: function() {
				uni.navigateBack({

				})
			},
			save: function() {
				this.$emit("save");
			}
		}
	}
</script>

<style>
	@import '@/common/uni-nvue.css';

	.icon-item {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		width: 180rpx;
		/* padding: 30rpx 10rpx; */
		text-align: center;
		flex-direction: column;
	}
</style>
