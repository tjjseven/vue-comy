import * as types from '../types'
const about = {
  // 定义状态
  state: {
    about: {}// 用户信息
  },
  /* mutations更改state并保存到state */
  mutations: {
    // 使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [types.ABOUT_INFO] (state, about) {
      state.about = about
    }
  }
}
export default about
