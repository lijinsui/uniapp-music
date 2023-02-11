<template>
	<view class="login-form">
		<input type="text" class="input-row" v-model="account" maxlength="11" placeholder="请输入账号" />
		<input type="password" class="input-row" v-model="password" maxlength="11" placeholder="请输入密码" />
		<button type="bytton" class="btn login-btn" @click="login">登录</button>
		<view class="bot flex-box">
			<navigator class="sign" hover-class="none">立即注册</navigator>
			<navigator class="forget" hover-class="none">忘记密码?</navigator>
		</view>
	</view>
</template>

<script>
	import {apiLogin} from "../../../common/js/index.js"
	export default {
		data() {
			return {
				account: '',
				password: ''
			}
		},
		methods:{
			login(){
				if(!this.account){
					uni.showModal({
						content:"请输入账号！",
						showCancel:false
					})
					
				}
				if(!this.password){
					uni.showModal({
						content:"请输入密码！",
						showCancel:false
					})
				}
					
				// 去掉字段值左右的空格
				const account = this.account.trim()
				const password = this.password.trim()
				
				// 检查完毕，登录中
				uni.showLoading({
					title:'登录中---'
				})
				// 调用接口
				const params= {
					account,
					password
				}
				apiLogin(params).then(res=>{
					console.log()
				})
			}
		}
	}
</script>

<style lang="scss">
	.input-row {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid #E04B28;
		color: #6c6c6c;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
	}

	.login-form {
		padding-top: 220rpx;
	}

	.login-btn {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid #E04B28;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
		color: #fff;
		background: #E04B28;
	}

	.bot {
		width: 600rpx;
		padding: 0 17rpx;
		font-size: 26rpx;
		margin: 0 auto;
		justify-content: space-between;
	}

	.sign {
		color: #E04B28;
	}

	.auth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		bottom: 100rpx;
		left: 0;
		width: 100%;

		.auth-image {
			width: 50px;
			height: 50px;
			border: 1px solid #dddddd;
			border-radius: 50px;
			margin: 0 20px;
			background-color: #ffffff;
			overflow: hidden;
		}

		.img {
			width: 30px;
			height: 30px;
			margin: 10px;
		}

		input {
			outline: none;
			border: none;
			list-style: none;
		}
	}

	.log-btn {
		margin: 0;
		padding: 0;
		background: #fff !important;
		height: 48px;

		&::after {
			background-color: transparent;
			margin: 0;
			padding: 0;
			border: 0;
		}
	}
</style>
