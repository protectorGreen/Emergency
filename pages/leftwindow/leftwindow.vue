<template>
	<view class="leftwindow-content">
		<view class="leftwindow-content window-col-content">
			<view style="display: flex;" class="window-top-content window-col-content window-col-center">
				<uni-label v-show="showPhone">手机号:{{phoneNo}}</uni-label>
				<uni-label v-show="showUser">用户:{{userName}}</uni-label>
			</view>
			<view class="window-center-content">
				<view data-iPage="headquarters" v-show="'headquarters'== currentpage?true:false">
					<view v-for="(item,index) in joinH"
						style="display: flex;justify-content: space-around;line-height: 40px;">
						<view @click="changePage(item)" :id="item.key">{{item.name}}</view>
						<view class="icon-item">
							<uni-icons :type="icontype" :color="'#8f8f94'" size="25" />
						</view>
					</view>
					<view style="display: flex;justify-content: space-around;line-height: 40px;"
						v-for="(item,index) in headQuarters" :id="item.UH_ID">
						<view @click="openHeadQuarters(item)">{{item.H_Name}}</view>
						<view class="icon-item">
							<uni-icons :type="icontype" :color="'#8f8f94'" size="25" />
						</view>
					</view>
				</view>
				<view date-iPage="mydata" v-show="'mydata'== currentpage?true:false">
					<view v-for="(item,index) in infors"
						style="display: flex;justify-content:space-around;line-height: 40px;" :id="item.key">
						<view @click="changePage(item)">{{item.name}}</view>
						<view class="icon-item">
							<uni-icons :type="icontype" :color="'#8f8f94'" size="25" />
						</view>
					</view>
				</view>
				<view data-iPage="msg" v-show="'msg'== currentpage?true:false">
					<view v-for="(item,index) in msgs"
						style="display: flex;justify-content: space-around;line-height: 40px;" @click="changePage(item)"
						:id="item.key">
						<view>{{item.name}}</view>
						<uni-badge size="small" :text="2" absolute="righttop" type="primary">
							<view>{{item.lasttime}}</view>
						</uni-badge>
					</view>
				</view>
				<view date-iPage="deduction" v-show="'deduction'== currentpage?true:false">
					<view @click="changePage(item)" :id="item.key" v-for="(item,index) in deductionbtns"
						style="display: flex;justify-content: space-around;line-height: 40px;">
						<view>{{item.name}}</view>
						<view class="icon-item">
							<uni-icons :type="icontype" :color="'#8f8f94'" size="25" />
						</view>
					</view>
					<view style="display: flex;justify-content: space-around;line-height: 40px;"
						v-for="(item,index) in deductions" :id="item.key">
						<view>{{item.name}}</view>
						<view class="icon-item">
							<uni-icons :type="icontype" :color="'#8f8f94'" size="25" />
						</view>
					</view>
				</view>
			</view>
			<view class="window-bottom-content" style="background-color: #f7f7f7;">
				<view :style="{color:colors[hcolor]}" @click="goToHeadquarters">指挥部</view>
				<view :style="{color:colors[dcolor]}" @click="goToDeduction">推演</view>
				<view :style="{color:colors[mcolor]}" @click="goToMessage">消息</view>
				<view :style="{color:colors[datacolor]}" @click="goToMydata">我</view>
			</view>
		</view>
	</view>
</template>

<script>
	var dataer = require("./../../common/datas.js");
	export default {
		data() {
			// pages headquarters mydata msg deduction
			let page = dataer.currentContext.page;
			return {
				colors: {
					"active": "#000000",
					"disabled": "#c6c6c6",
					"common": "#757575",
				},
				icontype: "arrowright",
				hcolor: "common",
				dcolor: "common",
				mcolor: "common",
				datacolor: "active",
				showPhone: true,
				phoneNo: "12111113",
				showUser: true,
				userName: "testUser",
				counter: 0,
				currentpage: page,
				joinH: [{
					"key": "applyJoinH",
					"name": "申请加入指挥部"
				}],
				headQuarters: [

				],
				deductionbtns: [{
					"key": "applyseat",
					"name": "申请席位"
				}, {
					"key": "modifyequipment",
					"name": "编辑装备物资"
				}],
				deductions: [

				],
				infors: [{
					"key": "mydata",
					"name": "编辑用户信息"
				}, {
					"key": "modifypwd",
					"name": "修改登录密码"
				}],
				msgs: [{
					"key": "deductionnotice",
					"name": "推演通知",
					"lasttime": "2021/07/13"
				}, {
					"key": "appinfo",
					"name": "使用简介",
					"lasttime": "2021/07/15"
				}]
			}
		},
		onInit() {
			console.log("onInit");
		},
		onShow() {
			console.log("onShow");
		},
		onLoad() {
			let Ur_Data = dataer.Ur_Data;
			let Ur_ID = Ur_Data['Ur_ID'];
			if (!Ur_ID) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
			let Ur_H = Ur_Data['Ur_H'];
			this.headQuarters = Ur_H;
		},
		methods: {
			changeCurrentPanel: function(curentP) {
				headQColor = '#c6c6c6';
				deductionColor = '#c6c6c6';
				msgColor = '#c6c6c6';
				mydataColor = '#c6c6c6';
			},
			goToHeadquarters: function() {
				dataer.currentContext.page = "headquarters";
				this.currentpage = "headquarters";
				uni.navigateTo({
					url: "/pages/index/mydata/applyJoinH"
				})
				let _that = this;
				let Ur_ID = dataer.Ur_Data['Ur_ID'];
				let paramdata = {
					Ur_ID: Ur_ID
				};
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
							dataer.Ur_H = data;
							_that.headQuarters = data;
						}
					}
				}, (ret) => {

				});
			},
			goToDeduction: function() {
				dataer.currentContext.page = "deduction";
				this.currentpage = "deduction";
				//dataer.getPerformanceRole
				uni.navigateTo({
					url: "/pages/index/mydata/deductionnotice"
				})
			},
			goToMessage: function() {
				dataer.currentContext.page = "msg";
				this.currentpage = "msg";
				uni.navigateTo({
					url: "/pages/index/mydata/imchat"
				})
			},
			goToMydata: function() {
				dataer.currentContext.page = "mydata";
				this.currentpage = "mydata";
				uni.navigateTo({
					url: "/pages/index/mydata/mydata"
				})
			},
			changePage: function(args) {
				if (args) {
					let page = args.key;
					uni.navigateTo({
						url: "/pages/index/mydata/" + page,
					})
				}
			},
			openHeadQuarters: function(headquanters) {
				let H_ID = headquanters.H_ID
				uni.navigateTo({
					url: "/pages/index/mydata/headquantersInfo?hid=" + H_ID,
				})
			},
			showPage: function(args) {
				let page = args.key;
				let curPage = uni.setStorageSync("pagename");
				if (page == curPage) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
</script>

<style>
	@import '@/common/uni-nvue.css';

	.icon-item {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		width: 180rpx;
		padding: 30rpx 10rpx;
		text-align: center;
		flex-direction: column;
	}

	/* .uni-icons{
		font-size: 20px;
	} */

	uni-button {
		background-color: transparent;
		position: unset;
	}
</style>
