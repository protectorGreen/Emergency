<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav></leftNav>
		</view>
		<view class="rightarea">
			<!-- <button @click="test1()">test</button> -->
			<topNav :title="title"></topNav>
			<scroll-view class="rightscroll">

				<easyChat v-on:test="test" ref="chat" :testList="testlist"></easyChat>
				<!-- <signalr ref="signalr1"></signalr> -->
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import easyChat from '@/components/xiaowentao-easyChat/xiaowentao-easyChat.vue';
	import signalr from '@/components/signalr/signalr.vue';
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	export default {
		components: {
			leftNav,
			topNav
		},
		data() {
			return {
				title: 'TESTCHAT',
				testlist: [{
						speaker: 'Self',
						contentType: 'text',
						text: '@/static/logo.png',
						createTime: 1616850256639,
						isUndo: false,
						isDelete: false
					},
					{
						speaker: 'Others',
						contentType: 'text',
						text: '../../static/other.jpg',
						createTime: 1616847101568,
						isUndo: false,
						isDelete: false
					},
					{
						speaker: 'Self',
						contentType: 'image',
						imageSrc: '../../static/self.jpg',
						createTime: 1616847115176,
						isUndo: false,
						isDelete: false
					},
					{
						speaker: 'Self',
						contentType: 'text',
						text: '../../static/self.jpg',
						createTime: 1616847115176,
						isUndo: false,
						isDelete: false
					},
				]
			}
		},
		onLoad() {
			// this.$refs.easyChat.$on('test', function() {
			// 	uni.showToast({
			// 		title: "testabc"
			// 	})
			// })
		},
		components: {
			easyChat,
			signalr
		},
		methods: {
			test: function() {
				// this.$refs.easyChat.$on('test', function() {
				// 	uni.showToast({
				// 		title: "testabc"
				// 	})
				// })
				uni.navigateTo({
					url: "sendofficialdoc"
				})
				return;
				uni.showToast({
					title: "testChat"
				})
			},
			test1: function() {

				this.$refs.signalr1.testChat();
			}
		}
	}
</script>

<style>

</style>
