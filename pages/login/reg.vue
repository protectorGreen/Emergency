<template>
	<view class="login">
		<uni-forms :value="loginData" ref="form" validateTrigger="bind" errShowType="undertext">
			<uni-forms-item name="Ur_Phone">
				<uni-easyinput type="text" :inputBorder="true" v-model="loginData.Ur_Phone" placeholder="请输入手机号">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="Ur_Name">
				<uni-easyinput type="text" :inputBorder="true" v-model="loginData.Ur_Name" placeholder="请输入名字">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="Ur_Pwd">
				<uni-easyinput type="text" :inputBorder="true" v-model="loginData.Ur_Pwd" placeholder="请输入密码">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="reg">
				<button @click="reg">注册</button>
			</uni-forms-item>
			<navigator @click="login()">登陆</navigator>
		</uni-forms>
	</view>
</template>
<script>
	var dataer = require("@/common/datas.js");
	export default {
		data() {
			return {
				loginData: {}
			}
		},
		methods: {
			login: function() {
				uni.navigateTo({
					url: "login"
				})
			},
			reg: function() {
				let formdata = this.$refs.form.formData
				let phone_int = parseInt(formdata.Ur_Phone);
				if (phone_int) {
					let paramData = {
						ur_Phone: phone_int,
						ur_Pwd: formdata.Ur_Pwd,
						Ur_Name:formdata.Ur_Name,
						ur_ID: 0,
					};
					let regSuccess = function(ret) {
						if (ret && ret['status'] == 0) {
							uni.showToast({
								title: "注册成功",
								duration: 2000000,
								success: () => {
									uni.navigateTo({
										url: "login"
									})
								}
							})
						}
					};
					let regFail = function(ret) {

					};
					dataer.reg(paramData, regSuccess, regFail);
				} else {
					console.log("phone");
				}
			}
		}
	}
</script>

<style>

</style>
