import Repository from "../Repository"
import _ from 'lodash'

const resource = "/posts?_embed"
export default {
	getPosts(limit = 5, page = 1, category_id = '', tag_id = '', search_keyword = '', callback) {
		return Repository.get(
			`${resource}&per_page=${limit}&page=${page}&categories=${category_id}&tags=${tag_id}&search=${search_keyword}`
		)
		.then(response => {
			response.data.total_pages = _.get(response, 'headers.x-wp-totalpages]', '')
			response.data.current_page = page
			callback(response.data)
		})
		.catch(e => {
			callback(e)
		})
	},
	getPostBySlug(slug, callback) {
		if (_.isEmpty(slug)) {
			// 全件取得防止
			return {}
		}
		return Repository.get(
			`${resource}&slug=${slug}`
		)
		.then(response => {
			callback(response.data)
		})
		.catch(e => {
			callback(e)
		})
	}
}
