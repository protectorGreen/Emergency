<template>
	<view>
		<slot></slot>
		<view class="uni-flex uni-row" :style="setItemStyle">
			<popup ref="popup" :maskColor="false" :bodyHeight="bodyHeight" :bodyWidth="bodyWidth" :mask="true"
				@outx="isoutX=true">
				<view :class="setPopClass" class="flex justify-start">
					<view class="flex flex-treble justify-center align-center padding-xs " style="width: 55rpx;"
						:style="undoStyle" @touchstart="startundo" @touchend="endundo" v-if="showundo==true">撤回</view>
					<view class="flex flex-treble justify-center align-center padding-xs" style="" :style="deleteStyle"
						@touchstart="startdelete" @touchend="enddelete">删除</view>
					<view class="flex flex-treble justify-center align-center padding-xs" style="width: 55rpx;"
						:style="copyStyle" @touchstart="startcopy" @touchend="endcopy" v-if="showcopy==true">复制</view>
				</view>
			</popup>
			<view style="width: 71rpx;height: 71rpx;margin-right: 17rpx;" class="flex justify-center align-center"
				v-if="speaker=='Others'&&isUndo==false">
				<view class="cu-avatar round"
					style="background-image: url(../../static/logo.png);width: 35px;height: 35px;">
				</view>
			</view>
			<div :class="setItemClass" :id="setItemId(dynamicId)" :style="minLength" @touchmove="stopTouch"
				@touchstart="startTouch" @touchend="stopTouch" v-if="contentType=='text'&&isUndo==false">
				<text>
					{{text}}
				</text>
			</div>


			<image class="imageClass" :src="imageInfo" :style="setImageStyle" mode="aspectFit" @load="loadImage"
				:id="setItemId(dynamicId)" @touchmove="stopTouch" @touchstart="startTouch" @touchend="stopTouch"
				@click="previewImage" v-if="contentType=='image'&&isUndo==false">
			</image>


			<div :class="setItemClass" :id="setItemId(dynamicId)" @touchmove="stopTouch" @touchstart="startTouch"
				@touchend="stopTouch" v-if="contentType=='audio'&&isUndo==false" @click="play"
				style="display: flex;flex-direction: row;">
				<text style="justify-content: flex-start;align-content: center;line-height: 45rpx;"
					:style="setVoidLength">
					{{audioRemainTime}}"
				</text>
				<text v-if="isactive==true&&speaker=='Self'" style="justify-content: flex-end;">
					<div class="content">
						<div class=" common big"></div>
						<div class="common middle"></div>
						<div class="common min"></div>
					</div>
				</text>
				<text v-if="isactive==false&&speaker=='Self'" style="justify-content: flex-end;">
					<div class="content">
						<div class="common big_0"></div>
						<div class="common middle_0"></div>
						<div class="common min"></div>
					</div>
				</text>
				<text v-if="isactive==true&&speaker=='Others'" style="justify-content: flex-end;">
					<div class="content2">
						<div class="common2 big"></div>
						<div class="common2 middle"></div>
						<div class="common2 min2"></div>
					</div>
				</text>
				<text v-if="isactive==false&&speaker=='Others'" style="justify-content: flex-end;">
					<div class="content2">
						<div class="common2 big_0"></div>
						<div class="common2 middle_0"></div>
						<div class="common2 min2"></div>
					</div>
				</text>
			</div>
			<div class="flex justify-center align-center " style="margin-bottom: 25rpx;width: 100%;"
				:id="setItemId(dynamicId)" v-if="isUndo==true">
				<view class="text-sm" style="color: #b6b6b6;">
					你撤回了一条消息
				</view>
			</div>
			<view style="width: 71rpx;height: 71rpx;margin-left: 17rpx;" class="flex justify-center align-center"
				v-if="speaker=='Self'&&isUndo==false">
				<view class="cu-avatar round" style="background-image: url(../../static/logo.png);width: 35px;height: 35px;">
				</view>
			</view>
			<!-- <view style="display: none;">
				hello world!
			</view> -->
		</view>
	</view>
</template>

