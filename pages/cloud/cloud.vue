<template>
	<view>
		<!-- 导航栏 -->
		<uni-nav-bar>
			<block slot="left">
				<image src="../../static/image/cloud/y_03.png" class="top-img left"></image>
			</block>
			<view class="top-tab flex-box">
				<view :class="{active: curNav == index}" v-for="(item,index) in navList" :key="index"
					@click="changeCurNav(index)">
					<view class="item">
						{{item.name}}
					</view>
				</view>
			</view>
<!-- 测试数据拉 -->
			<!-- #ifdef APP-PLUS || H5 -->
			<block slot="right">
				<image src="../../static/image/mine/r.png" class="top-img"></image>
			</block>
			<!-- #endif -->

			<view class="page-content">
				<MescrollUni :fixed="false" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
					<!-- 上下轮播 -->
					<view class="date-bar flex-box">
						<view class="date-bar-left">
							云村热评墙<text class="iconfont">&#xe605;</text>
							<swiper class="date-bar-swiper" :indicator-dots="false" :autoplay="true" :duration="500"
								:vertical="true">
								<swiper-item v-for="(item,index) in msgList" :key="index">
									{{item.name}}
								</swiper-item>
							</swiper>
						</view>
						<view class="">
							<view class="">
								{{curDate[1]}}
							</view>
							<view class="date-bar-num">
								{{curDate[2]}}
							</view>
						</view>
					</view>
					<!-- 二列视频列表 -->
					<view class="list-content flex-box">
						<view class="video-list flex-box">
							<view class="video-item" v-for="(item,index) in splist.list1" :key="index">
								<view class="video-wrap">
									<image class="img" mode="widthFix" :src="item.coverUrl"></image>
									<view class="video-con">
										<view class="desc">
											{{item.title}}
										</view>
										<view class="creater-bar flex-box">
											<view class=" name">
												{{item.creator[0].userName}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="video-list flex-box">
							<view class="video-item" v-for="(item,index) in splist.list2" :key="index">
								<view class="video-wrap">
									<image class="img" mode="widthFix" :src="item.coverUrl"></image>
									<view class="video-con">
										<view class="desc">
											{{item.title}}
										</view>
										<view class="creater-bar flex-box">
											<view class=" name">
												{{item.creator[0].userName}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</MescrollUni>

			</view>

		</uni-nav-bar>
	</view>
</template>

<script>
	import {
		apiGetRelatedVideo
	} from "../../common/js/index.js"
	import uniaNavBar from "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		components: {
			uniaNavBar,
			MescrollUni
		},
		data() {
			return {
				navList: [{
						name: '广场',
						id: 3452
					},
					{
						name: '动态',
						id: 3462
					},
				],
				curNav: 0, //当前的导航项目
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
				msgList: [{
						name: '他是我见过最年少有为的人',
						id: ''
					},
					{
						name: '因为一个人而失眠，这真的好吗',
						id: ''
					},
					{
						name: '花开花落，没有悲愁怎么是少年？',
						id: ''
					},
				],
				curDate: String(new Date()).split(' '), //当前时间
				allList: [], //所有视频
				splist: {}
			}
		},
		onLoad() {
			this.changeCurNav(0)
		},
		methods: {
			changeCurNav(index) {
				this.curNav = index
				// 获取所有视频的数据
				// 这个地方接口有问题  ，传了7但是对方显示的就是5条数据，不用管
				this.getList(1, 7, res => {
					console.log(res)
					this.allList = res
					this.splitList()
				})
			},
			getList(pageNum, pageSize, successCallback, errCallback) {
				const params = {
					id: this.curNav + 1,
					pageNum,
					pageSize
				}
				apiGetRelatedVideo(params).then(res => {
					successCallback && successCallback(res.data)
				}, err => {
					errCallback && errCallback(res.data)
				})
			},
			// 按照索引拆分 奇偶
			splitList() {
				let i = 0,
					list1 = [], // 左边数据 
					list2 = [] //右边数据
				while (i < this.allList.length) {
					// 奇数
					list1.push(this.allList[i++])
					// 偶数
					if (i < this.allList.length) {
						list2.push(this.allList[i++])
					}
				}
				this.splist = {
					list1,
					list2
				}
			},
			// 下拉刷新回调
			downCallback(mescroll) {
				// console.log('downCallback')
				//重置列表为第一页(自动执行page.num=1，再触发upcallback方法)
				mescroll.resetUpScroll();
			},
			// 上拉加载回调
			upCallback(mescroll) {
				console.log('upCallback')
				this.getList(mescroll.num, mescroll.size, res => {
					//若是第一页 则清空
					if (mescroll.num == 1) {
						this.allList = [];
					}
					//累加数据
					this.allList = this.allList.concat(res);
					this.splitList()
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
	page {
		background: #f8f8f8;
	}

	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifdef H5 */
		top: 44px; // h5 无状态栏
		/* #endif */
	}

	.top-img {
		width: 50rpx;
		height: 40rpx;

		&.left {
			margin-left: 10rpx;
		}
	}

	.top-tab {
		width: 310rpx;
		/* #ifdef MP-WEIXIN */
		width: 250rpx;
		/* #endif */
		margin: 0 auto;
		justify-content: space-between;

		.item {
			font-size: 16px;
			margin-top: 11px;
		}

		.active {
			position: relative;
			color: #f32628;

			&:after {
				position: absolute;
				content: '';
				left: 50%;
				width: 94rpx;
				height: 4rpx;
				bottom: 0rpx;
				transform: translateX(-50%);
				background: #f32628;
				border-radius: 4rpx;
			}
		}
	}

	.date-bar {
		width: 686rpx;
		height: 160rpx;
		padding: 20rpx 34rpx;
		margin: 20rpx auto;
		border-radius: 14rpx;
		color: #fff;
		background: rgba(0, 0, 0, .7);
		line-height: 70rpx;
		font-weight: 600;
		justify-content: space-between;

		.date-bar-left {
			font-size: 34rpx;
			font-weight: 600;
		}

		.date-bar-num {
			margin-top: -20rpx;
			font-size: 44rpx;
		}
	}

	.list-content {
		padding-left: 30rpx;
		flex-direction: row; // 主轴方向设置为水平方向
	}

	.video-list {
		flex-direction: column; // 主轴方向设置为垂直方向
	}

	.video-item {
		width: 334rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 14rpx;
		overflow: hidden;
		color: #353536;
		background: #fff;
		line-height: 36rpx;

		.img {
			display: block;
			width: 100%;
			min-height: 188rpx;
		}

		.avactor {
			width: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
			border-radius: 28rpx;
			background: #ddd;
		}

		.video-con {
			padding: 16rpx 16rpx 30rpx;
		}

		.avactor-box {
			align-items: center;
		}

		.creater-bar {
			margin-top: 10rpx;
			align-items: center;
			color: #999;
			font-size: 20rpx;
		}
	}

	.date-bar-swiper {
		width: 430rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #d0d2d3;
		font-size: 24rpx;
	}
</style>
