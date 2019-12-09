import { RepositoryFactory } from "../../api/RepositoryFactory"
import * as types from "../mutation-types"
import _ from 'lodash'
import router from "../../router"
import moment from "moment"

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
  total_pages: 0,
  current_page: 0,
  loaded: false,

  related_posts: [],
  related_loaded: false,

  popular_posts: [],
  popular_loaded: false
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
  loadedPosts: state => state.recent,

  postToShow: state => state.post[0],
  recentPostsLoaded: state => state.loaded,
  postLoaded: state => state.loaded,
  totalPages: state => state.total_pages,
  currentPage: state => state.current_page,

  relatedPosts: state => state.related_posts,
  relatedLoaded: state => state.related_loaded,

  popularPosts: state => state.popular_posts,
  popularLoaded: state => state.popular_loaded
}

// actions
const actions = {
  getPosts({ commit }, { limit, page, category_id, tag_id, search_keyword }) {
    commit(types.POSTS_LOADED, false)

    PostsRepository.getPosts(limit, page, category_id, tag_id, search_keyword, posts => {
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
  },
  setPostToShow({ commit }, { postToSave }) {
  	commit(types.POSTS_LOADED, false)

	  const post = []
	  post[0] = postToSave

	  commit(types.STORE_FETCHED_POST, { post })
	  commit(types.POSTS_LOADED, true)
  },
  getRelatedPostsById({ commit }, { id }) {
    commit(types.RELATED_POSTS_LOADED, false)

    PostsRepository.getRelatedPostsById(id, related_posts => {
      if (_.isNil(related_posts)) {
        console.log('nil')
        //  TODO: 404ページに移動
      } else {
        // 日付からスラグ生成
        related_posts.posts.forEach(post => {
          const year = moment(post.post_date).format('YYYY')
          const month = moment(post.post_date).format('MM')
          const day = moment(post.post_date).format('DD')
          post['slug'] = `/${year}/${month}/${day}/${post.post_name}`
        })
        commit(types.STORE_FETCHED_RELATED_POSTS, related_posts.posts)
      }
      commit(types.RELATED_POSTS_LOADED, true)
    })
  },
  getPopularPosts({ commit }) {
    commit(types.POPULAR_POSTS_LOADED, false)

    PostsRepository.getPopularPosts(popular_posts => {
      if (_.isNil(popular_posts)) {
        console.log('nil')
        //  TODO: 404ページに移動
      } else {
        // 日付からスラグ生成
        popular_posts.forEach((post, index) => {
          const year = moment(post.date).format('YYYY')
          const month = moment(post.date).format('MM')
          const day = moment(post.date).format('DD')
          post['slug'] = `/${year}/${month}/${day}/${post.slug}`
          post['thumbnail_url'] = _.get(post, '_embedded.wp:featuredmedia.0.source_url', '')
        })
        commit(types.STORE_FETCHED_POPULAR_POSTS, popular_posts)
      }
      commit(types.POPULAR_POSTS_LOADED, true)
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

  [types.STORE_FETCHED_RELATED_POSTS](state, related_posts) {
    state.related_posts = related_posts
  },

  [types.RELATED_POSTS_LOADED](state, val) {
    state.related_loaded = val
  },

  [types.STORE_FETCHED_POPULAR_POSTS](state, popular_posts) {
    state.popular_posts = popular_posts
  },

  [types.POPULAR_POSTS_LOADED](state, val) {
    state.popular_loaded = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
