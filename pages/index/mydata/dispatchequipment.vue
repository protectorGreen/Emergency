<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav ref="leftnav"></leftNav>
		</view>
		<view class="rightarea">
			<topNav :title="title"></topNav>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "调遣装备",
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
