import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import * as actions from './axios'
// import * as mutations from './mutations'
import login from './modules/login'
import about from './modules/about'
import detail from './modules/details'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pubState: false
  },
  mutations: {
    [types.LOADING] (state, loading) {
      state.pubState = loading
    }
  },
  // mutations,
  actions,
  modules: {
    login,
    about,
    detail
  }
})
export default store
