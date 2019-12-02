import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"

const UsersRepository = RepositoryFactory.get('users')

// initial state
const state = {
    users: [],
    user: {},
    loaded: false
}

// getters
const getters = {
    users: state => state.users,
    user: state => state.user,

    UsersLoaded: state => state.loaded,
    UserLoaded: state => state.loaded
}

// actions
const actions = {
    getUserById({ commit }, { id }) {
        commit(types.TAGS_LOADED, false)

        UsersRepository.getUserById(id, user => {
            if (_.isEmpty(user)) {
                console.log('empty')
                //  TODO: 404ページに移動
            } else {
                commit(types.STORE_FETCHED_USER, { user })
            }
            commit(types.USERS_LOADED, true)
        })
    }
}

// mutations
const mutations = {
    [types.STORE_FETCHED_USERS](state, { users }) {
        state.users = users
    },

    [types.STORE_FETCHED_USER](state, { user }) {
        state.user = user
    },

    [types.USERS_LOADED](state, val) {
        state.loaded = val
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
