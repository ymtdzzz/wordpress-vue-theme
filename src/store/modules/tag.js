import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import TagsRepository from "../../api/Repositoties/TagsRepository";

const PostsRepository = RepositoryFactory.get('tags')

// initial state
const state = {
    tags: [],
    tag: {},
    loaded: false
}

// getters
const getters = {
    tags: state => state.tags,
    tag: state => state.tag,

    TagsLoaded: state => state.loaded,
    TagLoaded: state => state.loaded
}

// actions
const actions = {
    // getPosts({ commit }, { limit }) {
    //     commit(types.POSTS_LOADED, false)
    //
    //     PostsRepository.getPosts(limit, posts => {
    //         // 取得した投稿のフルパスを取得
    //         posts.map((post, i) => {
    //             posts[i] = createPostSlug(post)
    //         })
    //
    //         commit(types.STORE_FETCHED_POSTS, { posts })
    //         commit(types.POSTS_LOADED, true)
    //     })
    // },
    getTagBySlug({ commit }, { slug }) {
        commit(types.POSTS_LOADED, false)
        commit(types.TAGS_LOADED, false)

            TagsRepository.getTagBySlug(slug, tag => {
            if (_.isEmpty(tag)) {
                console.log('empty')
                //  TODO: 404ページに移動
            } else {
                commit(types.STORE_FETCHED_TAG, { tag })
            }
            commit(types.TAGS_LOADED, true)
        })
    }
}

// mutations
const mutations = {
    [types.STORE_FETCHED_TAGS](state, { tags }) {
        state.tags = tags
    },

    [types.STORE_FETCHED_TAG](state, { tag }) {
        state.tag = tag
    },

    [types.TAGS_LOADED](state, val) {
        state.loaded = val
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
