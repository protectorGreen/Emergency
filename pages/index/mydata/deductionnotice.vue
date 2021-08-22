<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav></leftNav>
		</view>
		<view class="rightarea">
			<topNav :title="title"></topNav>
			<scroll-view class="scrollview">
				<view v-for="(item,index) in notices">
					<view :id="item.key">
						<view>{{item.date}}</view>
						<view>{{item.msgs}}</view>
					</view>
				</view>
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
				notices: [{
						"key": "1",
						"msgs": "xx推演将于xx年xx月xx日开始",
						"date": "2021.07.15"
					},
					{
						"key": "2",
						"msgs": "xx推演将于xx年xx月xx日开始",
						"date": "2021.07.15"
					},
					{
						"key": "3",
						"msgs": "xx推演将于xx年xx月xx日开始",
						"date": "2021.07.15"
					},
					{
						"key": "4",
						"msgs": "xx推演将于xx年xx月xx日开始",
						"date": "2021.07.15"
					},
					{
						"key": "5",
						"msgs": "xx推演将于xx年xx月xx日开始",
						"date": "2021.07.15"
					}
				],
				title: "推演通知"
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
