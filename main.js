import Vue from 'vue'
import App from './App'
import requestHelper from 'common/js/requestHelper.js'
import store from './store/index.js'

Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.requestHelper = requestHelper

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
