// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import '../static/css/reset.css'//
import  '../static/css/border.css'
import '../static/font/iconfont'
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper, /* { default global options } */);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
