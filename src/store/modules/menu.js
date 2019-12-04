import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import MenusRepository from "../../api/Repositoties/MenusRepository"

// initial state
const state = {
	menu: {},
	loaded: false
}

// getters
const getters = {
	menu: state => state.menu,
	MenuLoaded: state => state.loaded
}

// actions
const actions = {
	getMenuBySlug({ commit }, { slug }) {
		commit(types.MENU_LOADED, false)


		MenusRepository.getMenuBySlug(slug, menu => {
			if (_.isEmpty(menu)) {
				console.log('empty')
				//  TODO: 404ページに移動
			} else {
				commit(types.STORE_FETCHED_MENU, { menu })
			}
			commit(types.MENU_LOADED, true)
		})
	}
}

// mutations
const mutations = {
	[types.STORE_FETCHED_MENU](state, { menu }) {
		state.menu = menu
	},

	[types.MENU_LOADED](state, val) {
		state.loaded = val
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
