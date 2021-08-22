<template>
	<view style="">
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-flex uni-column">
				<view class="uni-flex-item" style="">
					<!--1200rpx-->
					<!--'height:'+(screenHeight*0.86).toString()+'px'-->
					<scroll-view scroll-y="true" scroll-x="true"
						:style="'bottom:'+(screenHeight*0.13+bottomHeight-10).toString()+'px;'" class="scrollView"
						show-scrollbar="true" :scroll-into-view="getScrollView" scroll-with-animation="true">
						<chat-item v-for="(item,index) in chatList" :key="index" v-if="item.isDelete==false"
							@undo="undo" @delete="deleted" :dynamicId="index.toString()" :speaker="item.speaker"
							:text="item.text" :contentType="item.contentType" :imageSrc="item.imageSrc"
							:imageList="getImageList" :audioSrc="item.audioSrc" :createTime="item.createTime"
							:isUndo="item.isUndo">
							<view class="uni-flex uni-row" :style="setDatetimeStyle(item.createTime,index)">
								<view>
									{{computeDate(item.createTime,index)}}
								</view>
							</view>
						</chat-item>
					</scroll-view>
					<!--"'position: fixed;bottom:'+bottomHeight+'px;width: 100%;'"-->
				</view>
				<!--position: fixed;bottom: 0px;-->
				<!---->
				<!-- <view :style="'position: fixed;bottom:'+(bottomHeight-10).toString()+'px;left:0;right:0;width:auto;height:'+(screenHeight*0.13).toString()+'px;'" -->
				<view
					:style="'position:absolute;bottom:'+(bottomHeight-10).toString()+'px;left:0;right:0;width:auto;height:'+(screenHeight*0.13).toString()+'px;height:unset'"
					class="bottomClass" style="background-color: #FFFFFF;">
					<view class="uni-row uni-flex" style="align-content: center;justify-content: center;">
						<div class="inputClass" style="">
							<input placeholder="输入信息..." confirm-type="send" style="font-size: 30rpx;"
								cursor-spacing="40" @confirm="sendMessage" @keyboardheightchange="getKeyBoradHeight"
								ref="inputRef" v-model="inputcontent" :adjust-position="false" />

						</div>
						<uni-icons type="plusempty" size="25" @click="plusClick"></uni-icons>
						<!-- <div style="justify-content: flex-end;text-align: center;margin-top: 20rpx; -webkit-flex: 1;flex: 1;">
							<uni-icons type="redo" size="25" style="margin-left: 50%;" ></uni-icons>
						</div> -->
					</view>

					<!-- <uni-drawer ref="showbottom" mode="bottom" :mask-click="false">
						<scroll-view style="height: 100%;" scroll-y="true">
							<button @click="closeDrawer" type="primary">关闭Drawer</button>
							<view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
						</scroll-view>
					</uni-drawer> -->

					<view class="uni-row uni-flex" :style="{display:showPlus}" style="margin-bottom: 7px;width: 100%;">
						<div style="display: none; -webkit-flex: 1;flex: 1;text-align: center;" id="mic">
							<uni-icons type="mic" size="25" @click="micClick" v-if="clickMic==false"></uni-icons>
							<uni-icons type="mic-filled" size="25" @click="micClick" v-if="clickMic==true"></uni-icons>
						</div>
						<div style="-webkit-flex: 1;flex: 1;text-align: center;">
							<uni-icons type="list" size="25" @click="testclick"></uni-icons>
							公文
						</div>
						<div style="display: none; -webkit-flex: 1;flex: 1;text-align: center;">
							<uni-icons type="image" size="25" @click="imageClick"></uni-icons>
						</div>
						<div style="display: none; -webkit-flex: 1;flex: 1;text-align: center;">
							<uni-icons type="camera" size="25" @click="cameraClick"></uni-icons>
						</div>
					</view>
				</view>
			</view>
		</view>
		<popup ref="micpop" :maskColor="false" :bottom="true" :bodyBgColor="'bg-white'" @hide="micHide" id="micpop">
			<view style="height: 100%;" class="col-1">
				<view style="height: 20%" class="flex align-center justify-center text-xl">
					{{formatedRecordTime}}
				</view>
				<view class="flex align-center justify-center" style="height: 50%;">
					<button class="cu-btn cuIcon  shadow" :class="setButtonBg" style="width: 200rpx;height: 200rpx;"
						@touchmove="micTouchMove" @touchend="micTouchEnd" @touchstart="micTouchStart" id="micbutton">
						<uni-icons type="mic" size="40"></uni-icons>
					</button>
				</view>
				<view style="height: 20%;" class="flex align-center justify-center text-xl" v-if="isRecording==false">
					点击录音
				</view>
				<view style="height: 20%;" class="flex align-center justify-center text-xl" v-if="isRecording==true">
					向上滑动取消
				</view>
			</view>
		</popup>
		<popup ref="tips" :maskColor="false" :center="true" :bodyBgColor="'bg-white'" :mask="false">
			<view style="width: 250rpx;height: 250rpx;background-color: rgba(113,113,113,0.7)" class="col-1 radius">
				<view class="flex align-center justify-center " style="height: 50%;margin-top: 30rpx;">
					<uni-icons type="refreshempty" size="60"></uni-icons>
				</view>
				<view class="flex justify-center align-center " style="color: #ffffff;">
					松手取消发送
				</view>
			</view>
		</popup>
		<!-- <socket-item ref="socket" :socketurl="'ws://47.100.189.197/ws/test/'" @ontext="ontext" @onimage="onimage"
			@onaudio="onaudio">
		</socket-item> -->
	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	import popup from '@/components/popup/popup.vue';
	import chatItem from '@/components/chat-item/chat-item.vue';
	import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
	// import socketItem from '@/components/socket-item/socket-item.vue'
	var util = require('@/common/util.js')
	var recordManager = null;
	var recordTimeInterval = null;
	export default {
		name: "easyChat",
		props: {
			testList: {
				type: Array,
				default: []
			},
			socketUrl: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				timeStr: '',
				clickMic: false,
				scrollview: '',
				inputcontent: '',
				screenHeight: 0,
				bottomHeight: 10,
				micHeight: 255,
				formatedRecordTime: "00:00:00",
				recordTime: 0,
				isShowTips: false,
				isRecording: false,
				isCancel: false,
				socketTask: null,
				chatList: this.testList,
				showPlus: "none"
			}
		},
		onLoad() {



		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.$nextTick(() => {
						this.screenHeight = res.windowHeight
					})
				}
			})

			this.$nextTick(() => {
				recordManager = uni.getRecorderManager()
				recordManager.onStart(() => {
					recordTimeInterval = setInterval(() => {
						this.recordTime += 1;
						this.formatedRecordTime = util.formatTime(this.recordTime)
					}, 1000)
				})
				recordManager.onStop((res) => {
					if (this.isCancel) {
						this.formatedRecordTime = "00:00:00"
						this.isCancel = false
						this.recordTime = 0
					} else {
						if (this.recordTime < 1) {
							this.formatedRecordTime = "00:00:00"
							this.recordTime = 0
							uni.showToast({
								icon: 'none',
								title: '发送时间太短',
								duration: 1000
							})

						} else {
							this.recordTime = 0
							let date = new Date()
							let obj = {
								speaker: 'Self',
								contentType: 'audio',
								audioSrc: res.tempFilePath,
								createTime: date.getTime(),
								isUndo: false,
								isDelete: false
							}
							this.chatList.push(obj)
							let id = "dynamic_" + (this.chatList.length - 1 > -1 ? this.chatList.length -
								1 : 0).toString()
							this.$nextTick(() => {
								this.scrollview = id
								this.formatedRecordTime = "00:00:00"
							})
							this.$refs.socket.sendAudioMsg(obj)
						}
					}
				})
			})

			uni.onKeyboardHeightChange((res) => {
				this.scrollview = "null"
				let id = "dynamic_" + (this.chatList.length - 1 > -1 ? this.chatList.length - 1 : 0).toString()
				if (res.height > 0) {
					this.$nextTick(() => {
						this.scrollview = id
					})
					this.bottomHeight = res.height + 10
				}
				if (res.height == 0) {
					this.$nextTick(() => {
						this.bottomHeight = 10
					})
				}

			})
		},
		components: {
			popup,
			chatItem,
			uniIcons // socketItem
		},
		computed: {
			getImageList() {
				let urls = []
				this.chatList.forEach((item, index) => {
					if (item.contentType == 'image') {
						urls.push(item.imageSrc)
					}
				}, this)
				return urls
			},
			getScrollView() {
				return this.scrollview
			},
			setButtonBg() {
				if (this.isRecording) {
					return `bg-blue`
				} else {
					return `bg-gray`
				}
			}
		},
		methods: {
			plusClick() {
				this.showPlus = this.showPlus == "flex" ? "none" : "flex";
			},
			// showbottom() {
			// 	this.showPlus = "none";
			// },
			readmethod() {


			},
			longpressmethod(e) {
				let id = e.target.id
				let itemY = 0
				let itemX = 0
				uni.createSelectorQuery().in(this).select(`#test1`).boundingClientRect(data => {
					let X0 = data.left
					let X1 = data.right
					itemX = (X0 + X1) / 2
					itemY = data.top
					this.$refs.popup.show(itemX, itemY)
				}).exec();

			},
			computeDate(datetime, index) {
				if (datetime) {
					let date = new Date()
					if (index > 0) {
						let beforetimestrap = this.chatList[index - 1].createTime
						if ((datetime - beforetimestrap) > 60000) {
							date.setTime(datetime)
							let time = date.toString()
							let localtime = time.split(" ")[4]
							return localtime
						} else {
							return ''
						}
					} else {
						return ''
					}
				} else {

					return ''
				}
			},
			setDatetimeStyle(datetime, index) {
				if (datetime) {
					if (index > 0) {
						let beforetimestrap = this.chatList[index - 1].createTime
						if ((datetime - beforetimestrap) > 60000) {
							return 'justify-content: center;align-content: center;margin-bottom: 25rpx;font-size: 25rpx;'
						} else {
							return ''
						}
					} else {
						return ''
					}
				} else {
					return ''
				}
			},
			sendMessage(res) {
				let text = res.detail.value
				let date = new Date()
				if (text) {
					let obj = {
						speaker: 'Self',
						contentType: 'text',
						imageSrc: './../static/logo.png',
						text: text,
						createTime: date.getTime(),
						isUndo: false,
						isDelete: false
					}
					//this.$refs.socket.sendTextMsg(obj)
					this.$emit("sendmsg", text);
					this.chatList.push(obj);
					let id = "dynamic_" + (this.chatList.length - 1 > -1 ? this.chatList.length - 1 : 0).toString()
					this.$nextTick(() => {
						this.inputcontent = ''
						this.scrollview = id
					})



				}
			},
			async checkPermission() {
				let status = permision.isIOS ? await permision.requestIOS('record') :
					await permision.requestAndroid('android.permission.RECORD_AUDIO');

				if (status === null || status === 1) {
					status = 1;
				} else if (status === 2) {
					uni.showModal({
						content: "系统麦克风已关闭",
						confirmText: "确定",
						showCancel: false,
						success: function(res) {}
					})
				} else {
					uni.showModal({
						content: "需要麦克风权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
			},
			async micClick() {
				let status = await this.checkPermission()
				if (status !== 1) {
					return;
				}
				if (this.clickMic) {
					this.clickMic = false
				} else {
					this.clickMic = true
					this.$refs.micpop.show(-1, this.screenHeight - this.micHeight)
					this.$nextTick(() => {
						this.bottomHeight = this.micHeight
					})

					let id = "dynamic_" + (this.chatList.length - 1 > -1 ? this.chatList.length - 1 : 0).toString()
					this.$nextTick(() => {
						this.scrollview = id

					})
					this.scrollview = "null"
				}
			},
			imageClick() {
				let date = new Date()
				let urls = []
				uni.chooseImage({
					sourceType: ['album'],
					count: 6,
					success: (res) => {
						let imagepaths = res.tempFilePaths
						imagepaths.forEach((item, index) => {
							let obj = {
								speaker: 'Self',
								contentType: 'image',
								imageSrc: item,
								createTime: date.getTime(),
								isUndo: false,
								isDelete: false
							}
							this.chatList.push(obj)
							urls.push(item)
						})
						setTimeout(() => {
							let id = "dynamic_" + (this.chatList.length - 1 > -1 ? this.chatList
								.length - 1 : 0).toString()
							this.scrollview = id
						}, 500)
						this.$refs.socket.sendImageMsg(urls)
					},
					fail: (res) => {

					}
				})

			},
			cameraClick() {
				let date = new Date()
				uni.chooseImage({
					sourceType: ['camera'],
					success: (res) => {
						let imagepaths = res.tempFilePaths
						imagepaths.forEach((item, index) => {
							let obj = {
								speaker: 'Self',
								contentType: 'image',
								imageSrc: item,
								createTime: date.getTime(),
								isUndo: false,
								isDelete: false
							}
							this.chatList.push(obj)
						})
						setTimeout(() => {
							let id = "dynamic_" + (this.chatList.length - 1 > -1 ? this.chatList
								.length - 1 : 0).toString()
							this.scrollview = id
						}, 500)
					},
					fail: (res) => {

					}
				})
			},
			getKeyBoradHeight(res) {},
			micHide() {
				this.bottomHeight = 10
				this.clickMic = false
			},
			micTouchStart(e) {
				this.isRecording = true
				recordManager.start({
					format: 'mp3'
				})
			},
			micTouchMove(e) {
				let boundery = this.screenHeight - this.bottomHeight + e.currentTarget.offsetTop
				if (e.touches[0].clientY < boundery && !this.isShowTips) {
					// #ifdef MP
					recordManager.pause()
					// #endif
					this.isCancel = true
					this.isShowTips = true
					this.$refs.tips.show()
				}
				if (e.touches[0].clientY >= boundery) {
					// #ifdef MP
					recordManager.resume()
					// #endif
					this.isCancel = false
					this.isShowTips = false
					this.$refs.tips.hide()
				}
			},
			micTouchEnd(e) {
				this.isRecording = false
				clearInterval(recordTimeInterval)
				recordManager.stop()
				this.$refs.tips.hide()

			},
			undo(data) {
				let index = parseInt(data.index)
				this.chatList[index].isUndo = true
				console.log(this.scrollview)
			},
			deleted(data) {
				let index = parseInt(data.index)

				this.$nextTick(() => {
					this.chatList[index].isDelete = true
				})
			},
			onReciveMessages(message) {

			},
			ontext(text) {
				let obj = text.data
				this.chatList.push(obj)
				let id = "dynamic_" + (this.chatList.length - 1 > -1 ? this.chatList.length - 1 : 0).toString()
				this.$nextTick(() => {

					this.scrollview = id
				})
			},
			onimage(msg) {
				let image = msg.data
				this.chatList.push(image)
				let id = "dynamic_" + (this.chatList.length - 1 > -1 ? this.chatList.length - 1 : 0).toString()
				setTimeout(() => {
					this.scrollview = id
				}, 500)
			},
			onaudio(msg) {
				let audio = msg.data
				this.chatList.push(audio)
				let id = "dynamic_" + (this.chatList.length - 1 > -1 ? this.chatList.length - 1 : 0).toString()

				setTimeout(() => {
					this.scrollview = id
				}, 500)
			},
			testclick() {
				this.$emit("test");
			}
		}
	}
</script>

<style>
	.inputClass {
		margin: 5px 0px 5px 0px;
		border-radius: 15px;
		background-color: #d1d1d1;
		align-content: center;
		padding: 5px 10px 5px 10px;
		font-size: 30rpx;
		width: 100%;
	}

	.scrollView {
		/* position: fixed; */
		position: absolute;
		right: 0px;
		left: 0;
		top: 0;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 10px;
		width: auto;
	}

	.bottomClass {
		padding-left: 10px;
		padding-right: 10px;
	}

	.uni-common-mt {
		margin-top: unset;
	}
</style>
