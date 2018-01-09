import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* 使用常量替代 Mutation 事件类型 */
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

const store = new Vuex.Store({
  // 定义状态
  state: {
    user: JSON.parse(sessionStorage.getItem('user')) || {}// 用户信息
  },
  /* mutations更改state并保存到state */
  mutations: {
    /* 登录 */
    // 使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [USER_LOGIN] (state, user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      /* 深度复制对象，保存user信息到state */
      Object.assign(state.user, user)
    },
    /* 登出 */
    [USER_LOGOUT] (state) {
      sessionStorage.removeItem('user')
      /* 删除user */
      Object.keys(state.user).forEach(k => Vue.delete(state.user, k))
    }
  },
  /* actions实际上是提交mutation,可异步 */
  actions: {
    /* 登录 */
    [USER_LOGIN] ({commit}, user) {
      commit(USER_LOGIN, user)
    },
    /* 登出 */
    [USER_LOGOUT] ({commit}) {
      commit(USER_LOGOUT)
    }
  }

})

export default store
