<template>
	<view class="video">
		<view class="topbar">
			<scroll-view class="scroll-view" scroll-x="true" :show-scrollbar="false">
				<view class="rel">
					<view class="item" v-for="(item,index) in navList" :key="index" :class="{active:curNav==item.id}" @click="switchNav(item.id,index)">
						<view cla ss="desc">
							{{item.name}}
						</view>
					</view>
					<!-- 下划线 -->
					<view class="slide" :style="'width:'+sliderWidth+'rpx;transform:translateX('+sliderOffset+'rpx)'">

					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 列表视频 -->
		<MescrollUni :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
			<view class="video-list">
				<view class="video-item" v-for="(item,index) in relatedVideo ">
					<view class="video-wrap">
						<image :src="item.coverUrl" mode="" class="img"></image>
						<view class="desc ellipsis">
							{{item.title}}
						</view>
						<view class="creater-bar flex-box">
							<view class="name">
								{{item.creator[0].userName}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</MescrollUni>
	</view>
</template>

<script>
	import {
		apiGetNavList
	} from "../../common/js/video.js"
	import {
		apiGetRelatedVideo
	} from "../../common/js/index.js"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				navList: [{
					id: 32154,
					name: "推荐"
				}, {
					id: 2,
					name: "LOCK直播"
				}, {
					id: 3,
					name: "翻唱"
				}, {
					id: 4,
					name: "广播"
				}, {
					id: 5,
					name: "舞蹈"
				}, {
					id: 6,
					name: "游戏"
				}, {
					id: 7,
					name: "现场"
				}, ],
				curNav: 32154,
				sliderWidth: 60, // 导航默认宽度
				sliderOffset: 32, // 偏移量
				downOption: { //下拉刷新
					auto: true
				},
				upOption: { //上拉加载下一页的数据
					auto: true,
					page: {
						num: 0,
						size: 10
					}
				},
				relatedVideo: [] // 视频列表数据
			}
		},
		onLoad() {
			console.log("load")
			// this.getNavList()
			this.switchNav(this.curNav, 0);
		},
		onShow() {

		},
		onHide() {

		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			// 接口有问题，自定义了数组
			// getNavList() {
			// 	apiGetNavList({
			// 		id: 124
			// 	}).then(data => {
			// 		console.log(data)
			// 	})
			// },
			// 导航栏切换
			switchNav(e, index) {
				this.curNav = e
				//  导航栏的宽度 140 是第一项的宽度”LOCK直播“
				this.sliderWidth = index === 1 ? 140 : 60
				// 计算偏移量  32左边 + 文字60 + 间距32=126   
				this.sliderOffset = 124 * index + (index > 1 ? 80 : 20)
				this.getList(1, 5, data => {
					this.relatedVideo = data
				})
			},
			getList(pageNum, pageSize, successCallback, errCallback) {
				const params = {
					id: this.curNav,
					pageNum,
					pageSize
				}
				apiGetRelatedVideo(params).then(data => {
					successCallback && successCallback(data.data)
				})
			},
			downCallback(mescroll) {
				// console.log('downCallback')
				//重置列表为第一页(自动执行page.num=1，再触发upcallback方法)
				mescroll.resetUpScroll();
			},
			upCallback(mescroll) {
				// console.log('upCallback')
				this.getList(mescroll.num, mescroll.size, res => {
					//若是第一页 则清空
					if (mescroll.num == 1) {
						this.relatedVideo = [];
					}
					//累加数据
					this.relatedVideo = this.relatedVideo.concat(res);
					//成功的回调，隐藏刷新状态
					mescroll.endSuccess();
				}, () => {
					//失败的回调，隐藏下拉刷新状态
					mescroll.endErr();
				})
			}
		}

	}
</script>

<style lang="scss">
	.topbar {
		.h86 {
			height: 86rpx;
		}
	}

	.scroll-view {
		position: fixed;
		top: 0;
		width: 100%;
		height: 86rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 86rpx;
		color: #333;
		font-weight: 600;
		border-bottom: 1rpx solid #e6e6e6;
		z-index: 10;
		background: #fff;

		.item {
			position: relative;
			display: inline-block;
			min-width: 126rpx;
			height: 86rpx;
			line-height: 86rpx;
			padding: 0 20rpx;

			&.active {
				color: #f32628;
			}
		}
	}

	.slide {
		position: absolute;
		width: 60rpx;
		height: 4rpx;
		left: 0;
		bottom: 0rpx;
		background: #f32628;
		transition: transform 0.3s;
		z-index: 2;
		/* #ifdef MP-WEIXIN */
		bottom: 2rpx;
		/* #endif */
	}

	.video-list {
		color: #333;
		background: #f8f8f8;
		
		.tit-bar {
			padding-left: 32rpx;
		}

		.video-item {
			padding-top: 32rpx;
			background: #fff;
			border-bottom: 24rpx solid #f8f8f8;
		}

		.video-wrap {
			width: 686rpx;
			margin: 0 auto;
		}

		.img {
			display: block;
			width: 686rpx;
			height: 390rpx;
			border-radius: 10rpx;
			background: #eee;
		}

		.desc {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 84rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}
	}

	.creater-bar {
		height: 100rpx;
		justify-content: space-between;
		align-items: center;

		.avactor-box {
			align-items: center;
		}

		.avactor {
			width: 66rpx;
			height: 66rpx;
			margin-right: 10rpx;
			border-radius: 66rpx;
			background: #eee;
		}

		.name {
			line-height: 100rpx;
		}
	}
</style>
