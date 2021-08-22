<template>
	<view class="indexPage">
		<view class="leftnav">
			<leftNav></leftNav>
		</view>
		<view class="rightarea">
			<topNav :title="title"></topNav>
			<scroll-view class="rightscroll">
				<uni-collapse>
					<uni-collapse-item title="标题文字"
						thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
						<uni-easyinput placeholder="测试"></uni-easyinput>
						<uni-easyinput placeholder="测试"></uni-easyinput>
						<uni-easyinput placeholder="测试"></uni-easyinput>
					</uni-collapse-item>
					<uni-collapse-item title="标题文字"
						thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
						<text class="content">折叠内容主体，可自定义内容及样式</text>
					</uni-collapse-item>
				</uni-collapse>

				<view v-for="(item, index) in list" :key="index">
					<!-- <uni-section :title="item.name" type="line"></uni-section> -->
					<uni-collapse ref="add" class="warp" @change="change">
						<uni-collapse-item v-for="(sub, key) in item.data" :key="key" :open="sub.open"
							:show-animation="sub.showAnimation" :disabled="sub.disabled" :title="sub.subName">
							<text class="content">{{ sub.content }}</text>
						</uni-collapse-item>
					</uni-collapse>
				</view>
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
			const listData = [{
					name: '基础用法',
					data: [{
							type: false,
							subName: '默认开启',
							open: true,
							content: '折叠内容主体，可自定义内容及样式'
						},
						{
							type: false,
							subName: '折叠内容',
							content: '折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开，才能看到这段问题。再次点击标题，折叠内容。'
						},
						{
							type: false,
							subName: '禁用状态',
							disabled: true,
							content: '折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开，才能看到这段问题。再次点击标题，折叠内容。'
						}
					]
				},
				{
					name: '添加动画效果',
					data: [{
						type: true,
						subName: '动画效果',
						showAnimation: true,
						content: '折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开，才能看到这段问题。再次点击标题，折叠内容。'
					}]
				}
			]
			return {
				title: "公文发送",
				list: listData,
				formData: {},
			}
		},
		methods: {
			change(e) {}
		}
	}
</script>

<style>

</style>
