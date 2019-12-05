import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import MenusRepository from "../../api/Repositoties/MenusRepository"

// initial state
const state = {
	menu: {},
	loaded: false,

	page_menu: {},
	page_menu_loaded: false,
}

// getters
const getters = {
	menus: state => state.menu.items,
	menuLoaded: state => state.loaded,

	pageMenus: state => state.page_menu.items,
	pageMenuLoaded: state => state.page_menu_loaded
}

// actions
const actions = {
	getMenuBySlug({ commit }, { slug, type }) {
		if (type === 1) {
			// HEADER_MENU_1
			commit(types.PAGE_MENU_LOADED, false)

			MenusRepository.getMenuBySlug(slug, page_menu => {
				if (_.isEmpty(page_menu)) {
					console.log('empty')
					//  TODO: 404ページに移動
				} else {
					commit(types.STORE_FETCHED_PAGE_MENU, { page_menu })
				}
				commit(types.PAGE_MENU_LOADED, true)
			})
		} else if (type === 2) {
			// HEADER_MENU_2
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
}

// mutations
const mutations = {
	[types.STORE_FETCHED_MENU](state, { menu }) {
		state.menu = menu
	},

	[types.MENU_LOADED](state, val) {
		state.loaded = val
	},

	[types.STORE_FETCHED_PAGE_MENU](state, { page_menu }) {
		state.page_menu = page_menu
	},

	[types.PAGE_MENU_LOADED](state, val) {
		state.page_menu_loaded = val
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
