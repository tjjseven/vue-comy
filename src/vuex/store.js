import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './axios'
import login from './modules/login'
import about from './modules/about'
import details from './modules/details'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  modules: {
    login,
    about,
    details
  }
})

export default store
