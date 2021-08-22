<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav></leftNav>
		</view>
		<view class="rightarea">
			<topNav :title="title"></topNav>
			<scroll-view class="rightscroll">
				<uni-forms :value="usersData" ref="form" validateTrigger="bind" errShowType="undertext">
					<uni-forms-item name="usersData" label="原密码">
						<uni-easyinput type="text" :inputBorder="true" v-model="usersData.oldpwd" placeholder="请输入原密码">
						</uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="usersData" label="新密码">
						<uni-easyinput type="text" :inputBorder="true" v-model="usersData.newpwd" placeholder="新密码">
						</uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="usersData" label="确认密码">
						<uni-easyinput type="text" :inputBorder="true" v-model="usersData.newpwd" placeholder="确认新密码">
						</uni-easyinput>
					</uni-forms-item>

					<uni-forms-item name="save">
						<button @click="save()">保存</button>
					</uni-forms-item>
				</uni-forms>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	export default {
		components: {
			leftNav,
			topNav
		},
		data() {
			return {
				usersData: {
					userName: "aaaa",
					oldpwd: "",
					newpwd: ""
				},
				title: "修改密码"
			}
		},
		onLoad() {

		},
		methods: {
			save: function() {
				alert("save");
			}
		}
	}
</script>

<style>
</style>
