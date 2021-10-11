<script>
	import * as signalR from "js_sdk/signalr.js";
	import leftNav from "components/leftNav/leftNav.vue";
	import topNav from "components/topNav/topNav.vue";
	let datas = require("common/datas.js");
	//var signalrConnection;
	export default {
		globalData: {
			signalrConnection: {}
		},
		onLaunch: function() {
			console.log('App Launch');
			console.log(this);
			var _that = this;
			let signurl = datas.envconfig.signsrv + "/typrocessHub";

			///let signurl = datas.envconfig.signsrv + "/chatHub";
			getApp().globalData.signalrConnection = new signalR.HubConnectionBuilder()
				.withUrl(signurl, {
					// accessTokenFactory: () => {
					//     return 'token';
					// }
					skipNegotiation: true,
					transport: signalR.HttpTransportType.WebSockets
				}).build();

			//接收消息
			getApp().globalData.signalrConnection.on("ReceiveMessage", function(user, message) {
				console.log("user" + user + "/message" + message);
				_that.$emit("receiveMessage", {
					"from": user,
					"message": message
				});
			});


			getApp().globalData.signalrConnection.on("SendTYMessage", function(user, message) {
				console.log("user" + user + "/message" + message);
				_that.$emit("receiveMessage", {
					"from": user,
					"message": message
				});
				// signalrConnection.invoke("sendMessage", "abc", "efg");
				//sendMessage
			});


			getApp().globalData.signalrConnection.on("GetReturnInfo", function(args) {
				console.log("GetReturnInfo");
			})

			getApp().globalData.signalrConnection.start().then(() => {
					console.log('websocket连接成功！');
				})
				.catch((e) => {
					//在此处写重试逻辑
					console.log('websocket连接失败', e)
				});
			//SetUserInfo


			//this.signalrConnection = signalrConnection;
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import './common/uni.css';

	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 400) {
		body {
			/* overflow-y: scroll; */
			overflow-y: auto;
		}
	}

	/* 顶栏通栏样式 */
	/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

	/* uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	} */

	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}

	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}

	/* #endif */

	page {
		background-color: #efeff4;
		height: 100% !important;
		flex: 10;
		font-size: 28rpx;
		line-height: 1.8;
	}

	.indexPage {
		height: 100%;
		/* overflow: scroll; */
		overflow: auto;
		display: flex;
		/* flex: 10; */
		/* flex-direction: row !important; */
	}

	.indexPage .leftnav {
		width: 25%;
		min-width: 350px;
	}

	.indexPage .rightarea {
		width: 75%;
		height: 100%;
		display: flex;
		flex-direction: column;

	}

	.rightscroll {
		/* overflow: scroll; */
		overflow: auto;
		/* min-height: 600px; */
		height: 100%;
	}

	.lefttitle {
		padding: 15px 0px;
	}

	.login {
		height: 200rpx;
		margin: 400rpx auto;
	}

	.content {
		display: flex;
		height: 100%;
	}

	.row-content {
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: nowrap;
	}

	.col-content {
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: nowrap;
	}

	.col-center {
		justify-content: center;
	}

	.left-content {
		height: 100%;
		width: 35%;
		background-color: #007AFF;
		/* flex-grow:0; */
	}

	.right-content {
		height: 100%;
		background-color: #1AAD19;
		flex-grow: 2;
	}

	.top-content {
		width: 100%;
		flex-grow: 1;
	}

	.center-content {
		width: 100%;
		flex-grow: 9;
	}

	.bottom-content {
		width: 100%;
		flex-grow: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.left-window-content {
		display: flex;
		height: 100%;
	}

	.row-content {
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: nowrap;
	}

	.uni-left-window {
		height: 100%;
	}

	.leftwindow-content {
		height: 100%;

		border-right: 0.5px #d3d3d3 solid;
	}

	.window-col-content {
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: nowrap;
		display: flex;
	}

	.window-col-center {
		justify-content: center;
	}

	.window-left-content {
		height: 100%;
		width: 35%;
		background-color: #007AFF;
		/* flex-grow:0; */
	}

	.window-right-content {
		height: 100%;
		background-color: #1AAD19;
		flex-grow: 2;
	}

	.window-top-content {
		width: 100%;
		/* flex-grow: 1; */
		/* flex:1; */
		border-bottom: 0.5px #808080 solid;
	}

	.window-center-content {
		width: 100%;
		/* flex:8; */
		/* flex-grow: 9 !important; */
		/* overflow-y: scroll; */
		overflow-y: auto;
	}

	.window-bottom-content {
		width: 100%;
		/* flex:1; */
		display: flex;
		flex-direction: row !important;
		flex-direction: row;
		justify-content: space-around;
		line-height: 50px;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.uni-scroll-view>.uni-scroll-view {
		/* overflow: scroll !important; */
		overflow-y: auto !important;
	}

	.emergency-popup-header {
		line-height: 50px;
		text-align: center;
		font-size: 16px;
		border-bottom: 1px lightblue solid;
	}

	.emergency-popup-bottom {
		display: flex;
		flex-direction: row-reverse;
		line-height: 50px;
		border-top: 1px lightblue solid;
	}

	.emergency-popup-bottom .popup-btn {
		font-size: 20px;
		margin: 5px;
	}

	/*每个页面公共css */
</style>
