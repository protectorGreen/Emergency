<template>
	<view style="display: none;"></view>
</template>

<script>
	import * as signalR from '../../js_sdk/Lyuan-SignalR/signalr.js';
	// import * as jquery from '../../js_sdk/jquery-1.6.4.js';
	// import * as signalR from '../../js_sdk/jquery.signalR-2.4.2.js';
	//import * as signalR from '../../js_sdk/signlar_new.js';
	//import * as signalR from '../../js_sdk/signalr.js';
	//let jquery = require("@/js_sdk/jquery.js");
	//let jquery = require("@/js_sdk/jquery-1.6.4.js");
	//let jquery = require("@/js_sdk/jquery-1.6.4.test.js");
	//window.jQuery = jquery;
	//let signalR = require("@/js_sdk/jquery.signalR-2.2.0.js");
	//let signalR = require("@/js_sdk/jquery.signalR-2.2.0.test.js");
	let datas = require("@/common/datas.js");
	// import {
	// 	HubConnectionBuilder,
	// 	LogLevel
	// } from '../../js_sdk/Lyuan-SignalR/signalr.js';
	// import {
	// 	HubConnectionBuilder,
	// 	LogLevel
	// } from '../../js_sdk/signalr.js';

	var signalrConnection;
	var proxy;
	export default {
		name: "signalr",
		data() {
			return {

			};
		},
		mounted() {
			this.$nextTick(() => {
				//this.initSignalr();
				this.init();
			})
		},
		methods: {
			init: function() {
				var _that = this;
				if (!signalrConnection) {
					signalrConnection = getApp().globalData.signalrConnection;
				}
				if (signalrConnection) {
					signalrConnection.on("ReceiveMessage", function(user, message) {
						console.log("user" + user + "/message" + message);
						_that.$emit("receiveMessage", {
							"from": user,
							"message": message
						});
						// signalrConnection.invoke("sendMessage", "abc", "efg");
						//sendMessage
					});
				}


				return;

				
				/*
				var username = prompt("Your username");
				// 设置Cookie值
				document.cookie = "username=" + username;
				// 创建连接
				var connection = $.hubConnection();
				connection.url = "http://192.168.1.106:56385/messageHub";
				// 设置查询字符串
				connection.qs = {
					username: "qs" + username
				};
				var connected = false;
				connection.logging = true;
				// 获取代理
				proxy = connection.createHubProxy("MessageService");
				// 设置state的值
				proxy.state.ClientType = "HubNonAutoProxy";
				// 客户端方法
				proxy.on("hello", function(message) {
					var txtResponse = $("#txtResponse")
					var originalResponse = txtResponse.val();
					var totalReponse = originalResponse + message + "\n";
					txtResponse.val(totalReponse);
				});
				// 开启连接
				connection.start({
						transport: ['webSockets', 'longPolling']
					})
					.done(function() {
						connected = true;
					})
					.fail(function() {
						alert("连接失败");
					});

				//发送请求
				$("#btnSend").click(function() {
					// if (!connected) {
					// 	alert("没有开启连接");
					// 	return false;
					// }
					var message = $("#txtMessage").val();
					if (message == "") {
						alert("请输入内容");
						return false;
					}
					proxy.invoke("hello", message);
				});

				return;
				*/
				// chatHub
				if (signalrConnection) {
					return;
				}
				let signurl = datas.envconfig.signsrv + "/chatHub";
				signalrConnection = new signalR.HubConnectionBuilder()
					.withUrl(signurl, {

						// accessTokenFactory: () => {
						//     return 'token';
						// }

						skipNegotiation: true,
						transport: signalR.HttpTransportType.WebSockets

					}).build();
				//.configureLogging(signalR.LogLevel.Trace)
				//.build();

				//接收消息
				signalrConnection.on("ReceiveMessage", function(user, message) {
					console.log("user" + user + "/message" + message);
					_that.$emit("receiveMessage", {
						"from": user,
						"message": message
					});
					// signalrConnection.invoke("sendMessage", "abc", "efg");
					//sendMessage
				});
				//发送消息, 需在链接成功后调用
				//connection.invoke('方法名',参数)
				//链接断开，在此处写重连逻辑
				// signalrConnection.(function() {
				// 	console.log('websocket连接断开');
				// })

				signalrConnection.start().then(() => {
						console.log('websocket连接成功！')
					})
					.catch((e) => {
						//在此处写重试逻辑
						console.log('websocket连接失败', e)
					});
			},

			sendMessage: function(msg) {
				if (!signalrConnection) {
					signalrConnection = getApp().globalData.signalrConnection;
				}
				if (signalrConnection) {
					let user = datas.Ur_Data.Ur_ID;
					let msg_json = JSON.stringify(msg);
					signalrConnection.invoke("SendMessage", user, 'test').catch(function(err) {
						console.error(err.toString());
					});
				}
			}
			// testChat: function() {
			// 	proxy.invoke("hello", 'message');
			// }
		}
	}
</script>

<style>

</style>
