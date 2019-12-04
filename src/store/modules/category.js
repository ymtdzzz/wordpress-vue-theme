import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import CategoriesRepository from "../../api/Repositoties/CategoriesRepository"

// initial state
const state = {
    category_id: 0,
    loaded: false
}

// getters
const getters = {
    categoryId: state => state.category_id,

    categoryLoaded: state => state.loaded
}

// actions
const actions = {
    getCategoryIdBySlug({ commit }, { slug }) {
        commit(types.CATEGORY_LOADED, false)

        CategoriesRepository.getCategoryIdBySlug(slug, category_id => {
            if (_.isNil(category_id)) {
                console.log('nil')
                //  TODO: 404ページに移動
            } else {
                commit(types.STORE_FETCHED_CATEGORY_ID, category_id)
            }
            commit(types.CATEGORY_LOADED, true)
        })
    }
}

// mutations
const mutations = {
    [types.STORE_FETCHED_CATEGORY_ID](state, category_id) {
        state.category_id = category_id
    },

    [types.CATEGORY_LOADED](state, val) {
        state.loaded = val
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
