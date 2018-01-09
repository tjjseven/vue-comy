import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Detail from '@/components/Details'
import Message from '@/components/Message'
import About from '@/components/About'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  saveScrollPosition: true,
  linkExactActiveClass: 'actClass',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true, // 需要被缓存
        auth: false // 不需要登录
      },
      children: [

      ]
    },
    {
      path: '/details',
      name: 'detail',
      component: Detail,
      meta: {
        keepAlive: false, // 不需要被缓存
        auth: false // 不需要登录
      }
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      meta: {
        keepAlive: false, // 不需要被缓存
        auth: true // 需要登录
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        keepAlive: false, // 不需要被缓存
        auth: true // 需要登录
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { path: '*', redirect: '/login' }
  ]
})
