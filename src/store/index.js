import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as actions from './actions'
import * as getters from './getters'
import post from './modules/post'
import tag from './modules/tag'
import user from './modules/user'
import menu from './modules/menu'
import category from "./modules/category"
import common from './modules/common'
import page from './modules/page'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    post,
    tag,
    user,
    menu,
    category,
    common,
	  page,
  },
  strict: debug,
  plugins: [createPersistedState()]
})
