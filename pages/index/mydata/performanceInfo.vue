<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav ref="leftnav"></leftNav>
		</view>
		<view class="rightarea">
			<top-nav :title="title"></top-nav>
			<scroll-view class="rightscroll">
				<view>推演状态</view>
				<view>推演简介</view>
				<view>推演席位</view>
				<view>推演浏览</view>
				<view>推演流程</view>
				<view>进入推演<switch @change="startdeduction"></switch>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	let dataer = require("@/common/datas.js");
	export default {
		components: {
			leftNav,
			topNav
		},
		data() {
			let h_id = dataer.currentContext.h_id;
			let p_id = dataer.currentContext.p_id;
			let ep_id = dataer.currentContext.ep_id;
			let cur_p = null;
			let ur_data = dataer.Ur_Data;
			if (ur_data) {
				let uhs = ur_data['Ur_H'];
				for (var i = 0; i < uhs.length; i++) {
					let uh = uhs[i];
					if (uh['H_ID'] == h_id) {
						let eps = uh['EPS'];
						for (let j = 0; j < eps.length; j++) {
							let ep = eps[j];
							if (ep["EP_ID"] == ep_id) {
								let ps = ep['EP_Performances'];
								for (let k = 0; k < ps.length; k++) {
									let pitem = ps[k];
									if (pitem['P_ID'] == p_id) {
										cur_p = pitem;
									}
								}
							}
						}
					}
				}

				if (cur_p) {

				}

			}
			return {
				title: "推演信息",
				/*
				curinfos: [{
						key: "status",
						name: "推演状态"
					}, {
						key: "status",
						name: "推演简介"
					},
					{
						key: "status",
						name: "推演席位"
					},
					{
						key: "status",
						name: "推演浏览"
					},
					{
						key: "status",
						name: "推演流程"
					},
					{
						key: "status",
						name: "进入推演"
					},
				]
				*/
			}
		},
		onLoad: (options) => {

		},
		methods: {
			startdeduction: function() {
				let bopen = arguments[0]['target']['value'];
				dataer.currentContext.bdeduction = bopen;
				let $leftNav = this.$refs.leftnav;
				$leftNav.changeDeductionStatus(!bopen);
			}
		}
	}
</script>

<style>

</style>
