import requestHelper from './requestHelper.js'

// 轮播图列表
export function getBannerList(data) {
  return requestHelper.get('/banner', data)
}

//  推荐歌单
export function apiGetRecommendSong(data){
	return requestHelper.get('/personalized',data)
}

//  新碟新歌
export function apiGetTopAlbum(data){
	return requestHelper.get('/album/newest',data)
}

// 精选视频
export function apiGetRelatedVideo(data){
	return requestHelper.get('/related/allvideo',data)
}

// 登录接口
export function apiLogin(data){
	return requestHelper.post('/test/login',data)
}