<template>
	<view>
		<!-- 导航栏 -->
		<uni-nav-bar>
			<block slot="left">
				<image src="../../static/image/account/a16.png" mode="widthFix" class="top-img left"></image>
			</block>
			<view class="tac">
				账号
			</view>
			<block slot="right">
				<image src="../../static/image/mine/r.png" mode="widthFix" class="top-img left"></image>
			</block>
		</uni-nav-bar>
		<!-- 滚动列表 -->
		<scroll-view scroll-y="true" class="page-content">
			<!-- 未登录 -->
			<view v-if="!userInfo.hasLogin" class="empty-user">
				<view class="">
					尽享海量音乐
				</view>
				<navigator class="btn" url="../subpages/login/login">立即登录{{userInfo.hasLogin}}</navigator>
			</view>
			<!-- 已登录 -->
			<template  v-if="userInfo.hasLogin"  class="">
				显示已登录用户的头像信息等
			</template>
			<!-- 广告位值 -->
			<view class="ad-bar" :class="{bgf: !userInfo.hasLogin}">
				<image src="../../static/image/account/a_07.png" mode="widthFix" class="img"></image>
			</view>
			<!-- 商城列表 -->
			<view class="mall-bar flex-box">
				<view class="flex-item">
					<image src="../../static/image/account/a_m1.png" mode="widthFix" class="icon"></image>
					消息
				</view>
				<view class="flex-item">
					<image src="../../static/image/account/a_m2.png" mode="widthFix" class="icon"></image>
					商城
					<view class="txt">9.9元包月</view>
				</view>
				<view class="flex-item">
					<image src="../../static/image/account/a_m3.png" mode="widthFix" class="icon"></image>
					演出
					<view class="txt">天鹅湖</view>
				</view>
				<view class="flex-item">
					<image src="../../static/image/account/a_m4.png" mode="widthFix" class="icon"></image>
					个性换肤
				</view>
			</view>
			<!-- uni列表 -->
			<uniList>
				<uni-list-item title="口袋彩铃" thumb="/static/image/account/a_16.png" size="mini"></uni-list-item>
				<uni-list-item title="我的订单" thumb="/static/image/account/a_19.png" size='mini'></uni-list-item>
				<uni-list-item title="创作者中心" thumb="/static/image/account/a_09.png" size='mini'></uni-list-item>
				<uni-list-item title="设置" thumb="/static/image/account/a_21.png" size='mini'></uni-list-item>
				<uni-list-item title="夜间模式" thumb="/static/image/account/a_23.png" size='mini'></uni-list-item>
				<uni-list-item title="定时开关" thumb="/static/image/account/13.png" size='mini'  :showSwitch="true" @switchChange="switchChange"/>
				<uni-list-item title="音乐闹钟" thumb="/static/image/account/13.png" size='mini'></uni-list-item>
				<uni-list-item title="在线听歌" thumb="/static/image/account/14.png" size='mini'></uni-list-item>
				<uni-list-item title="优惠卷" thumb="/static/image/account/15.png" size='mini'></uni-list-item>
				<uni-list-item title="分享音乐" thumb="/static/image/account/16.png" size='mini'></uni-list-item>
				<uni-list-item title="关于" thumb="/static/image/account/17.png" size='mini'></uni-list-item>
			</uniList>
			<!-- 退出登录 -->
			<view class="logout " v-if="userInfo.hasLogin">
				退出登录
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import uniNavBar from "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	import uniList from "../../components/uni-list/uni-list.vue"
	export default {
		components:{
			uniList,
			uniNavBar,
			uniListItem
		},
		computed:{
			...mapState(['userInfo'])
		},
		data() {
			return {
				
			}
		},
		onShow() {
		},
		methods: {
			switchChange(e){
				console.log(e)
				uni.showToast({
					title: "value:"+e.value,
					icon: "none"
				})
			}
		}
	}
</script>
<style lang="scss">
	page {
		color: #333;
		
	}
	.scan-box{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,.8);
		transform: translateX(100%);
		transition: transform 0.05s;
		&.active{
			transform: translateX(0)
		}
	}
	.tac{
		flex:1;
		text-align: center;
	}
	.top-img {
		width: 50rpx;
		height: 40rpx;
		&.left {
			margin-left: 10rpx;
		}
	}
	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifdef H5 */
		top:44px;  // h5 无状态栏
		bottom: 100rpx;
		/* #endif */
		background: #f8f8f8;
	}
	.mt16 {
		margin-top: 16rpx;
	}

	.bgf {
		background: #fff;
	}

	.empty-user {
		background: #fff;
		padding-top: 40rpx;
		text-align: center;
		line-height: 50rpx;

		.btn {
			width: 710rpx;
			height: 80rpx;
			margin: 22rpx auto 0;
			text-align: center;
			line-height: 80rpx;
			border: 2rpx solid #cdcdcd;
			border-radius: 80rpx;
			font-size: 32rpx;
		}
	}

	.userinfo-box {
		padding-top: 46rpx;

		.avator {
			width: 120rpx;
			height: 120rpx;
			margin: 0 32rpx;
			border-radius: 120rpx;
			color: #fff;
			background: #d6d8da;
			overflow: hidden;
		}

		.img {
			width: 100%;
			height: 100%;
		}

		.name {
			color: #302f30;
			line-height: 68rpx;
			font-weight: 600;
		}

		.sign {
			width: 128rpx;
			height: 52rpx;
			margin-top: 16rpx;
			margin-right: 32rpx;
			border-radius: 52rpx;
		}

		.level {
			width: 100rpx;
			height: 50rpx;
			text-align: center;
			line-height: 50rpx;
			border-radius: 50rpx;
			color: #838080;
			background: #d7d3d4;
			transform: scale(0.8);
		}
	}

	.nav-bar {
		margin-top: 38rpx;
		text-align: center;
		font-weight: 600;

		.flex-item {
			height: 80rpx;
			border-right: 1rpx solid #cdcacb;

			&:last-child {
				border: 0;
			}
		}

		.txt {
			color: #939293;
			font-weight: 400;
		}
	}

	.ad-bar {
		padding-top: 32rpx;

		.img {
			display: block;
			width: 686rpx;
			height: 120rpx;
			margin: 0 auto;
		}
	}

	.mall-bar {
		padding-top: 38rpx;
		padding-bottom: 20rpx;
		text-align: center;
		font-weight: 600;
		font-size: 26rpx;
		background: #fff;
		line-height: 35rpx;

		.icon {
			display: block;
			width: 48rpx;
			height: 48rpx;
			margin: 0 auto 24rpx;
		}

		.txt {
			color: #999;
			font-weight: 400;
			font-size: 24rpx;
			transform: scale(0.84);
		}
	}

	.line-item {

		.icon {
			float: left;
			width: 35rpx;
			height: 32rpx;
			margin-top: 30rpx;
			margin-right: 36rpx;
		}
	}

	.logout {
		height: 100rpx;
		margin-top: 16rpx;
		text-align: center;
		line-height: 100rpx;
		color: #333;
		background: #fff;
	}
</style>
