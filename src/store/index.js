import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as actions from './actions'
import * as getters from './getters'
import post from './modules/post'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    post,
  },
  strict: debug,
  plugins: [createPersistedState()]
})
