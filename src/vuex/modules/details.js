import * as types from '../types'
// import login from './login'
const details = {
  // 定义状态
  state: {
    detail: {}// 详情信息
  },
  /* mutations更改state并保存到state */
  mutations: {
    // 使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [types.DETAILS] (state, details) {
      state.detail = details
    }
  },
  getters: {
    // isUp: (state) => (id) => {
    //   if (id.indexOf(login.state.user.id) !== -1) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  }
}
export default details
