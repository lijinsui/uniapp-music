// import $store from '../../store/index.js';

export default {
	//全局配置
	baseUrl: "http://localhost:3000",
	//请求返回Promise对象
	request(url, options, showLoading = false, contentType = 1) {
		//请求
		let requeUrl = this.baseUrl + url
		return new Promise((resolve, reject) => {
			// 发起请求
			uni.request({
				url: requeUrl,
				method: options.method,
				timeout: 20000,
				data: options.data, // JSON.stringify(options.data)
				header: {
					'Content-Type': contentType === 1 ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded',
					// "Authorization": token?token:'',
				},
				success: (res) => {
					if (res.statusCode === 200) {
						resolve(res.data)
					} else if (res.staticCode === 401) {
						uni.showToast({
							icon: "none",
							title: "未登录或登录状态已超时",
							duration: 1500
						})
					} else if (res.staticCode === 405) {
						uni.showToast({
							icon: "none",
							title: "请求方法错误",  
							duration: 1500
						})
					} else {
						uni.showToast({
							icon: "none",
							title: "请求错误" + res.staticCode,
							duration: 1500
						})
					}
				},
				fail: (error) => {
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return reject(error)
				}

			})
		})
	},
	// get请求
	get(url, data = {}) {
		return this.request(url, {
			method: 'GET',
			data: data
		})
	},

	// post请求
	post(url, data = {}) {
		return this.request(url,{
			method: 'POST',
			data: data
		})
	},
	
	// put请求
	put(url, data = {}) {
		return this.request(url,{
			method: 'PUT',
			data: data
		})
	},
	// delete请求
	delete(url, data = {}) {
		return this.request(url,{
			method: 'DELETE',
			data: data
		})
	},
}
