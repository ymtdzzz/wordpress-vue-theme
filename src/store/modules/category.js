import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import CategoriesRepository from "../../api/Repositoties/CategoriesRepository"
import _isNil from 'lodash/isNil'

// initial state
const state = {
    category: {},
    loaded: false
}

// getters
const getters = {
    category: state => state.category,

    categoryLoaded: state => state.loaded
}

// actions
const actions = {
    getCategoryBySlug({ commit }, { slug }) {
        commit(types.POSTS_LOADED, false)
        commit(types.CATEGORY_LOADED, false)

        CategoriesRepository.getCategoryBySlug(slug, category => {
            if (_isNil(category)) {
                console.log('nil')
                //  TODO: 404ページに移動
            } else {
                commit(types.STORE_FETCHED_CATEGORY, category)
            }
            commit(types.CATEGORY_LOADED, true)
        })
    }
}

// mutations
const mutations = {
    [types.STORE_FETCHED_CATEGORY](state, category) {
        state.category = category
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
