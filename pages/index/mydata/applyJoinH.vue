<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav ref="leftnav"></leftNav>
		</view>
		<view class="rightarea">
			<topNav :title="title"></topNav>
			<scroll-view class="scrollview" style="margin-top: 30px;">
				<uni-forms-item name="hqType" label="指挥部类型">
					<view>
						<picker @change="hqTypeChange" :value="index" :range="hqTypes" range-key="HT_Type">
							<view class="uni-input">{{hqTypes[index].HT_Type}}</view>
						</picker>
					</view>
				</uni-forms-item>
				<uni-forms-item name="hqArea" label="区域">
					<picker mode="multiSelector" @columnchange="bindAreaChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">
							{{multiArray[0][multiIndex[0]]}},{{multiArray[1][multiIndex[1]]}},{{multiArray[2][multiIndex[2]]}},{{multiArray[3][multiIndex[3]]}}
						</view>
					</picker>
				</uni-forms-item>
				<uni-forms-item name="hq" label="指挥部">
					<picker @change="selectHeadQuanters" :value="headquanterIndex" range-key="H_Name"
						:range="headquanters">
						<view class="uni-input">{{headquanters[headquanterIndex].H_Name}}</view>
					</picker>

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
	let area = require("@/common/regions1.min.js");
	let testdata = require("@/common/testData.js");
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	export default {
		components: {
			leftNav,
			topNav
		},
		data() {
			// getHeadquanterByUser
			let _that = this;
			let Ur_ID = dataer.Ur_Data['Ur_ID'];
			let paramdata = null;
			// {
			// 	Ur_ID: Ur_ID
			// };
			dataer.getHeadquanterByUser(paramdata, (ret) => {
				if (ret && ret['status'] == 0) {
					let jsondata = ret['data'];
					if (jsondata) {
						var data;
						if (typeof(jsondata) == 'object') {
							data = jsondata;
						} else {
							data = JSON.parse(jsondata);
						}
						//let data = JSON.parse(jsondata);
						dataer.Ur_H = data;
						//_that.headQuarters = data;
					}
				}
			}, (ret) => {

			});

			let level0 = area.levelArray0;
			let level1 = area.levelArray1[0]; //area['level1']["110000000"]	;//area['level1'][level0[0]['v']];
			let level2 = area.levelArray2[0][0]; //area['level2'][level1[0]['v']];
			let level3 = area.levelArray3[0][0][0]; //area['level3'][level2[0]['v']];			
			console.log(dataer.headquantersArray);
			console.log(testdata.testdata['hqtype']);
			console.log(testdata.hqtype1);
			console.log(testdata.hqtype);

			// let getHtTypeUrl = dataer.envconfig.host + "/v1/Tem/QueryHeadquarterType";
			// //var _that = this;
			// uni.request({
			// 	url: getHtTypeUrl,
			// 	//url: "http://10.6.193.52/app/mm.php/MM/Member/getRegion",
			// 	success: (ret) => {
			// 		if (ret && ret["statusCode"] == 200) {
			// 			console.log(ret);
			// 			console.log("testRequest");
			// 			console.log(_that);
			// 			dataer.HT_Data = [{
			// 				HT_ID: 1,
			// 				HT_Type: "test1"
			// 			}];
			// 			_that.hqTypes = [{
			// 				HT_ID: 1,
			// 				HT_Type: "test1"
			// 			}];
			// 		}
			// 	}
			// })
			return {
				//headQuarters: [],
				headquanters: [{
					H_ID: -1,
					H_Name: "请选择"
				}],
				headquanterIndex: 0,
				hqTypes: testdata.testdata.hqtype,
				index: 0,
				multiIndex: [0, 0, 0, 0],
				multiArray: [level0, level1, level2, level3],
				title: "加入指挥部"
			}
		},
		onReady: () => {

		},
		onLoad: () => {
			//this.hqTypes = dataer.HT_Data;
		},
		methods: {
			hqTypeChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value);
				this.index = e.detail.value;
				this.getHT();
			},

			getRegionArea: function(area) {
				let copyArea = area;
				copyArea.splice(0, 0, "请选择");
				return copyArea;
			},
			bindAreaChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value);
				this.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0: //拖动第1列
						this.multiArray[1] = area.levelArray1[this.multiIndex[
							0]]; //this.getRegionArea(area.levelArray1[this.multiIndex[0]]);
						this.multiArray[2] = area.levelArray2[this.multiIndex[0]][
							0
						]; //this.getRegionArea(area.levelArray2[this.multiIndex[0]][0]);
						this.multiArray[3] = area.levelArray3[this.multiIndex[0]][0][
							0
						]; //this.getRegionArea(area.levelArray3[this.multiIndex[0]][0][0]);
						this.multiIndex = [e.detail.value, 0, 0, 0];
						break
					case 1: //拖动第2列
						this.multiArray[2] = area.levelArray2[this.multiIndex[0]][this.multiIndex[1]];
						this.multiArray[3] = area.levelArray3[this.multiIndex[0]][this.multiIndex[1]][0];
						this.multiIndex.splice(2, 2, 0, 0);
						break
					case 2:
						this.multiArray[3] = area.levelArray3[this.multiIndex[0]][this.multiIndex[1]][this.multiIndex[
							2]];
						this.multiIndex.splice(3, 1, 0);
						break;
				}
				this.getHT();
				this.$forceUpdate()
			},
			getHT: function() {
				var HT_ID = testdata.testdata['hqtype'][this.index]['HT_ID'];
				var AR_CODE = area.levelKeys3[this.multiIndex[0]][this.multiIndex[1]]
					[this.multiIndex[2]][this.multiIndex[3]];
				var data = {
					HT_ID: HT_ID,
					AR_CODE: AR_CODE
				}
				let _that = this;
				let successFunc = function(ret) {
					if (ret && ret['status'] == 0) {
						var datas = ret['data'];
						//_that.
						var _headquanters = [];
						for (var i = 0; i < datas.length; i++) {
							let dataItem = datas[i];

							//_headquanters.push(dataItem[''])
						}
						_that.headquanters = datas;
					}
				}
				let failFunc = function(ret) {

				}
				dataer.getHT(data, successFunc, failFunc);
			},
			save: function() {

				// {
				//   "uH_ID": 0,
				//   "ur_ID": 1,
				//   "h_ID": 1,
				//   "isDel": 0,
				//   "remark": "备注1"
				// }

				let h_ID = this.headquanters[this.headquanterIndex]['H_ID'];
				let ur_ID = dataer.Ur_Data['Ur_ID'];
				let _that = this;
				let paramdata = {
					uH_ID: 0,
					ur_ID: ur_ID,
					h_ID: h_ID,
					isDel: 0,
				}
				let successFunc = (ret) => {
					if (ret && ret['status'] == 0) {
						let datas = ret['data'];
						if (datas && datas.length > 0) {
							//_that.$refs.leftnav.
							datas = [{
								H_ID: "1",
								"H_Name": "TEST"
							}]
							_that.$refs.leftnav.updateHeadQuanters(datas);
						}
					}
				}
				dataer.joinH(paramdata, successFunc);
			},
			selectHeadQuanters: function(e) {
				this.headquanterIndex = e.detail.value;
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
