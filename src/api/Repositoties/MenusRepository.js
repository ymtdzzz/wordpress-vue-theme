// menuと書いていますが正確にはmenuに紐づいたlocationです。
import { menu_http } from "../Repository"
import _isEmpty from 'lodash/isEmpty'
import Constants from "../../Constants";

const resource = Constants.API_MENU_PATH + "locations"
export default {
	getMenuBySlug(slug, callback) {
		if (_isEmpty(slug)) {
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
