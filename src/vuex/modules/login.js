import Vue from 'vue'
import * as types from '../types'
const login = {
  // 定义状态
  state: {
    user: JSON.parse(sessionStorage.getItem('user')) || {}// 用户信息
  },
  /* mutations更改state并保存到state */
  mutations: {
    /* 登录 */
    // 使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [types.USER_LOGIN] (state, user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      /* 深度复制对象，保存user信息到state */
      Object.assign(state.user, user)
    },
    /* 登出 */
    [types.USER_LOGOUT] (state) {
      sessionStorage.removeItem('user')
      /* 删除user */
      Object.keys(state.user).forEach(k => Vue.delete(state.user, k))
    }
  },
  /* actions实际上是提交mutation,可异步 */
  actions: {
    /* 登录 */
    [types.USER_LOGIN] ({commit}, user) {
      commit(types.USER_LOGIN, user)
    },
    /* 登出 */
    [types.USER_LOGOUT] ({commit}) {
      commit(types.USER_LOGOUT)
    }
  }
}
export default login
