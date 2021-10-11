<template>
	<view class="leftwindow-content">
		<view ref="leftCol" class="leftwindow-content window-col-content">
			<view ref="leftColTop" style="display: flex;"
				class="window-top-content window-col-content window-col-center">
				<uni-label v-show="showPhone">手机号:{{phoneNo}}</uni-label>
				<uni-label v-show="showUser">用户:{{userName}}</uni-label>
			</view>
			<view ref="leftColCenter" :style="[{height:colCenterHeight}]" class="window-center-content">
				<scroll-view data-iPage="headquarterspage" v-show="'headquarterspage'== currentpage?true:false">
					<view class="leftNavItem" v-for="(item,index) in joinH">
						<view class="lefttitle" @click="changePage(item)" :id="item.key">{{item.name}}</view>
						<view class="icon-item">
							<uni-icons :type="icontype" :color="'#8f8f94'" size="18" />
						</view>
					</view>
					<view class="leftNavItem" v-for="(item,index) in headQuarters" :id="item.UH_ID">
						<view class="lefttitle" @click="openHeadQuarters(item)">{{item.H_Name}}</view>
						<view class="icon-item">
							<uni-icons :type="icontype" :color="'#8f8f94'" size="18" />
						</view>
					</view>
				</scroll-view>
				<scroll-view date-iPage="mydata" v-show="'mydata'== currentpage?true:false">
					<view class="leftNavItem" v-for="(item,index) in infors" :id="item.key">
						<view class="lefttitle" @click="changePage(item)">{{item.name}}</view>
						<view class="icon-item">
							<uni-icons :type="icontype" :color="'#8f8f94'" size="18" />
						</view>
					</view>
				</scroll-view>
				<scroll-view data-iPage="msg" v-show="'msg'== currentpage?true:false">
					<view class="msgView" v-for="(item,index) in msgs" @click="changePage(item)" :id="item.key">
						<view class="">{{item.name}}</view>
						<uni-badge size="small" :text="2" absolute="righttop" type="primary">
							<view>{{item.lasttime}}</view>
						</uni-badge>
					</view>
				</scroll-view>
				<view date-iPage="deduction" v-show="'deduction'== currentpage?true:false">
					<view class="leftNavItem leftnotice" @click="changePage(item)" :id="item.key"
						v-for="(item,index) in deductionbtns">
						<view class="lefttitle">{{item.name}}</view>
						<view class="icon-item">
							<uni-icons :type="icontype" color="#8f8f94" size="18" />
						</view>
					</view>
					<view style="width: 90%;display: flex;flex-wrap: wrap;">
						<view @click="openchatitem(item)" style="text-align: center;" class="" v-for="(item,index) in deductions"
							:id="item.PR_ID">
							<view class="chat-icon-item">
								<uni-icons type="contact" :color="item.color" size="18" />
							</view>
							{{item.PR_Name}}
							<!-- <view style="padding:15px 0px;">{{item.PR_Name}}</view> -->
						</view>
					</view>					
				</view>
			</view>
			<view ref="leftColBottom" class="window-bottom-content" style="background-color: #f7f7f7;">
				<view class="common" :class="[{ active:'headquarterspage'== currentpage }]" @click="goToHeadquarters">
					指挥部
				</view>
				<view :class="[{common:dcommon},{disabled:dedudisabled}, {active:'deduction'== currentpage}]"
					@click="goToDeduction">推演</view>
				<view class="common" :class="[{ active:'msg'== currentpage }]" @click="goToMessage">消息</view>
				<view class="common" :class="[{ active:'mydata'== currentpage }]" @click="goToMydata">我</view>
			</view>
		</view>

		<view class="chatclass">
			<uni-popup class="chatpopup"
				style="width: 300px;height: 300px;display: flex;flex-direction: column;justify-content: space-between;"
				type="dialog" ref="multichatpop" background-color="#fff">
				<view style="width: 300px;height: 300px;">
					<view style="text-align: center;">群聊选择</view>
					<scroll-view class="uni-list">
						<checkbox-group @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in multichats"
								:key="item.PR_Name">
								<view>
									<checkbox :value="item.PR_ID.toString()" :checked="item.checked" />
								</view>
								<view>{{item.PR_Name}}</view>
							</label>
						</checkbox-group>
					</scroll-view>
				</view>
				<view>
					<text class="uni-tip-button" @click="cancelMulti">取消</text>
					<text class="uni-tip-button" @click="chooseMulti">确定</text>
				</view>

			</uni-popup>
		</view>
		<signalr ref="signalr" v-on:receiveMessage="onReceiveMessage"></signalr>
	</view>
