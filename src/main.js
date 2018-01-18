// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
// 引入自定义js过滤方法文件
// var myFilter = require('./assets/js/filter.js')
import myFilter from './assets/js/filter.js'
import store from './vuex/store'

/* 引入mint-ui */
import 'mint-ui/lib/style.css'
import { Header, Button, Tabbar, TabItem, Navbar, TabContainer, TabContainerItem, Spinner,
        Actionsheet, MessageBox, Cell, Field, Badge, Popup, Switch, Radio, Indicator } from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Navbar.name, Navbar)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Spinner.name, Spinner)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Badge.name, Badge)
Vue.component(Popup.name, Popup)
Vue.component(Switch.name, Switch)
Vue.component(Radio.name, Radio)

Vue.prototype.myFilter = myFilter
Vue.prototype.$ajax = axios
axios.defaults.baseURL = 'https://www.vue-js.com/api/v1'
// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config) {
  // 处理请求之前的配置
  if (store.state.pubState) {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
  }
  return config
}, function (error) {
  // 请求失败的处理
  return Promise.reject(error)
})

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response) {
  // 处理响应数据
  Indicator.close()
  return response
}, function (error) {
  // 处理响应失败
  return Promise.reject(error)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
router.beforeEach((to, from, next) => {
  var auth = to.meta.auth // 标记是否需要登录
  var isLogin = Boolean(store.state.login.user.token) // true用户已登录， false用户未登录
  if (auth && !isLogin && to.path !== '/login') {
    return next({
      path: '/login',
      query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }
  next()
})
