<template>
	<view class="login">
		<uni-forms :value="loginData" ref="form" validateTrigger="bind" errShowType="undertext">
			<uni-forms-item name="Ur_Phone">
				<uni-easyinput type="text" :inputBorder="true" v-model="loginData.Ur_Phone" placeholder="请输入手机号">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="Ur_Pwd">
				<uni-easyinput type="text" :inputBorder="true" v-model="loginData.Ur_Pwd" placeholder="请输入密码">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="reg">
				<button @click="login()">登陆</button>
			</uni-forms-item>
			<navigator @click="reg()">注册</navigator>
		</uni-forms>
	</view>
</template>

<script>
	let dataer = require("./../../common/datas.js");
	export default {
		data() {
			return {
				loginData: {
					name: "",
				}
			}
		},
		onLoad: () => {

		},
		methods: {
			reg: function() {
				uni.navigateTo({
					url: "reg"
				})
			},
			login: function() {				
				let formdata = this.$refs.form.formData;
				let data = {
					Ur_Phone: formdata.Ur_Phone,
					Ur_Pwd: formdata.Ur_Pwd
				}
				let loginSuccess = function(ret) {
					if (ret && ret['status'] == 0) {
						let userData = ret['data'];
						for(var attr in userData){
							dataer.setUr(attr,userData[attr]);
						}
						uni.navigateTo({
							url:"../index/mydata/mydata"
						})
					}
				}
				let loginFail = function(ret) {
					console.log("loginfail");
				}
				dataer.login(data, loginSuccess, loginFail);
				// if (member) {
				// 	uni.navigateTo({
				// 		url: "../index/mydata/mydata"
				// 	})
				// }
			}
		}
	}
</script>

<style>
	.login {

		height: 200rpx;
		margin: 400rpx auto;
	}
</style>
