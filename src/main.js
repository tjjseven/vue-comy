// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/* 引入mint-ui */
import { Header, Button, Tabbar, TabItem, Navbar, TabContainer, TabContainerItem, Spinner } from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Navbar.name, Navbar)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Spinner.name, Spinner)

Vue.prototype.$ajax = axios
axios.defaults.baseURL = 'https://www.vue-js.com/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
router.beforeEach((to, from, next) => {
  console.log(to.path)
  next()
})
