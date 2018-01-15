import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './axios'
import login from './modules/login'
import about from './modules/about'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  modules: {
    login,
    about
  }
})

export default store
