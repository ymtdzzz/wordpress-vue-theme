import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import _ from 'lodash'

const PostsRepository = RepositoryFactory.get('posts')
const TagsRepository = RepositoryFactory.get('tags')

const createPostSlug = post => {
  let slug = post.link.replace("http://" + window.location.hostname, "")
  slug = slug.replace("https://" + window.location.hostname, "")
  post.slug = slug
  return post
}

const createPostThumbnail = post => {
    let thumbnail_url = _.get(post, '_embedded.wp:featuredmedia.0.source_url', '')
    post.thumbnail_url = thumbnail_url
	return post
}

// initial state
const state = {
  recent: [],
  post: {},
  total_pages: 1,
  current_page: 1,
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

  postToShow: state => state.post[0],

  recentPostsLoaded: state => state.loaded,
  postLoaded: state => state.loaded,
	totalPages: state => state.total_pages,
	currentPage: state => state.current_page,
}

// actions
const actions = {
  getPosts({ commit }, { limit, page }) {
    commit(types.POSTS_LOADED, false)

    PostsRepository.getPosts(limit, page, posts => {
      // 取得した投稿のフルパスを取得
      posts.map((post, i) => {
        posts[i] = createPostSlug(post)
        posts[i] = createPostThumbnail(post)
      })

      commit(types.STORE_FETCHED_POSTS, { posts })
		commit(types.STORE_POSTS_CURRENT_PAGE, posts.current_page)
		commit(types.STORE_POSTS_TOTAL_PAGES, posts.total_pages)
      commit(types.POSTS_LOADED, true)
    })
  },
  getPostBySlug({ commit }, { slug }) {
    commit(types.POSTS_LOADED, false)

    PostsRepository.getPostBySlug(slug, post => {
      if (_.isNil(post)) {
        console.log('nil')
      //  TODO: 404ページに移動
      } else {
      	// サムネ取得（戻り値は結果が一つであっても配列です)
		post[0] = createPostThumbnail(post[0])
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
  },

	[types.STORE_POSTS_TOTAL_PAGES](state, val) {
		state.total_pages = val
	},

	[types.STORE_POSTS_CURRENT_PAGE](state, val) {
  		state.current_page = val
	},
}

export default {
  state,
  getters,
  actions,
  mutations
}
