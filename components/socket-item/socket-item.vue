<template>
	<view style="display: none;">

	</view>
</template>

<script>
	var socketTask;
	export default {
		name: "socket-item",
		props: {
			socketurl: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		mounted() {
			this.$nextTick(() => {
				this.init(this.socketurl)
			})
		},
		beforeDestroy() {
			socketTask.close()
		},
		computed: {

		},
		methods: {
			init(url) {

				socketTask = uni.connectSocket({
					url: url,
					data() {
						return {
							msg: 'Hello'
						}
					},
					success: (res) => {},
					fail: (res) => {

					}
				})
				// console.log(socketTask)
				socketTask.onMessage((res) => {
					let data_json = JSON.parse(res.data)
					let data = data_json.data
					let msg_type = ''
					if (data.contentType) {
						msg_type = data.contentType
					} else {
						msg_type = 'image'
					}

					switch (msg_type) {
						case 'text':
							this.onReciveText(data)
							break;

						case 'image':
							this.onReciveImage(data)
							break;

						case 'audio':
							this.onReciveAudio(data)
							break;


						default:
							break;
					}

				})
			},
			onReciveText(text) {
				let date = new Date()
				let obj = {
					speaker: 'Others',
					text: text.text,
					contentType: 'text',
					createTime: date.getTime(),
					isUndo: false,
					isDelete: false
				}

				this.$emit('ontext', {
					data: obj
				})
			},
			onReciveImage(images) {

				images.forEach(async (item, index) => {
					let url = 'http://47.100.189.197/downloadchat/image/?url=' + item.imageSrc
					await uni.downloadFile({
						url: url,
						success: (res) => {
							item.imageSrc = res.tempFilePath
							let image = {
								speaker: item.speaker,
								contentType: item.contentType,
								imageSrc: item.imageSrc,
								createTime: item.createTime,
								isUndo: item.isUndo,
								isDelete: item.isDelete
							}
							this.$emit('onimage', {
								data: image
							})
						}
					})

				})

			},
			onReciveAudio(audio) {
				let url = 'http://47.100.189.197/downloadchat/audio/?url=' + audio.audioSrc
				uni.downloadFile({
					url: url,
					success: (res) => {
						audio.audioSrc = res.tempFilePath
						this.$emit('onaudio', {
							data: audio
						})
					}
				})
			},
			sendTextMsg(data) {
				let dict_data = {}
				dict_data['data'] = data
				socketTask.send({
					data: JSON.stringify(dict_data),
					success: (res) => {

					},
					fail: (res) => {

					}
				})

			},
			sendImageMsg(images) {
				let objs = []
				let imageArray = []
				let date = new Date()
				let dict_data = {}
				images.forEach((item, index) => {
					let obj = new Object()
					obj.uri = item
					obj.name = index.toString()
					imageArray.push(obj)
				})
				uni.uploadFile({
					url: 'http://47.100.189.197/uploadchat/image/',
					files: imageArray,
					formData: {
						'count': images.length,
						'userid': '3'
					},
					method: 'POST',
					success: (uploadFiles) => {
						let data_json = JSON.parse(uploadFiles.data)
						let urls = data_json.imageList
						urls.forEach((item, index) => {
							let obj = {
								speaker: 'Others',
								contentType: 'image',
								imageSrc: item,
								createTime: date.getTime(),
								isUndo: false,
								isDelete: false
							}
							objs.push(obj)
						})
						dict_data['data'] = objs
						socketTask.send({
							data: JSON.stringify(dict_data),
							success: (res) => {

							},
							fail: (res) => {

							}
						})
					}
				})

			},
			sendAudioMsg(audio) {
				let dict_data = {}
				uni.uploadFile({
					url: 'http://47.100.189.197/uploadchat/audio/',
					filePath: audio.audioSrc,
					name: 'audiofile',
					formData: {
						'userid': '3'
					},
					method: 'POST',
					success: (uploadFiles) => {
						let data_json = JSON.parse(uploadFiles.data)
						let audiopath = data_json.audiopath
						let obj = {
							speaker: 'Others',
							contentType: audio.contentType,
							audioSrc: audiopath,
							createTime: audio.createTime,
							isUndo: audio.isUndo,
							isDelete: audio.isDelete
						}
						dict_data['data'] = obj
						socketTask.send({
							data: JSON.stringify(dict_data),
							success: (res) => {

							},
							fail: (res) => {

							}
						})
					}
				})
			},
			sendUndoMsg() {

			}
		}
	}
</script>

<style>

</style>
