<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav ref="leftnav"></leftNav>
		</view>
		<view class="rightarea">
			<topNav :title="title"></topNav>
			<scroll-view class="scrollview" style="margin-top: 30px;">
				<uni-forms-item name="pseat" label="席位">
					<view>
						<picker @change="pseatchange" :value="index" :range="pseats" range-key="PR_Name">
							<view class="uni-input">{{pseats[index].PR_Name}}</view>
						</picker>
					</view>
				</uni-forms-item>
				<uni-forms-item name="save">
					<button @click="save">保存</button>
				</uni-forms-item>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	let dataer = require("@/common/datas.js");
	let testdata = require("@/common/testData.js");
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	export default {
		components: {
			leftNav,
			topNav
		},
		data() {
			let _that = this;

			let Ur_Data = dataer.Ur_Data;
			let Ur_ID = Ur_Data['Ur_ID'];
			let Ur_H = Ur_Data['Ur_H'];
			let prs = dataer.dataContext.prs;
			let p_id = dataer.currentContext.p_id;
			let prss_temp = []; // prs[p_id];
			for (var i = 0; i < prs[p_id].length; i++) {
				let pr_item = prs[p_id][i];
				if (!pr_item['Ur_ID']) {
					prss_temp.push(pr_item);
				}
			}

			prss_temp.splice(0, 0, {
				PR_ID: -1,
				PR_Name: "请选择"
			});

			return {
				pseats: prss_temp,
				title: "申请席位",
				index: 0
			}
		},
		onReady: () => {

		},
		onLoad: () => {},
		methods: {
			pseatchange: function(e) {
				this.index = e.detail.value;
			},
			save: function() {
				let ur_ID = dataer.Ur_Data['Ur_ID'];
				let pr_ID = this.pseats[this.index]["PR_ID"];
				let hr_ID = this.pseats[this.index]["HR_ID"];
				let prs = dataer.dataContext.prs[dataer.currentContext.p_id];
				if (prs && prs.length > 0) {
					let cur_pr = prs.find((item) => {
						if (item['Ur_ID'] == ur_ID) {
							return item;
						}
					})
					if (cur_pr) {
						//ForTest
						dataer.currentContext.pr_id = pr_ID;
						dataer.currentContext.hr_id = hr_ID;
						this.iniEquipment();
						uni.showToast({
							title: "已申请席位"
						})
						return;
					}
				}
				let _that = this;
				let paramdata = {
					PR_ID: pr_ID,
					Ur_ID: ur_ID,
					HR_ID: hr_ID,
				}
				let successFunc = function(ret) {
					if (ret && ret['status'] == 0) {
						dataer.currentContext.hr_id = hr_ID;
					}
				}
				dataer.applySeat(paramdata, successFunc);
			},
			iniEquipment: function() {
				let hr_id = dataer.currentContext.hr_id;
				let paramdata = {
					HR_ID: hr_id
				}
				let successFunc = function(ret) {
					if (ret && ret["status"] == 0) {
						let data = ret['data'];
						dataer.dataContext.equipments[hr_id] = data;
					}
				}
				dataer.getSupplycate(paramdata, successFunc);
			}
		}
	}
</script>

<style>
	@import '@/common/uni-nvue.css';

	.uni-forms-item__label {
		width: 120px !important;
	}

	.uni-forms-item__label .label-text {
		width: 100px;
	}
</style>
