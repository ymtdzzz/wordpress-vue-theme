import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"

const PostsRepository = RepositoryFactory.get('posts')

const createPostSlug = post => {
  let slug = post.link.replace("http://" + window.location.hostname, "")
  slug = slug.replace("https://" + window.location.hostname, "")
  post.slug = slug
  return post
}

// initial state
const state = {
  recent: [],
  post: {},
  loaded: false
}

// getters
const getters = {
  recentPosts: state => limit => {
    if (
      !limit ||
      !_.isNumber(limit) ||
      _.isNull(limit) ||
      typeof limit == "undefined"
    ) {
      return state.recent
    }
    let recent = state.recent
    return recent.slice(0, limit)
  },

  postToShow: state => state.post,

  recentPostsLoaded: state => state.loaded,
  postLoaded: state => state.loaded
}

// actions
const actions = {
  getPosts({ commit }, { limit }) {
    commit(types.POSTS_LOADED, false)

    PostsRepository.getPosts(limit, posts => {
      // 取得した投稿のフルパスを取得
      posts.map((post, i) => {
        posts[i] = createPostSlug(post)
      })

      commit(types.STORE_FETCHED_POSTS, { posts })
      commit(types.POSTS_LOADED, true)
    })
  },
  getPostBySlug({ commit }, { slug }) {
    commit(types.POSTS_LOADED, false)

    PostsRepository.getPostBySlug(slug, post => {
      if (_.isEmpty(post)) {
        console.log('empty')
      //  TODO: 404ページに移動
      } else {
        commit(types.STORE_FETCHED_POST, { post })
      }
      commit(types.POSTS_LOADED, true)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_POSTS](state, { posts }) {
    state.recent = posts
  },

  [types.STORE_FETCHED_POST](state, { post }) {
    state.post = post
  },

  [types.POSTS_LOADED](state, val) {
    state.loaded = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
