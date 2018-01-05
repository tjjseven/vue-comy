import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Detail from '@/components/Details'
import Message from '@/components/Message'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'actClass',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [

      ]
    },
    {
      path: '/details',
      name: 'detail',
      component: Detail
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
