<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav></leftNav>
		</view>
		<view class="rightarea" style="display: flex;flex-direction: column;">			
			<scroll-view class="rightscroll">
				<topNav :title="title"></topNav>
				<uni-forms :value="usersData" ref="mydataform" validateTrigger="bind" errShowType="undertext">
					<uni-group>
						<uni-forms-item name="Ur_Name">
							<uni-easyinput type="text" :inputBorder="true" v-model="usersData.Ur_Name" placeholder="请输入用户名">
							</uni-easyinput>
						</uni-forms-item>
						<uni-forms-item name="sign">
							<image :src="sign" ref="signimage" mode="widthFix"></image>
						</uni-forms-item>
						<uni-forms-item name="open">
							<button type="primary" @tap="open">签名</button>
						</uni-forms-item>
						<uni-forms-item name="savesign">
							<catSignature canvasId="canvas1" @close="close" @save="savesign" :visible="isShow" />
						</uni-forms-item>
						<uni-forms-item name="save">
							<button @click="save">保存</button>
						</uni-forms-item>
					</uni-group>
				</uni-forms>
			</scroll-view>
		</view>
	</view>
</template>


<!-- userdata Ur_ID
Ur_Phone
Ur_Name
Ur_Pwd
Ur_Sign
Ur_Photo
IsDel
Remark
 -->

<script>
	import catSignature from "@/components/cat-signature/cat-signature.vue";
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	//let dataer = require("./../../../common/datas.js")
	let dataer = require("@/common/datas.js");
	export default {
		components: {
			catSignature,
			leftNav,
			topNav
		},
		data() {
			let Ur_Name = dataer.Ur_Data['Ur_Name'];
			let Ur_Sign = dataer.Ur_Data.Ur_Sign;
			return {
				usersData: {
					// Ur_ID:
					// Ur_Phone
					// Ur_Name
					// Ur_Pwd
					// Ur_Sign
					// Ur_Photo
					// IsDel
					// Remark
					//userName: "aaaa"
					Ur_Name: Ur_Name,
					sign: Ur_Sign
				},
				sign: Ur_Sign,
				isShow: false,
				title:"用户信息",
				//headQuarters:[]
			}
		},
		onLoad() {
			let Ur_ID = dataer.Ur_Data['Ur_ID'];
			if (!Ur_ID) {
				uni.reLaunch({
					url: "../../login/login"
				})
			}
		},
		methods: {
			save: function() {
				let formdata = this.$refs.mydataform.formData;
				//let signImage = this.$refs.signimage;
				var ur_sign_blob = this.base64toBlob(this.sign);
				let Ur_ID = 3; //dataer.Ur_Data['Ur_ID'];
				let paramData = {
					ur_ID: Ur_ID,
					ur_Name: formdata.Ur_Name,
					ur_Sign: this.sign
				};
				let successFunc = (ret) => {
					if (ret && ret['status'] == 0) {
						uni.showModal({
							title: "保存成功",
							success: () => {

							}
						})
					}
				};
				let failFunc = () => {
					console.log("saveur---error");
				}
				dataer.saveUr(paramData, successFunc, failFunc);
			},
			close: function() {
				this.isShow = false;
			},
			open: function() {
				this.isShow = true;
			},
			savesign: function(val) {
				this.sign = val;
				this.isShow = false;
			},
			base64toBlob: function(base64Data, contentType) {
				contentType = contentType || '';
				var sliceSize = 1024;
				var byteCharacters = atob(base64Data);
				var bytesLength = byteCharacters.length;
				var slicesCount = Math.ceil(bytesLength / sliceSize);
				var byteArrays = new Array(slicesCount);
				for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
					var begin = sliceIndex * sliceSize;
					var end = Math.min(begin + sliceSize, bytesLength);
					var bytes = new Array(end - begin);
					for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
						bytes[i] = byteCharacters[offset].charCodeAt(0);
					}
					byteArrays[sliceIndex] = new Uint8Array(bytes);
				}
				return new Blob(byteArrays, {
					type: contentType
				});
			}
		}
	}
</script>

<style>

</style>