<script>
	import popup from '@/components/popup/popup.vue';
	var timer;
	var isactive = false;
	var playerid = '';
	export default {
		name: "chat-item",
		props: {
			//发言者类型：自己 对方
			speaker: {
				type: String,
				default: 'Self'
			},
			//动态id，即v-for的index
			dynamicId: {
				type: String,
				default: '0',
			},
			//文本内容
			text: {
				type: String,
				default: '&nbsp;'
			},
			//内容类别
			contentType: {
				type: String,
				default: 'text'
			},
			//图片地址
			imageSrc: {
				type: String,
				default: ''
			},
			//录音地址
			audioSrc: {
				type: String,
				default: ''
			},
			imageList: {
				type: Array,
				default: []
			},
			createTime: {
				default: 0
			},
			isUndo: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				width: 165,
				height: 50,
				bodyHeight: 50,
				bodyWidth: 100,
				isactive: false,
				audioRemainTime: 0,
				audioduration: 10,
				audiomanager: null,
				isoutX: false,
				isthundo: false,
				isthdelete: false,
				isthcopy: false,
				showundo: false,
				showcopy: true,
				imageInfo:this.imageSrc
			};
		},
		mounted() {
			if (this.speaker == 'Self' && (new Date().getTime() - this.createTime < 60000)) {
				this.showundo = true
				this.bodyWidth += 50
			}
			if (this.contentType == 'image' || this.contentType == 'audio') {
				this.showcopy = false
				this.bodyWidth -= 50
			}
			this.$nextTick(() => {
				this.audiomanager = uni.createInnerAudioContext()
				this.audiomanager.src = this.audioSrc

				this.audiomanager.onEnded(() => {
					this.isactive = false
					this.$nextTick(() => {
						this.audioRemainTime = Math.round(this.audioduration)
						this.audiomanager.offTimeUpdate(() => {

						})
					})
				})
				this.audiomanager.onCanplay(() => {
					this.audioRemainTime = Math.round(this.audiomanager.duration)
					this.audioduration = Math.round(this.audiomanager.duration)
				})
				this.audiomanager.onPlay(() => {
					let a = this.audiomanager.duration
				})

				this.audiomanager.onStop(() => {
					this.isactive = false
					this.$nextTick(() => {
						this.audioRemainTime = Math.round(this.audioduration)
						this.audiomanager.offTimeUpdate(() => {

						})
					})
				})

				this.audiomanager.onPause(() => {
					if (this.dynamicId != playerid) {
						this.audiomanager.stop()
					}
				})


			})
		},
		components: {
			popup
		},
		computed: {
			setItemStyle() {
				if (this.speaker == 'Self') {
					return 'justify-content: flex-end;'
				}
				if (this.speaker == 'Others') {
					return 'justify-content: flex-start;'
				}
			},
			setItemClass() {
				if (this.speaker == 'Self') {
					return 'selfClass'
				}
				if (this.speaker == 'Others') {
					return 'otherClass'
				}
			},
			setImageStyle() {
				return `width:${this.width}px;height:${this.height}px;`
			},
			setVoidLength() {
				let length = Math.round(this.audioduration / 60 * 300) >= 13 ? Math.round(this.audioduration / 60 * 300) :
					13
				return `margin-right:${length}rpx;`
			},
			minLength() {
				if (this.text.length < 2) {
					return 'width:30rpx'
				}
			},
			setPopClass() {
				if (this.isoutX) {
					return 'outxcontent'
				} else {
					return 'popcontent'
				}
			},
			undoStyle() {
				if (this.isthundo) {
					return 'background:#4f4f4f;border-radius: 5px 0 0 5px;'
				} else {
					return ''
				}
			},
			deleteStyle() {
				if (this.isthdelete) {
					// if(this.speaker=='Self'){
					// 	if(this.showundo){
					// 		return 'background:#4f4f4f'
					// 	}else{
					// 		return 'background:#4f4f4f;border-radius:5px 0 0 5px;'
					// 	}
					// }else{
					// 	return 'background:#4f4f4f;border-radius: 5px 0 0 5px;'
					// }
					if (this.showundo && !this.showcopy) {
						return 'background:#4f4f4f;border-radius:0 5px 5px 0;width: 55rpx;'
					}
					if (!this.showundo && this.showcopy) {
						return 'background:#4f4f4f;border-radius:5px 0 0 5px;width: 55rpx;'
					}
					if (this.showundo && this.showcopy) {
						return 'background:#4f4f4f;width: 55rpx;'
					}
					if (!this.showundo && !this.showcopy) {
						return 'background:#4f4f4f;border-radius:5px 5px 5px 5px;width: 55rpx;'
					}
				} else {
					return ''
				}
			},
			copyStyle() {
				if (this.isthcopy) {
					return 'background:#4f4f4f;border-radius:0 5px 5px 0;'
				} else {
					return ''
				}
			}

		},
		methods: {

			longpressmethod(e) {
				let id = e.currentTarget.id
				// console.log(id)
				let itemY = 0
				let itemX = 0
				// console.log(e.target.id)
				// console.log(e);
				uni.createSelectorQuery().in(this).select(`#${id}`).boundingClientRect(data => {
					let X0 = data.left
					let X1 = data.right
					itemX = (X0 + X1) / 2
					itemY = data.top
					// console.log(JSON.stringify(data))
					this.$refs.popup.show(itemX, itemY)
				}).exec();
			},
			setItemId(index) {
				return 'dynamic_' + index
			},
			startTouch(e) {
				if (this.showundo) {
					if (new Date().getTime() - this.createTime >= 60000) {
						this.showundo = false
						this.bodyWidth -= 50
					}
				}
				timer = setTimeout(() => {
					let id = e.currentTarget.id
					let itemY = 0
					let itemX = 0
					uni.createSelectorQuery().in(this).select(`#${id}`).boundingClientRect(data => {
						let X0 = data.left
						let X1 = data.right
						itemX = (X0 + X1) / 2
						itemY = data.top
						// console.log(JSON.stringify(data))
						this.$refs.popup.show(itemX, itemY)
					}).exec();
				}, 350, e)
			},
			stopTouch(e) {
				// console.log('结束') 
				clearTimeout(timer)
			},
			loadImage(e) {
				let w = e.detail.width
				let h = e.detail.height
				let scale = w / h
				let maxlength = uni.upx2px(400)
				if (w > h) {
					w = w > maxlength ? maxlength : w
					h = w / scale
					this.width = w
					this.height = h
					// console.log('w>h')
				} else {
					h = h > maxlength ? maxlength : h
					w = h * scale
					this.width = w
					this.height = h
					// console.log('w<=h')
				}

			},
			previewImage() {
				uni.previewImage({
					current: this.imageSrc,
					urls: this.imageList,
					success: (res) => {

					},
					fail: (res) => {

					}
				})
			},
			play() {
				if (this.isactive) {
					this.audiomanager.pause()
					this.isactive = false
					this.$nextTick(() => {
						this.audiomanager.offTimeUpdate(() => {

						})
					})
					// this.audiomanager.offTimeUpdate(()=>{
					// 	console.log('Jieshu')
					// })

				} else {
					playerid = this.dynamicId
					this.audiomanager.play()
					this.$nextTick(() => {
						this.audiomanager.onTimeUpdate(() => {
							this.audioRemainTime = Math.round(this.audioduration -
									this.audiomanager.currentTime) > 0 ?
								Math.round(this.audioduration - this.audiomanager.currentTime) : 0

						})
					})
					this.isactive = true
				}

			},
			startundo() {
				this.isthundo = true
			},
			endundo() {
				this.isthundo = false
				this.$emit('undo', {
					index: this.dynamicId
				})
				this.$refs.popup.hide()

			},
			startdelete() {
				this.isthdelete = true
			},
			enddelete() {
				this.isthdelete = false
				this.$emit('delete', {
					index: this.dynamicId
				})
				this.$refs.popup.hide()
			},
			startcopy() {
				this.isthcopy = true
			},
			endcopy() {
				this.isthcopy = false
				uni.setClipboardData({
					data: this.text,
					success: () => {
						this.$refs.popup.hide()
					}
				})
			}
		}
	}
