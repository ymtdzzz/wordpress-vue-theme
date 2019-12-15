import Repository from "../Repository"
import _isEmpty from 'lodash/isEmpty'

const resource = "/pages?_embed"
export default {
	getPageBySlug(slug, callback) {
		if (_isEmpty(slug)) {
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
