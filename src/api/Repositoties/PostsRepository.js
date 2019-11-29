import Repository from "../Repository";

const resource = "/posts"
export default {
	get(callback) {
		return Repository.get(
			`${resource}`
		)
		.then(response => {
			callback(response.data);
		})
		.catch(e => {
			callback(e)
		})
	},
}