</template>

<script>
	var dataer = require("./../../common/datas.js");
	import signalr from "@/components/signalr/signalr.vue";
	export default {
		components: {
			signalr
		},
		name: "leftNav",
		computed: {},
		mounted: function() {

			uni.getSystemInfo({
				success: (res) => {
					this.$nextTick(() => {
						if (res.screenHeight && res.screenHeight > 100) {
							this.colCenterHeight = (res.screenHeight - 100).toString() + "px";
						}
					})
				}
			})

			this.$nextTick(function() {
				let curPage = dataer.currentContext.page;
				switch (curPage) {
					case "headquarterspage":
						this.hcolor = "#000000";
						this.dcolor = "#757575";
						this.mcolor = "#757575";
						this.datacolor = "#757575";
						break;
					case "mydata":
						this.hcolor = "#757575";
						this.dcolor = "#757575";
						this.mcolor = "#757575";
						this.datacolor = "#000000";
						break;
					case "msg":
						this.hcolor = "#757575";
						this.dcolor = "#757575";
						this.mcolor = "#000000";
						this.datacolor = "#757575";
						break;
					case "deduction":
						this.hcolor = "#757575";
						this.dcolor = "#000000";
						this.mcolor = "#ff5500";
						this.datacolor = "#757575";
						this.dedudisabled = false;
						break;
				}
				this.$forceUpdate();
			})
		},
		data() {
			// pages headquarterspage mydata msg deduction
			let page = dataer.currentContext.page;
			let Ur_Data = dataer.Ur_Data;
			let Ur_ID = Ur_Data['Ur_ID'];
			let Ur_H = Ur_Data['Ur_H'];
			let prs = dataer.dataContext.prs;
			let p_id = dataer.currentContext.p_id;
			let prss_temp = prs[p_id];
			if (!prss_temp || prss_temp.length == 0) {
				prss_temp = [];
			}
			//'#8f8f94'			

			if (prss_temp) {
				for (var i = 0; i < prss_temp.length; i++) {
					if (prss_temp[i]) {
						if (prss_temp[i]['Ur_ID']) {
							prss_temp[i]['color'] = "#55aaff";
							if (prss_temp[i]['Ur_ID'] == Ur_ID) {
								prss_temp[i]['color'] = "#aa0000";
							}
						} else {
							prss_temp[i]["color"] = '#8f8f94';
						}
					}
				}
				let curTemp = prss_temp.find((item) => {

					if (item['PR_ID'] == -1) {
						return item;
					}
				})
				if (!curTemp) {
					prss_temp.push({
						"PR_ID": -1,
						"PR_Name": "群发"
					});
				}
			}
			let prss = prss_temp; //prs[p_id]; //.contact({"PR_ID":-1,"PR_Name":"群发"});
			var prss_copy = [];
			for (var j = 0; j < prss.length; j++) {
				let prssItem = prss[j];
				if (prssItem['PR_ID'] == -1) {
					continue;
				}
				let prss_copy_data = {
					"PR_ID": prssItem['PR_ID'],
					"PR_Name": prssItem["PR_Name"],
					"text": prssItem['PR_Name'],
					"value": prssItem['PR_ID']
				}
				prss_copy.push(prss_copy_data);
			}
			return {
				// colors: {
				// 	"active": "#000000",
				// 	"disabled": "#c6c6c6",
				// 	"common": "#757575",
				// },
				colCenterHeight: "400px", //400,//"400px",
				multichatsvalue: [],
				icontype: "arrowright",
				dedudisabled: true,
				hcolor: "#757575",
				dcolor: "#c6c6c6",
				dcommon: false,
				mcolor: "#757575",
				datacolor: "#000000",
				showPhone: true,
				phoneNo: Ur_Data.Ur_Phone,
				showUser: true,
				userName: Ur_Data.Ur_Name,
				currentpage: page,
				joinH: [{
					"key": "applyJoinH",
					"name": "申请加入指挥部"
				}],
				headQuarters: Ur_H,
				deductionbtns: [{
					"key": "applyseat",
					"name": "申请席位"
				}, {
					"key": "modifyequipment",
					"name": "编辑装备物资"
				}, {
					"key": "dispatchequipment",
					"name": "调遣装备物资"
				}],
				deductions: prss,
				multichats: prss_copy,
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
		onResize(e) {
			console.log(e);
		},
		onReady: () => {},
		onInit() {},
		onShow() {},
		onLoad() {
			let Ur_Data = dataer.Ur_Data;
			let Ur_ID = Ur_Data['Ur_ID'];
			if (!Ur_ID) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
			let Ur_H = Ur_Data['Ur_H'];
			if (dataer.currentContext.bdeduction) {
				this.dcolor = '#757575';
			} else {
				this.dcolor = '#c6c6c6';
			}
			//this.headQuarters = Ur_H;
		},
		watch: {
			"hcolor": function(oldval, newval) {
				//debugger
				console.log('pro changed');
			},
			"headQuarters": function(oldval, newval) {
				this.$forceUpdate();
			},
			"bdeduction": function() {
				console.log("leftNav..watch..bdeduction");
			},
			"dedudisabled": function() {
				//debugger;
			}
		},
		methods: {
			sendMsg: function(msgobj) {
				this.$refs.signalr.sendMessage(msgobj);
			},
			handlerSysMsg: function(msg) {
				console.log("leftNav..sys..msg");
			},
			handlerUserMsg: function(msg) {
				let pages = getCurrentPages();
				let pagesize = pages.length;
				if (pagesize > 0) {
					let route = getCurrentPages()[pagesize - 1]['route'];
					if (route.endsWith("/chat")) {
						let ReceiveUserId = msg['ReceiveUserId'];
						let SendUserId = msg['SendUserId'];
						if (dataer.Ur_Data.Ur_ID && dataer.currentContext.chatpr.indexOf(SendUserId) >= 0) {

						}
					}
				}

			},
			testUserMsg: function(msg) {
				msg = msg.toString();
				let pages = getCurrentPages();
				let pagesize = pages.length;
				if (pagesize > 0) {
					let chatComponent = getCurrentPages()[pagesize - 1];
					let route = chatComponent['route'];
					if (route.endsWith("/chat")) {
						let date = new Date();
						var testdata = {
							data: {
								speaker: 'Others',
								text: msg,
								contentType: 'text',
								createTime: date.getTime(),
								isUndo: false,
								isDelete: false
							}
						};
						//chatComponent.$refs.chat.ontext(testdata);
						this.$emit("onTextMsg", testdata);
					}
				}
			},
			onReceiveMessage: function(msgObj) {
				//debugger
				if (msgObj && typeof(msgObj) === "object") {
					var from = msgObj['from'];
					var msg = msgObj['message'];
					//getCurrentPages()[0]['route']
					if (msg && typeof(msg) === 'string') {
						//TYId ,SendUserId ,SendUserName ,ReceiveUserId ,ReceiveUserName ,Content FileURL FileLocalPath SendDateTime MessageType 
						try {
							var deductionMsg = JSON.parse(msg);
						} catch (e) {
							//TODO handle the exception
							deductionMsg = 'test';
						}

						if (deductionMsg && deductionMsg['MessageType']) {
							let type = deductionMsg['MessageType'];
							if (type == 0) {
								this.handlerSysMsg(deductionMsg);
							} else if (type == 1) {
								this.handlerSysMsg(deductionMsg);
							}
						} else {
							this.testUserMsg(deductionMsg);
						}
					}
				}
			},
			changeCurrentPanel: function(curentP) {
				headQColor = '#c6c6c6';
				deductionColor = '#c6c6c6';
				msgColor = '#c6c6c6';
				mydataColor = '#c6c6c6';
			},
			goToHeadquarters: function() {
				let _that = this;
				let Ur_ID = dataer.Ur_Data['Ur_ID'];
				let paramdata = {
					Ur_ID: Ur_ID
				};
				dataer.getHeadquanterByUser(paramdata, (ret) => {
					if (ret && ret['status'] == 0) {
						let data = ret['data'];
						dataer.Ur_H = data;
						dataer.Ur_Data['Ur_H'] = data;
						_that.headQuarters = data;
					}
				}, (ret) => {

				});

				this.hcolor = "#000000";
				this.dcolor = "#757575";
				this.mcolor = "#757575";
				this.datacolor = "#757575";

				dataer.currentContext.page = "headquarterspage";
				this.currentpage = "headquarterspage";
				uni.navigateTo({
					url: "/pages/index/mydata/applyJoinH"
				})
			},
			goToDeduction: function() {
				if (!dataer.currentContext.bdeduction) {
					return;
				}
				this.hcolor = "#757575";
				this.dcolor = "#000000";
				this.mcolor = "#757575";
				this.datacolor = "#757575";
				dataer.currentContext.page = "deduction";
				this.currentpage = "deduction";
				uni.navigateTo({
					//url: "/pages/index/mydata/deductionnotice"
					//url: "/pages/index/mydata/deductionnew"
					url: "/pages/index/mydata/deduction"
				})
			},
			goToMessage: function() {
				this.hcolor = "#757575";
				this.dcolor = "#757575";
				this.mcolor = "#000000";
				this.datacolor = "#757575";
				dataer.currentContext.page = "msg";
				this.currentpage = "msg";
				uni.navigateTo({
					url: "/pages/index/mydata/imchat"
				})
			},
			goToMydata: function() {
				this.hcolor = "#757575";
				this.dcolor = "#757575";
				this.mcolor = "#757575";
				this.datacolor = "#000000";
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
				let H_ID = headquanters.H_ID;
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
			},
			openchatitem: function(item) {
				//debugger
				let PR_Name = item.PR_Name;
				let PR_ID = item.PR_ID;
				if (PR_ID == -1) {
					this.$refs.multichatpop.open("center");
					return;
				}
				dataer.currentContext.chatpr = [PR_ID];
				uni.navigateTo({
					url: "/pages/index/mydata/chat?PR_ID=" + PR_ID,
				})
			},
			changeDeductionStatus: function(deduStatus) {
				this.dedudisabled = deduStatus;
				this.dcommon = !deduStatus;
			},
			updateDisplay: function(phone) {
				this.phoneNo = phone;
			},
			updatePerformanceRole: function() {
				let performacerole = dataer.prs;
				this.deductions = performacerole;
			},
			updateHeadQuanters: function(hqs) {
				this.headQuarters = hqs;
			},
			cancelMulti: function() {
				this.$refs.multichatpop.close();
			},
			chooseMulti: function() {
				this.$refs.multichatpop.close();
				if (this.multichatsvalue && this.multichatsvalue.length > 0) {
					dataer.currentContext.chatpr = this.multichatsvalue;
					uni.navigateTo({
						url: "/pages/index/mydata/chat",
					})
				} else {
					uni.showToast({
						title: "未选择群聊对象"
					})
				}
			},
			checkboxChange: function(e) {
				//debugger
				var items = this.multichats,
					values = e.detail.value;
				this.multichatsvalue = values;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.indexOf(item.value) >= 0) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
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
		/* width: 90rpx; */
		padding: 30rpx 10rpx;
		text-align: center;
		flex-direction: column;
	}
	
	.chat-icon-item{
		disp: flex;
		box-si: border-box;
		text-align: center;
		flex-direction: column;
		width: 100px;
	}

	/* .uni-icons{
		font-size: 20px;
	} */

	uni-button {
		background-color: transparent;
		position: unset;
	}

	.common {
		color: #757575;
	}

	.active {
		color: #000000;
	}

	.disabled {
		color: #c6c6c6;
	}

	.chatpopup {
		width: 300px !important;
		height: 300px !important;
		display: flex !important;
		flex-direction: column !important;
		justify-content: space-between !important;
	}

	.leftNavItem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		line-height: 20px;
	}

	/* .leftnotice{
		padding: 10px 10px;
	} */
	.msgView {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px 10px;
	}
</style>
