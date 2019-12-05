import * as types from "../mutation-types"

// initial state
const state = {
	bread_crumbs: [],
}

// getters
const getters = {
	breadCrumbs: state => state.bread_crumbs
}

// actions
const actions = {
	updateBreadCrumbs({ commit }, { breadCrumbs }) {
		commit(types.STORE_BREAD_CRUMBS, breadCrumbs)
	}
}

// mutations
const mutations = {
	[types.STORE_BREAD_CRUMBS](state, bread_crumbs) {
		state.bread_crumbs = bread_crumbs
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}
