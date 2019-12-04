// menuと書いていますが性格にはmenuに紐づいたlocationです。
import { menu_http } from "../Repository"
import _ from 'lodash'

const resource = "/locations"
export default {
	getPostBySlug(slug, callback) {
		if (_.isEmpty(slug)) {
			// 全件取得防止
			return {}
		}
		return menu_http.get(
			`${resource}/${slug}`
		)
			.then(response => {
				callback(response.data)
			})
			.catch(e => {
				callback(e)
			})
	}
}