</script>

<style>
	.selfClass {
		background-color: rgb(0, 129, 255);
		padding: 14rpx 15rpx 14rpx 20rpx;
		display: inline-block;
		border-radius: 10px 2px 10px 10px;
		margin: 0 0rpx 25rpx 100rpx;
		position: relative;
		height: auto;
		line-height: 45rpx;
		width: auto;
		/* word-wrap: break-word; */
		word-break: break-all;
		white-space: pre-wrap;
		color: white;
		font-size: 30rpx;
		text-align: left;
	}

	.otherClass {
		background-color: rgb(255, 255, 255);
		padding: 14rpx 15rpx 14rpx 20rpx;
		/*14rpx 15rpx 14rpx 20rpx;*/
		display: inline-block;
		border-radius: 2px 10px 10px 10px;
		margin: 0 100rpx 25rpx 0rpx;
		position: relative;
		height: auto;
		line-height: 45rpx;
		width: auto;
		/* word-wrap: break-word; */
		word-break: break-all;
		white-space: pre-wrap;
		color: black;
		font-size: 30rpx;
	}

	.popcontent {
		/* 		width: 250rpx;
		height: 50rpx; */
		text-align: center;
		/* padding: 10rpx 10rpx 10rpx 10rpx; */
		border-radius: 5px;
		position: relative;
		background-color: black;
		color: white;
		/* font-size: 30rpx; */
	}

	.popcontent::after {
		content: "";
		display: block;
		width: 0px;
		height: 0px;
		border: 20rpx solid transparent;
		border-bottom-color: rgba(0, 0, 0, 1);
		position: absolute;
		bottom: 55rpx;
		/*68rpx*/
		left: 34%;
		/*45%*/
	}

	.outxcontent {
		/* 		width: 250rpx;
		height: 50rpx; */
		text-align: center;
		/* padding: 10rpx 10rpx 10rpx 10rpx; */
		border-radius: 5px;
		position: relative;
		background-color: rgba(0, 0, 0, 1);
		color: white;
		/* font-size: 30rpx; */
	}

	.outxcontent::after {
		content: "";
		display: block;
		width: 0px;
		height: 0px;
		border: 20rpx solid transparent;
		border-bottom-color: rgba(0, 0, 0, 1);
		position: absolute;
		bottom: 55rpx;
		/*68rpx*/
		left: 43%;
		/*45%*/
	}

	.imageClass {
		margin: 0 0rpx 25rpx 0rpx;
		padding: 0 0 0 0;
		border-radius: 8px;
	}

	.hoverClass {
		background-color: #a8a8a8;
	}

	.content {
		position: relative;
		width: 45rpx;
		height: 45rpx;
		border-radius: 50%;
		background-color: rgb(0, 129, 255);
	}

	.content2 {
		position: relative;
		width: 45rpx;
		height: 45rpx;
		border-radius: 50%;
		background-color: rgb(255, 255, 255);
	}

	.common {
		position: absolute;
		left: 20%;
		top: 50%;
		border-top: 2px solid rgb(0, 129, 255);
		border-right: 2px solid #ffffff;
		border-bottom: 2px solid rgb(0, 129, 255);
		border-left: 2px solid rgb(0, 129, 255);
		border-radius: 50%;
		box-sizing: border-box;
	}

	.common2 {
		position: absolute;
		left: 20%;
		top: 50%;
		border-top: 2px solid rgb(255, 255, 255);
		border-right: 2px solid #000000;
		border-bottom: 2px solid rgb(255, 255, 255);
		border-left: 2px solid rgb(255, 255, 255);
		border-radius: 50%;
		box-sizing: border-box;
	}

	.min {
		margin-left: -4px;
		margin-top: -4px;
		border-top: 4px solid rgb(0, 129, 255);
		border-right: 4px solid #ffffff;
		border-bottom: 4px solid rgb(0, 129, 255);
		border-left: 4px solid rgb(0, 129, 255);

		/* animation-name animation-duration animation-timing-function animation-delay animation-iteration-count animation-direction */
	}

	.min2 {
		margin-left: -4px;
		margin-top: -4px;
		border-top: 4px solid rgb(255, 255, 255);
		border-right: 4px solid #000000;
		border-bottom: 4px solid rgb(255, 255, 255);
		border-left: 4px solid rgb(255, 255, 255);
	}

	.middle {
		width: 16px;
		height: 16px;
		margin-left: -8px;
		margin-top: -8px;
		animation: one 0.8s linear infinite 0.2s;
		opacity: 0;
	}

	.big {
		width: 24px;
		height: 24px;
		margin-left: -12px;
		margin-top: -12px;
		animation: one 0.8s linear infinite 0.4s;
		opacity: 0;
	}



	.middle_0 {
		width: 16px;
		height: 16px;
		margin-left: -8px;
		margin-top: -8px;
		/* animation: one 1s ease-in-out infinite 0.4s; */
	}

	.big_0 {
		width: 24px;
		height: 24px;
		margin-left: -12px;
		margin-top: -12px;
		/* animation: one 1s ease-in-out infinite 0.6s; */
	}

	@keyframes one {
		from {
			opacity: 0;
		}

		to {
			opacity: 1
		}
	}
</style>
