import * as types from "../mutation-types"

// initial state
const state = {
	bread_crumbs: [],
	show_bread_crumbs: true,
}

// getters
const getters = {
	breadCrumbs: state => state.bread_crumbs,
	showBreadCrumbs: state => state.show_bread_crumbs
}

// actions
const actions = {
	updateBreadCrumbs({ commit }, { breadCrumbs }) {
		commit(types.STORE_BREAD_CRUMBS, breadCrumbs)
		commit(types.SHOW_BREAD_CRUMBS, location.pathname !== '/')
	},
}

// mutations
const mutations = {
	[types.STORE_BREAD_CRUMBS](state, bread_crumbs) {
		state.bread_crumbs = bread_crumbs
	},

	[types.SHOW_BREAD_CRUMBS](state, val) {
		state.show_bread_crumbs = val
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
