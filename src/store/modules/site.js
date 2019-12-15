import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import _isNil from 'lodash/isNil'

const SiteRepository = RepositoryFactory.get('site')

// initial state
const state = {
    siteinfo: {},
    loaded: false
}

// getters
const getters = {
    siteInfo: state => state.siteinfo,
    siteLoaded: state => state.loaded,
}

// actions
const actions = {
    getSiteInfo({ commit }) {
        commit(types.SITE_INFO_LOADED, false)

        SiteRepository.getSiteInfo(siteinfo => {
            if (_isNil(siteinfo)) {
                console.log('nil')
                //  TODO: 404ページに移動
            } else {
                commit(types.STORE_FETCHED_SITE_INFO, { siteinfo })
            }
            commit(types.SITE_INFO_LOADED, true)
        })
    },
}

// mutations
const mutations = {
    [types.STORE_FETCHED_SITE_INFO](state, { siteinfo }) {
        state.siteinfo = siteinfo
    },

    [types.SITE_INFO_LOADED](state, val) {
        state.loaded = val
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
