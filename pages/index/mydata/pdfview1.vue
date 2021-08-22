<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav></leftNav>
		</view>
		<scroll-view class="rightscroll">
			<web-view :src="pdfurl"></web-view>
		</scroll-view>
	</view>
</template>

<script>
	import leftNav from "@/components/leftNav/leftNav.vue";
	import topNav from "@/components/topNav/topNav.vue";
	let datas = require("@/common/datas.js");
	export default {
		components: {
			leftNav,
			topNav
		},
		data() {
			return {
				pdfurl: datas.envconfig.localsrv + "/Allen.pdf",
				title: "公文预览",
			}
		},
		onLoad: (option) => {
			// let url = option.pdfurl;
			// this.pdfurl = url;
			// let url = option.pdfurl;
			// this.pdfurl = url;
		},
		methods: {

		}
	}
</script>

<style>

</style>
