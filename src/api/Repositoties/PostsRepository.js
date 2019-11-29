import Repository from "../Repository"
import _ from 'lodash'

const resource = "/posts?per_page="
export default {
	getPosts(limit, callback) {
		if (_.isEmpty(limit)) {
			let limit = 5
		}
		return Repository.get(
			`${resource}${limit}`
		)
		.then(response => {
			callback(response.data);
		})
		.catch(e => {
			callback(e)
		})
	},
}
