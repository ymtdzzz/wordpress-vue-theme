import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import MenusRepository from "../../api/Repositoties/MenusRepository"
import _isEmpty from 'lodash/isEmpty'

// initial state
const state = {
	menu: {},
	loaded: false,

	page_menu: {},
	page_menu_loaded: false,

	footer_menu: {},
	footer_menu_loaded: false,
}

// getters
const getters = {
	menus: state => state.menu.items,
	menuLoaded: state => state.loaded,

	pageMenus: state => state.page_menu.items,
	pageMenuLoaded: state => state.page_menu_loaded,

	footerMenus: state => state.footer_menu.items,
	footerMenuLoaded: state => state.footer_menu_loaded,
}

// actions
const actions = {
	getMenuBySlug({ commit }, { slug, type }) {
		if (type === 1) {
			// HEADER_MENU_1
			commit(types.PAGE_MENU_LOADED, false)

			MenusRepository.getMenuBySlug(slug, page_menu => {
				if (_isEmpty(page_menu)) {
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
				if (_isEmpty(menu)) {
					console.log('empty')
					//  TODO: 404ページに移動
				} else {
					commit(types.STORE_FETCHED_MENU, { menu })
				}
				commit(types.MENU_LOADED, true)
			})
		} else if (type === 3) {
			// FOOTER_MENU_1
			commit(types.FOOTER_MENU_LOADED, false)

			MenusRepository.getMenuBySlug(slug, footer_menu => {
				if (_isEmpty(footer_menu)) {
					console.log('empty')
					//  TODO: 404ページに移動
				} else {
					commit(types.STORE_FETCHED_FOOTER_MENU, { footer_menu })
				}
				commit(types.FOOTER_MENU_LOADED, true)
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
	},

	[types.STORE_FETCHED_FOOTER_MENU](state, { footer_menu }) {
		state.footer_menu = footer_menu
	},

	[types.FOOTER_MENU_LOADED](state, val) {
		state.footer_menu_loaded = val
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
