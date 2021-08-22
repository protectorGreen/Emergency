<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav ref="leftnav"></leftNav>
		</view>
		<view class="rightarea">
			<topNav :title="title"></topNav>
			<map id="map1" ref="mapref" style="width:100%;height: 100%"></map>
			<button @click="test1">test1</button>
			<button @click="test2">test2</button>
			<button @click="test3">test3</button>
			<button @click="test4">test4</button>
			<button @click="test5">test5</button>
			<button @click="test6">test6</button>
		</view>
	</view>
</template>

<script>
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	var mapObject;
	export default {

		components: {
			leftNav,
			topNav
		},
		data() {
			return {
				title: "推演"
			}
		},
		mounted: () => {
			mapObject = uni.createMapContext('map1', this);
		},
		methods: {
			test1: function() {
				//alert(mapObject);
				mapObject.getCenterLocation({
					complete: function(res) {
						debugger
					}
				})
			},
			test2: function() {
				// #ifdef APP-PLUS
				var appid = plus.runtime.appid;
				console.log('应用的 appid 为：' + appid);
				// #endif
			},
			test3: function() {},
			test4: function() {},
			test5: function() {},
			test6: function() {}
		}
	}
</script>

<style>

</style>
