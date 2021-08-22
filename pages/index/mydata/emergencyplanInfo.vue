<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav></leftNav>
		</view>
		<view class="rightarea">
			<topNav :title="title"></topNav>
			<view class="scrollview">
				<scroll-view style="display: flex; justify-content: space-around;">
					XXXXX预案内容
				</scroll-view>
			</view>
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
				title: "预案信息"
			}
		},
		onLoad: function(options) {
			// var _that = this;
			// uni.setNavigationBarTitle({
			// 	_that.title: 'xxxxx预案'
			// });
			let title = options['title'];
			if (title) {
				this.title = title;
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
