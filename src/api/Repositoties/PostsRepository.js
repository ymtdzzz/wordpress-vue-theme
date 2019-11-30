import Repository from "../Repository"
import _ from 'lodash'

const resource = "/posts"
export default {
	getPosts(limit, callback) {
		if (_.isEmpty(limit)) {
			let limit = 5
		}
		return Repository.get(
			`${resource}?per_page=${limit}`
		)
		.then(response => {
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
			`${resource}?slug=${slug}`
		)
		.then(response => {
			callback(response.data)
		})
		.catch(e => {
			callback(e)
		})
	}
}
