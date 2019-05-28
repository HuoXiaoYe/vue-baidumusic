// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import qs from 'qs'
import Axios from 'axios'
import './lib/mui/css/mui.min.css'
import './lib/font-awesome-4.7.0/css/font-awesome.min.css'
/* import mintUi from 'mint-ui'

Vue.use(mintUi) */

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)


import {
	Swipe,
	SwipeItem
} from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import elementUi from 'element-ui';
Vue.use(elementUi);
/* Vue.prototype.$loading = Loading.service; */



Vue.config.productionTip = false

Vue.prototype.$axios = Axios;
Vue.prototype.HOST = '/api';
/* Vue.prototype.HOST = '/api'; */

/* eslint-disable no-new */

// 添加请求拦截器
Axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	if (config.method == 'post') {
		config.data = qs.stringify(config.data)
	}
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function(response) {
	// 对响应数据做点什么
	return response;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
