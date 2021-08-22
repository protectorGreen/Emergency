<template>
	<view class="indexPage">
		<view style="width: 350px;">
			<leftNav></leftNav>
		</view>
		<view class="rightarea">
			<scroll-view class="rightscroll">
				<topNav :title="title"></topNav>
				appinfo信息
				<button @click="testPdf">PDF</button>
				<button @click="testChat">Chat</button>
				<button @click="testMap">Map</button>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	export default {
		components: {
			leftNav,
			topNav
		},
		data() {
			return {
				title: "应用信息"
			}
		},
		methods: {
			testPdf: function() {
				uni.navigateTo({
					url: "pdfview"
				})
			},
			testChat: function() {
				uni.navigateTo({
					url: "imchat"
				})
			},
			testMap: function() {
				uni.navigateTo({
					url: "testmap"
				})
			}
		}
	}
</script>

<style>

</style>
