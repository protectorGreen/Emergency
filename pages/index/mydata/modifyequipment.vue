<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav ref="leftnav"></leftNav>
		</view>
		<view class="rightarea">
			<!-- <topNav :title="title" @save="save"></topNav> -->
			<topNav :title="title" ></topNav>
			<button @click="addNewEquip">新增</button>
			<scroll-view>
				<view v-for="(item,index) in equips">
					<view class="equips" :id="item.SC_ID">
						<view>{{item.SC_Name}}</view>
						<view style="width: 100px;">
							<uni-easyinput :value="item.SR_Num"></uni-easyinput>
						</view>
						<view>{{item.SC_Unit}},</view>
						<view>位置：</view>
						<view style="width: 400px;">
							<uni-easyinput :value="item.SR_Location"></uni-easyinput>
						</view>
						<button @click="openmap(item)">地图</button>
					</view>
				</view>

			</scroll-view>

			<view>
				<uni-popup
					style="width: 500px;height:500px;display: flex;flex-direction: column;justify-content: space-between;"
					type="dialog" ref="addEquip" background-color="#fff">
					<view class="emergency-popup-header">新增装备物资</view>
					<scroll-view style="width: 500px;height: 300px; padding: 20px;overflow-y: scroll;">
						<uni-forms :value="newEquip" v-model="newEquip">
							<uni-forms-item name="newEquipNme" required label="装备名称">
								<uni-easyinput v-model="newEquip.newEquipNme" placeholder="请输入装备名称"></uni-easyinput>
							</uni-forms-item>
							<uni-forms-item name="newEquipNum" label="装备数量">
								<uni-easyinput v-model="newEquip.newEquipNum" placeholder="请输入装备数量"></uni-easyinput>
							</uni-forms-item>
							<uni-forms-item name="newEquipUnit" label="装备单位">
								<uni-easyinput v-model="newEquip.newEquipUnit" placeholder="请输入装备单位"></uni-easyinput>
							</uni-forms-item>
							<uni-forms-item name="newEquipLocation" label="位置">
								<uni-easyinput disabled="" v-model="newEquip.newEquipLocation" placeholder="请选择位置">
								</uni-easyinput>
								<button @click="openNewMap">位置</button>
							</uni-forms-item>
						</uni-forms>
					</scroll-view>
					<view class="emergency-popup-bottom">
						<text class="uni-tip-button popup-btn" @click="cancelNew">取消</text>
						<text class="uni-tip-button popup-btn" @click="okNew">确定</text>
					</view>

				</uni-popup>
			</view>

		</view>
	</view>
</template>

<script>
	let dataer = require("@/common/datas.js");
	export default {
		data() {
			let hr_id = dataer.currentContext.hr_id;
			//let equipments = dataer.dataContext.equipments[hr_id];
			let equipments = [{
				HR_ID: 1,
				SC_ID: 1,
				SC_Name: "装备1",
				SC_Unit: "个",
				SR_ID: 1,
				SR_Lat: "",
				SR_Location: "地址1",
				SR_Lot: "",
				SR_Num: 200
			}, {
				HR_ID: 2,
				SC_ID: 2,
				SC_Name: "装备2",
				SC_Unit: "辆",
				SR_ID: 2,
				SR_Lat: "",
				SR_Location: "地址2",
				SR_Lot: "",
				SR_Num: 100
			}];

			return {
				newEquip: {
					newEquipNme: "newEquip",
					newEquipNum: "",
					newEquipUnit: "unit",
					newEquipLocation: "",
					newLat: "",
					newLot: ""
				},
				equips: equipments || [],
				title: "编辑装备物资"
			}
		},
		methods: {
			okNew: function() {
				var newEquip = {
					HR_ID: null,
					SC_ID: null,
					SC_Name: this.newEquip["newEquipNme"],
					SC_Unit: this.newEquip["newEquipUnit"],
					SR_ID: null,
					SR_Lat: this.newEquip["newLat"],
					SR_Lot: this.newEquip["newLot"],
					SR_Location: this.newEquip["newEquipLocation"],
					SR_Num: this.newEquip["newEquipNum"]
				};
				this.equips.push(newEquip);
				for (var attr in this.newEquip) {
					this.newEquip[attr] = null;
				}
				this.$refs.addEquip.close();
				debugger
			},
			cancelNew: function() {
				this.$refs.addEquip.close();
			},
			openNewMap: function() {
				var _that = this;
				var successRet = function(res) {
					_that.newEquip['newEquipLocation'] = res.address;
					_that.newEquip['newLat'] = res.latitude;
					_that.newEquip['newLot'] = res.longitude;
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
				}
				uni.chooseLocation({
					success: successRet
				});
			},
			addNewEquip: function() {
				this.$refs.addEquip.open("center");
			},
			openmap: function(item) {
				var _that = this;
				var SR_ID = item['SR_ID'];
				var successRet = function(res) {
					for (var i = 0; i < _that.equips.length; i++) {
						if (_that.equips[i]['SR_ID'] == SR_ID) {
							_that.equips[i]['SR_Location'] = res.address;
							_that.equips[i]['SR_Lat'] = res.latitude;
							_that.equips[i]['SR_Lot'] = res.longitude;
						}
					}
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
				}
				uni.chooseLocation({
					success: successRet
				});
			},

			save: function() {
				var _that = this;
				let equips = this.equips;
				let paramData = {
					Ur_ID: dataer.Ur_Data['Ur_ID'],
					equips: equips
				}
				let successFunc = function(ret) {
					if (ret && ret['status'] == 0) {
						let data = ret['data'];
						let hr_id = dataer.currentContext.hr_id;
						dataer.dataContext.equipments[hr_id] = data;
						_that.$forceUpdate();
					}
				}
				dataer.saveSupplycate(paramData, successFunc);
			}
		}
	}
</script>

<style>
	.equips {
		display: flex;
		flex-direction: row;
		line-height: 50px;
	}
</style>
