import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import _ from 'lodash'
import PagesRepository from "../../api/Repositoties/PagesRepository";

const Pages = RepositoryFactory.get('pages')

// initial state
const state = {
	page: {},
	loaded: false
}

// getters
const getters = {
	pageToShow: state => state.page,
	pageLoaded: state => state.loaded,
}

// actions
const actions = {
	getPageBySlug({ commit }, { slug }) {
		commit(types.PAGE_LOADED, false)

		PagesRepository.getPageBySlug(slug, page => {
			if (_.isNil(page)) {
				console.log('nil')
				//  TODO: 404ページに移動
			} else {
				commit(types.STORE_FETCHED_POST, { page })
			}
			commit(types.PAGE_LOADED, true)
		})
	},
}

// mutations
const mutations = {
	[types.STORE_FETCHED_PAGE](state, { page }) {
		state.page = page
	},

	[types.PAGE_LOADED](state, val) {
		state.loaded = val
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}
