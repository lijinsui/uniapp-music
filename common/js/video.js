import requestHelper from './requestHelper.js'

// 导航栏
export function apiGetNavList(data) {
  return requestHelper.get('/videomock', data)
}