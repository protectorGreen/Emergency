<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav></leftNav>
		</view>
		<view class="rightarea">
			<topNav :title="title"></topNav>
			<scroll-view style="height: 100%;overflow: scroll;">
				<scroll-view v-for="(item,index) in eps"
					style="display: flex;flex-direction: column; justify-content: space-around;">
					<view style="margin-left: 20px;line-height: 40px;display:flex;" :id="item.EP_ID">
						<view>{{item.EP_Name}}</view>
						<view>></view>
					</view>
					<view v-for="(itemp,index1) in item.EP_Performances">
						<view @click="gotoPerformance(itemp)" style="margin-left:50px;line-height: 40px;"
							:id="itemp.P_ID">
							{{itemp.P_Name}}
						</view>
					</view>
				</scroll-view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	var dataer = require("@/common/datas.js");
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	export default {
		comments: {
			leftNav,
			topNav
		},
		data() {
			return {
				eps: [],
				title: "指挥部信息"
			}
		},
		onLoad: function(option) {
			let h_id = option['hid'];
			let h_name;
			dataer.currentContext.h_id = h_id;
			let currentH = dataer.Ur_H.find(function(item) {
				if (item['H_ID'] == h_id) {
					return item;
				}
			})
			if (currentH) {
				this.eps = currentH['EPS'];
				h_name = currentH['H_Name'];
			}
			this.title = h_name;
			// uni.setNavigationBarTitle({
			// 	title: h_name
			// });
		},
		methods: {
			gotoPerformance: function(performance) {
				//debugger;
				var P_ID = performance['P_ID'];
				var EP_ID = performance['EP_ID'];

				dataer.currentContext.p_id = P_ID;
				dataer.currentContext.ep_id = EP_ID;

				var prs = dataer.dataContext['prs'][P_ID];
				if (!prs) {
					let param = {
						P_ID: P_ID,
					}
					dataer.getPerformanceRole(param, (ret) => {
						if (ret && ret["status"] == 0) {
							dataer.dataContext['prs'][P_ID] = ret['data'];
							uni.navigateTo({
								url: "performanceInfo?pr=" + JSON.stringify(ret['data']),
							})
						}
					}, (failret) => {

					})
				} else {
					uni.navigateTo({
						url: "performanceInfo?pr=" + JSON.stringify(prs),
					})
				}
			}
		}
	}
</script>

<style>

</style>
