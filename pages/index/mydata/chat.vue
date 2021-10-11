<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav ref="leftnavi" @onTextMsg="onTextMsg"></leftNav>
		</view>
		<view class="rightarea">
			<!-- <button @click="test1()"></button> -->
			<topNav :title="title"></topNav>
			<scroll-view class="rightscroll">
				<easyChat v-on:sendmsg="sendmsg" v-on:test="test" ref="chat" :testList="testlist"></easyChat>
				<!-- <signalr></signalr> -->
			</scroll-view>

			<view>
				<uni-popup
					style="width: 500px;height:500px;display: flex;flex-direction: column;justify-content: space-between;"
					type="dialog" ref="docpop" background-color="#fff">
					<scroll-view style="width: 500px;height: 500px;overflow-y: scroll;">
						<view class="emergency-popup-header">公文</view>
						<uni-collapse>
							<uni-collapse-item title="格式信息">
								<uni-forms ref="form" :value="formdata">
									<uni-forms-item name="" required label="发电单位">
										<uni-easyinput placeholder="请输入发电单位"></uni-easyinput>
									</uni-forms-item>
									<uni-forms-item name="" label="签发人">
										<uni-easyinput placeholder="请输入签发人"></uni-easyinput>
									</uni-forms-item>
									<uni-forms-item name="" label="发电时间">
										<uni-datetime-picker type="datetime" />
									</uni-forms-item>
									<uni-forms-item name="" label="等级">
										<uni-easyinput placeholder="请输入等级"></uni-easyinput>
									</uni-forms-item>
									<uni-forms-item name="" label="标题">
										<uni-easyinput placeholder="请输入标题"></uni-easyinput>
									</uni-forms-item>
									<uni-forms-item name="" label="抬头">
										<uni-easyinput placeholder="请输入抬头"></uni-easyinput>
									</uni-forms-item>
								</uni-forms>

							</uni-collapse-item>
							<uni-collapse-item title="内容">
								<uni-forms-item name="contenttype" label="内容类型">
									<picker @change="contentChange" :value="index" :range="contentTypes"
										range-key="text">
										<view class="uni-input">{{contentTypes[index].text}}</view>
									</picker>
								</uni-forms-item>
								<view class="uni-list">
									<radio-group @change="radioChange">
										<!-- <label class="uni-list-cell uni-list-cell-pd"> -->
										<view v-for="(item1,indexRadio) in items" :key="item1.value">
											<view style="display: flex;">
												<radio :value="item1.value" :checked="indexRadio==currentIndex" />
												<textarea :key="indexRadio" type="textarea"
													@input="inputText($event,indexRadio)"
													v-model="item1.text"></textarea>
											</view>
											<!-- <view><textarea :value="item1.text"></textarea></view> -->
										</view>
										<!-- </label> -->
									</radio-group>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</scroll-view>
					<view class="emergency-popup-bottom">
						<text class="uni-tip-button popup-btn" @click="cancelDoc">取消</text>
						<text class="uni-tip-button popup-btn" @click="sendDoc">确定</text>
					</view>

				</uni-popup>
			</view>

		</view>
	</view>
</template>
<script>
	import easyChat from '@/components/xiaowentao-easyChat/xiaowentao-easyChat.vue';
	import signalr from '@/components/signalr/signalr.vue';
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	let dataer = require("@/common/datas.js");
	let testdata = require("@/common/testData.js");
	export default {
		components: {
			leftNav,
			topNav,
			easyChat,
			signalr
		},

		data() {
			var p_id = dataer.currentContext.p_id;
			var prs = dataer.dataContext.prs[p_id];
			var chatprname = '';
			var chatprids = dataer.currentContext.chatpr;
			if (chatprids && chatprids.length > 0) {
				chatprids.forEach((chatprid) => {
					let curpr = prs.find((item) => {
						if (item['PR_ID'] == chatprid) {
							return item;
						}
					})
					if (curpr) {
						chatprname = chatprname + curpr['PR_Name'] + ",";
					}
				})
			}
			if (chatprname.endsWith(',')) {
				let length = chatprname.length;
				chatprname = chatprname.substr(0, length - 1);
			}
			var currentTitle = chatprname;
			var items = [{
					value: "test1",
					checked: false,
					text: "Visual Studio Code is a lightweight but powerful source code editor ",
				},
				{
					value: "test2",
					checked: true,
					text: "                available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity). Begin your journey with VS Code with these",
				}
			];
			var formdata ={
				
			}
			return {
				currentIndex: 0,
				items: items,
				index: 0,
				contentTypes: testdata.testdata.contenttypes,
				title: currentTitle,
				formdata:formdata,
				testlist: [{
						speaker: 'Self',
						contentType: 'text',
						text: '@/static/logo.png',
						createTime: 1616850256639,
						isUndo: false,
						isDelete: false
					},
					{
						speaker: 'Others',
						contentType: 'text',
						text: '../../static/other.jpg',
						createTime: 1616847101568,
						isUndo: false,
						isDelete: false
					},
					{
						speaker: 'Self',
						contentType: 'image',
						imageSrc: 'blob:http://localhost:8080/9228f7c0-6010-41ed-bc04-e5bd7bd35c65',
						createTime: 1616847115176,
						isUndo: false,
						isDelete: false
					},
					{
						speaker: 'Self',
						contentType: 'text',
						text: '../../static/self.jpg',
						createTime: 1616847115176,
						isUndo: false,
						isDelete: false
					},
				]
			}
		},
		onLoad() {
			// this.$refs.easyChat.$on('test', function() {
			// 	uni.showToast({
			// 		title: "testabc"
			// 	})
			// })
		},
		methods: {
			cancelDoc: function() {
				this.$refs.docpop.close();
			},
			sendDoc: function() {
				if(getApp().globalData.signalrConnection){
					let centMsg = {
						
					};
					let msg = JSON.stringify()
					getApp().globalData.signalrConnection.invoke("SendTYMessageToUser","");
				}
				this.$refs.docpop.close();
			},
			inputText: function(event, index) {
				//debugger
				///this.items[index]['text'] = event.detai.value;
			},
			sendmsg: function(msg) {
				//TYId ,SendUserId ,SendUserName ,
				//ReceiveUserId ,ReceiveUserName ,
				//Content FileURL FileLocalPath SendDateTime MessageType 
				var chatList = dataer.currentContext.chatpr;
				for (var i = 0; i < chatList.length; i++) {
					let chatItem = chatList[i];
					let msgobj = {
						TYId: dataer.currentContext.p_id,
						SendUserId: dataer.Ur_Data.Ur_ID,
						SendUserName: dataer.Ur_Data.Ur_Name,
						ReceiveUserId: chatItem,
						Content: msg,
					}
					this.$refs.leftnavi.sendMsg(msgobj);
				}
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.currentIndex = i;
						break;
					}
				}
			},
			contentChange: function(e) {
				this.index = e.detail.value;
			},
			test: function() {
				this.$refs.docpop.open("center");
			},
			test1: function() {
				uni.showToast({
					title: "msg"
				})
			},
			onTextMsg: function(msg) {
				//debugger
				this.$refs.chat.ontext(msg);
			}
		}
	}
</script>

<style>
	.uni-date-single--x{
		position: relative !important;
	}
</style>
